# Handoff: site Mia Compra → Agente IA (bot WhatsApp)

Objetivo: quando o cliente paga no site, a **Agente IA** fica sabendo da compra,
**dispara a mensagem de boas-vindas** (gracias + passo a passo) e **guarda o contexto**
do cliente, pra responder com contexto quando ele escrever depois.

O site **não** manda mais a mensagem direto: ele avisa a Agente IA, e a Agente IA é o cérebro.

---

## 1. O que o site faz (já está pronto)

No evento `checkout.session.completed` (webhook do Stripe), o site faz um `POST` pro
endpoint da Agente IA, **se** a env `BOT_PURCHASE_WEBHOOK_URL` estiver setada.

- Método: `POST`
- Header: `X-Mia-Secret: <segredo compartilhado>` (a Agente IA valida)
- Header: `Content-Type: application/json`
- Body (exemplo):

```json
{
  "event": "purchase.completed",
  "phone": "584121234567",
  "nombre": "María",
  "envio": {
    "origen": "Miami, FL",
    "destino": "Caracas, Distrito Capital",
    "resumen": "Medium aérea 30 lb + Large marítima 45 lb",
    "cajas": "2",
    "total_usd": "211.45"
  },
  "pago": {
    "session_id": "cs_test_123",
    "amount_total": 21145,
    "currency": "usd"
  }
}
```

> **Mudança de contrato (2026-06-17):** o carrinho virou multi-caixa. O `envio` NÃO traz mais
> `modo`/`caja`/`peso_lb`/`detalle` (um pedido pode ter várias caixas). Agora traz:
> - `resumen` — string legível com todas as caixas (ex.: `"Medium aérea 30 lb + Large marítima 45 lb"`). Use esta no `📦 Tu envío:`.
> - `cajas` — quantidade de caixas (string).
> - `total_usd` — total do pedido em dólares (string, ex.: `"211.45"`).

Notas:
- `phone` vem **só com dígitos, com código de país** (ex.: Venezuela = `58...`). Já normalizado. É o WhatsApp do **destinatário** — o casamento do pedido é por `pago.session_id`, não por telefone.
- `amount_total` é em centavos (ex.: `21145` = `$211.45`).
- Campos de `envio` podem vir vazios (`""`) se o cliente não preencheu.
- O site agora dispara o evento **só depois do pagamento confirmado** (inclusive Klarna/Amazon Pay, que confirmam de forma assíncrona) e **só uma vez por compra** (idempotência por sessão). O bot pode manter o seu anti-duplicata como segunda camada.

---

## 2. O que a Agente IA precisa fazer

### 2.1 Receber o evento
Expor um endpoint (a URL que vai virar `BOT_PURCHASE_WEBHOOK_URL` no site) que:
1. Valide o header `X-Mia-Secret` contra o segredo combinado. Se não bater, responde `401`.
2. Responda `200` rápido (idealmente processa em background).

### 2.2 Guardar o contexto do cliente
Faça upsert de um registro de contexto, **chaveado pelo `phone`**, com:
- dados do envio (`envio`),
- referência do pagamento (`pago.session_id`),
- status inicial: `pago_confirmado` / `etiqueta_pendiente`.

Esse contexto é o que deixa a Agente IA responder redondo. Exemplo: se o cliente
escrever *"¿dónde está mi etiqueta?"*, o bot sabe que ele acabou de comprar, que a
etiqueta está pendente e qual é a caixa/modo.

### 2.3 Disparar a mensagem de boas-vindas (mesma instância Z-API da Mia Compra)
Manda **esta** mensagem (mantém o texto consistente com a thank you page do site):

```
¡Hola {nombre}! 🎉 Recibimos tu pago en Mia Compra, tu envío ya está confirmado.

📦 Tu envío: {resumen} · {origen} → {destino}

Esto es lo que sigue:
1️⃣ *Preparamos tu etiqueta FedEx* — nuestro equipo la genera y te la envía por aquí y por correo en las próximas horas.
2️⃣ *Imprime y pega la etiqueta* en la caja y déjala en cualquier oficina FedEx en EE.UU.
3️⃣ *Tu caja llega a Miami* — la recibimos, auditamos y preparamos para el despacho.
4️⃣ *Despachamos y haces seguimiento* — sale por vía aérea o marítima y te avisamos en cada paso hasta la puerta de tu familia.

En breve te enviamos tu etiqueta. Cualquier duda, escríbenos por aquí. 💛
```

Regras do texto:
- Se `nombre` vier vazio, usa só `¡Hola!`.
- A linha `📦 Tu envío:` só entra se houver dados; omite os campos vazios.
- Envio via **a mesma instância Z-API da Mia Compra** (mesmo número do bot).

### 2.4 Marco para o resto da conversa
Depois da boas-vindas, a Agente IA segue dona da conversa normalmente (responde dúvidas,
avisa quando a etiqueta for gerada, acompanha o rastreio). O evento de compra é só o gatilho.

---

## 3. O que falta pra fechar o circuito (1 troca de informação)

1. A Agente IA cria o endpoint (item 2) e me devolve:
   - a **URL** do endpoint → vira `BOT_PURCHASE_WEBHOOK_URL` no site (Vercel),
   - o **segredo** → vira `BOT_PURCHASE_WEBHOOK_SECRET` no site (Vercel).
2. Eu seto essas duas envs na Vercel e faço redeploy.
3. A partir daí, o site **para de mandar direto** e passa a avisar a Agente IA (o site já
   prioriza o handoff quando `BOT_PURCHASE_WEBHOOK_URL` existe).
4. Teste: uma compra de teste → confirmar que a Agente IA recebeu o evento, salvou o
   contexto e mandou a mensagem.

Enquanto `BOT_PURCHASE_WEBHOOK_URL` não estiver setada, o site continua no modo de envio
direto por Z-API (ou só logando, se nem o Z-API estiver configurado). Nada quebra no meio.
