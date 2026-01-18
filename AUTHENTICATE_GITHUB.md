# Instruções de Autenticação GitHub

Para continuar, precisamos que você autentique o GitHub CLI manualmente:

## Passo 1: Autenticar no GitHub

Abra um terminal e execute:

```bash
gh auth login
```

Siga as instruções:
1. Selecione "GitHub.com"
2. Selecione "HTTPS"
3. Selecione "Login with a web browser"
4. Copie o código gerado
5. Acesse o URL fornecido
6. Cole o código e autorize o acesso

## Passo 2: Confirmar Autenticação

Após autorizar, execute:

```bash
gh auth status
```

Você deve ver algo como:
```
Logged in as seu-usuario
```

## Passo 3: Avisar

Quando a autenticação estiver completa, avise aqui no chat!

---

## Alternativa: Criar Repositório Manualmente

Se preferir, pode criar o repositório manualmente:

1. Acesse: https://github.com/new
2. Nome: `meta-partner-app`
3. Visibilidade: Privado (recomendado)
4. Descrição: "App Meta Solution Provider - Integração WhatsApp Business API ↔ Chatwoot"
5. Clique em "Create repository"
6. Execute os comandos abaixo neste diretório:

```bash
git remote add origin https://github.com/SEU-USUARIO/meta-partner-app.git
git branch -M main
git push -u origin main
```

Avisar quando terminar!
