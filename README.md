# Mia Compra · Landing Page

Landing page premium para a **Mia Compra**, serviço de envios de Estados Unidos para a Venezuela (empresa irmã da Latinship). Página única, em espanhol venezuelano, desenhada para rodar com os criativos de Meta Ads e converter no WhatsApp.

**Big Idea:** "Lo que tu familia te quiere mandar, ya está en camino."
**Cunha de posicionamento:** preço cerrado e tom de pana, contra concorrentes frios que escondem o preço.

## Stack

HTML, CSS e JavaScript puro. Sem build, sem dependências, sem framework. Fonte Montserrat (300/400/500) via Google Fonts. Tudo num único `index.html`.

## Rodar local

```bash
# qualquer servidor estático serve, ex:
python3 -m http.server 8000
# abre http://localhost:8000
```

Ou só abrir o `index.html` no navegador.

## ⚠️ Antes de publicar (preencher dados reais)

1. **WhatsApp** (obrigatório): no `<script>` do final do `index.html`, edita **uma linha**:
   ```js
   const WA_NUMBER = "1XXXXXXXXXX"; // formato internacional sem sinais: 1 + número (EE.UU)
   ```
   Todos os botões e o float do WhatsApp puxam desse número automaticamente.
2. **Endereço do almacén** (Doral, FL): bloco "Almacén" no CTA final, hoje marcado `[Dirección completa: a completar]`.
3. **Horário de atención**: bloco "Atención", hoje `[Horario: a completar]`.
4. **Instagram**: confirmar o handle `@miacompra` (links em `instagram.com/miacompra`).
5. **Depoimentos**: os 3 testimonios são **exemplos realistas**, não reais. Trocar por depoimentos verdadeiros (ou remover a seção) antes de publicar, por questão de ética e política do Meta Ads.

## Deploy (Vercel, 1 clique)

O repositório já está no GitHub. No painel da Vercel:
- New Project → importar `leonardoferreirr/miacompra`
- Framework Preset: **Other** (site estático)
- Build Command: vazio · Output Directory: `.` (raiz)
- Deploy. A cada `git push` na `main` ele atualiza sozinho.

## Estrutura

```
index.html              página inteira (HTML + CSS + JS)
assets/
  logo-yellow.png       logo oficial Mia Compra (versão amarela)
  hero-abuela.jpg       avó recebendo a caixa com a logo Mia (hero full-bleed, 1920x1080)
  box-products.jpg      caixa aberta com produtos (seção "qué enviar")
  para-familia.jpg      família recebendo a caixa (seção parallax)
```

## Créditos de assets

- Logo: identidade oficial Mia Compra.
- `hero-abuela`, `box-products`, `para-familia`: imagens geradas por IA (Nano Banana Pro), gradeadas no navy da marca. O `hero-abuela` usa a logo oficial como referência, renderizada no rótulo da caixa.

## Seções

Nav glass · Hero · Faixa de selos · A diferença (preço cerrado vs concorrente) · Precio cerrado (recibo) · Servicios · Cómo funciona (4 pasos) · Qué puedes enviar · Parallax emocional · Por qué confiar (Latinship) · Testimonios · Preguntas · CTA final · Footer · WhatsApp flutuante.

---
© 2026 Mia Compra · Tu felicidad, nuestro compromiso
