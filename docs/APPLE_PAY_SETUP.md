# Apple Pay domain verification — passo a passo

Sem isso, **Apple Pay não aparece no Safari iOS** quando o cliente chega no Stripe Checkout.

## Pré-requisito

A pasta `public/.well-known/` já existe neste repo. O Next.js está configurado em `next.config.mjs` pra servir o arquivo com `Content-Type: text/plain` (exigência do Stripe).

## Passos

### 1. Gera o arquivo no Stripe Dashboard

1. Abre [dashboard.stripe.com/settings/payment_methods](https://dashboard.stripe.com/settings/payment_methods) em modo **Live**
2. Clica em **Apple Pay** → **Add a new domain**
3. Digita `www.miacompra.com`
4. Clica em **Download verification file**
5. Stripe baixa um arquivo chamado `apple-developer-merchantid-domain-association` (sem extensão)

### 2. Coloca o arquivo no repo

Drop o arquivo baixado em:

```
public/.well-known/apple-developer-merchantid-domain-association
```

Importante:
- **Sem extensão** (não pode virar `.txt`)
- Conteúdo é uma string longa de hash, não edita
- Não commita junto outros arquivos dentro de `.well-known/` (só esse)

### 3. Commit + push

```bash
cd ~/dev/miacompra
git add public/.well-known/apple-developer-merchantid-domain-association
git commit -m "apple-pay: domain verification file"
git push origin main
```

Vercel auto-deploya em ~1 min.

### 4. Confirma que o arquivo está servindo

Abre no navegador:

```
https://www.miacompra.com/.well-known/apple-developer-merchantid-domain-association
```

Deve exibir uma string longa (não 404, não JSON, não HTML). Se aparecer 404, conferir que a pasta é `.well-known` (com ponto) e o arquivo está exatamente com esse nome.

### 5. Verifica no Stripe

Volta no dashboard de Apple Pay → clica **Verify** ao lado do domínio. Status muda pra ✅ verde.

### 6. Teste no Safari iOS ou Mac

Abre `www.miacompra.com/cotizador` no Safari iOS (ou Mac com Apple Pay configurado), monta um pedido qualquer, clica em pagar. Na tela do Stripe Checkout deve aparecer o botão preto do Apple Pay no topo.

## Domínio adicional (opcional)

Se quiser que Apple Pay funcione também em `miacompra.com` (sem `www.`), repete o processo adicionando esse domínio separadamente. Stripe trata `www.` e raiz como domínios diferentes.
