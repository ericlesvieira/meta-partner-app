# Guia de Deploy no Coolify - Passo a Passo

## 🎯 Objetivo
Fazer deploy do frontend Vue.js em: **https://app.ericlestatistica.com.br**

---

## 📋 Pré-requisitos
- ✅ Repositório GitHub criado: `ericlesvieira/meta-partner-app`
- ✅ Código commitado e pushed
- ✅ Coolify acessível: `https://coolify.ericlestatistica.com.br`
- ⏳ DNS para `app.ericlestatistica.com.br` (configurar após deploy)

---

## 🚀 Passo 1: Criar Nova Aplicação no Coolify

### 1.1 Acessar Coolify
- Acesse: `https://coolify.ericlestatistica.com.br`
- Faça login com suas credenciais

### 1.2 Criar Nova Aplicação
1. No dashboard, clique em **"Create New Resource"** ou **"+ New Application"**
2. Escolha **"New Application"**
3. Selecione **"Public Repository"** OU **"GitHub App"**

---

## 🔗 Passo 2: Conectar com GitHub

### Opção A: GitHub App (Recomendado)
1. Clique em **"Connect with GitHub"**
2. Autorize o Coolify a acessar seus repositórios
3. Na lista, selecione: **"ericlesvieira/meta-partner-app"**
4. Selecione a branch: **"main"**

### Opção B: Public Repository
1. Digite o repositório: **"ericlesvieira/meta-partner-app"**
2. Selecione a branch: **"main"**

---

## ⚙️ Passo 3: Configurar Build Settings

### 3.1 Configurações Gerais
Preencha conforme abaixo:

| Campo | Valor |
|--------|--------|
| **Name** | `meta-partner-app-frontend` |
| **Repository** | `ericlesvieira/meta-partner-app` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Pack** | `nixpacks` |
| **Is it a static site?** | ✅ **Yes** |
| **Output Directory** | `dist` |

### 3.2 Build Command
- Deixe em branco (nixpacks detecta automaticamente)

### 3.3 Start Command
- Deixe em branco (static site não precisa de start command)

---

## 🌐 Passo 4: Configurar Domínio

### 4.1 Adicionar Domínio
1. Após criar a aplicação, vá na aba **"Domains"**
2. Clique em **"Add Domain"**
3. Digite: `app.ericlestatistica.com.br`
4. Clique em **"Save"** ou **"Add"**

### 4.2 SSL Automático
- O Coolify **gerará automaticamente** o certificado SSL
- Aguarde o certificado ser gerado (pode levar 1-2 minutos)
- Verifique se aparece um ícone 🔒 ao lado do domínio

---

## 🚀 Passo 5: Iniciar Deploy

### 5.1 Deploy Inicial
1. Na aba **"Deploy"** ou **"Deployments"**
2. Clique em **"Deploy"** ou **"Deploy now"**
3. Aguarde o build começar

### 5.2 Monitorar Logs
1. Abra a aba **"Logs"** para ver o progresso
2. Você verá algo como:
   ```
   Installing dependencies...
   Building...
   Generating static files...
   Build successful!
   ```

### 5.3 Verificar Status
- Aguarde o status mudar para **"Running"** ou **"Active"**
- O deploy leva 2-5 minutos

---

## ✅ Passo 6: Testar Aplicação

### 6.1 Acessar URL
1. Abra no navegador: `https://app.ericlestatistica.com.br`
2. Você deve ver a página inicial do app

### 6.2 Testar Funcionalidades
1. Clique em **"Connect with Meta"**
2. Preencha as credenciais Meta (pode usar testes primeiro)
3. Verifique se conecta corretamente
4. Navegue pelas páginas (Dashboard, Templates, etc.)

---

## 🌍 Passo 7: Configurar DNS

### 7.1 Configurar DNS
No seu provedor de DNS (ex: Hostinger, Cloudflare, etc.):

**Registros DNS:**
```
Tipo: A
Nome: app
Valor: [IP do seu servidor Coolify]
TTL: 300
```

**OU (se usar CNAME):**
```
Tipo: CNAME
Nome: app
Valor: ericlestatistica.com.br
TTL: 300
```

### 7.2 Encontrar IP do Servidor
1. Acesse: `https://coolify.ericlestatistica.com.br`
2. Vá em **Settings** → **Destinations**
3. Encontre o servidor "localhost"
4. Copie o **IP address**

### 7.3 Verificar Propagação DNS
- Use: https://dnschecker.org/app.ericlestatistica.com.br
- Digite: `app.ericlestatistica.com.br`
- Aguarde todos os servidores mostrarem green (pode levar 10-30 min)
- Máximo: 24h (normalmente muito mais rápido)

---

## 🔐 Passo 8: Configurar n8n Workflows

### 8.1 Acessar n8n
- URL: `https://n8n.ericlestatistica.com.br`
- Faça login

### 8.2 Importar Workflows

**Workflow 1: WhatsApp → Chatwoot**
1. Clique em **"+"** → **"Import from File"**
2. Selecione: `n8n-workflows/whatsapp-to-chatwoot.json`
3. Clique em **"Import"**
4. Renomeie para: "WhatsApp to Chatwoot - Incoming Messages"
5. Ative o workflow (botão "Activate")

**Workflow 2: Chatwoot → WhatsApp**
1. Repita o processo com: `n8n-workflows/chatwoot-to-whatsapp.json`
2. Nome: "Chatwoot to WhatsApp - Outgoing Messages"
3. Ative

**Workflow 3: Message Status Sync**
1. Repita o processo com: `n8n-workflows/message-status-sync.json`
2. Nome: "WhatsApp Message Status Sync"
3. Ative

### 8.3 Configurar Variáveis de Ambiente

No n8n, configure as seguintes variáveis:

```
CHATWOOT_API_URL=https://seu-chatwoot.com
CHATWOOT_API_TOKEN=seu_token_aqui
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_INBOX_ID=1
WHATSAPP_ACCESS_TOKEN=seu_token_meta_aqui
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id_aqui
```

**Para configurar variáveis:**
1. Em cada workflow, clique nas configurações do nó que usa variáveis
2. Substitua os valores placeholders pelos valores reais
3. Ou configure no n8n Settings → Environment Variables

---

## 🔗 Passo 9: Configurar Webhooks

### 9.1 Meta App Webhook
Acesse: https://developers.facebook.com/apps

**Configuração:**
- **Webhook URL**: `https://n8n.ericlestatistica.com.br/webhook/whatsapp-to-chatwoot`
- **Verify Token**: Escolha um token seguro (ex: `meta_verify_token_2026`)
- **Webhook Fields**:
  - ✅ `messages`
  - ✅ `message_template_status_update`
  - ✅ `phone_number_quality_update`

**No n8n:**
1. No workflow "WhatsApp to Chatwoot"
2. Configure o nó "WhatsApp Webhook"
3. Defina o Verify Token igual ao do Meta
4. Salve

### 9.2 Chatwoot Webhook
Acesse seu Chatwoot: Settings → Integrations → Webhooks

**Configuração:**
- **Webhook URL**: `https://n8n.ericlestatistica.com.br/webhook/chatwoot-to-whatsapp`
- **Webhook Secret**: Escolha um token (ex: `cw_webhook_secret_2026`)
- **Events**: `message_created`

---

## ✅ Passo 10: Testar Integração Completa

### Teste 1: WhatsApp → Chatwoot
1. Envie uma mensagem do WhatsApp para seu número configurado
2. Aguarde 10-30 segundos
3. Acesse o Chatwoot
4. Verifique se a conversa foi criada com a mensagem
5. ✅ Sucesso!

### Teste 2: Chatwoot → WhatsApp
1. Acesse o Chatwoot
2. Crie uma nova conversa (ou use a anterior)
3. Envie uma resposta
4. Verifique no WhatsApp se a mensagem chegou
5. ✅ Sucesso!

### Teste 3: Status Sync
1. Encontre uma mensagem no Chatwoot
2. Verifique se o status está correto (enviado, entregue, lido)
3. ✅ Sucesso!

---

## 📊 Passo 11: Testar Frontend

### 11.1 Configurar Credenciais Meta
1. Acesse: `https://app.ericlestatistica.com.br`
2. Clique em **"Connect with Meta"**
3. Preencha:
   - **App ID**: [ID do seu Meta app]
   - **App Secret**: [Secret do seu Meta app]
   - **Access Token**: [Token com permissões]
   - **Webhook URL**: `https://n8n.ericlestatistica.com.br/webhook/whatsapp-to-chatwoot`
   - **Verify Token**: `meta_verify_token_2026`
4. Clique em **"Conectar"**

### 11.2 Testar Funcionalidades
- ✅ Dashboard mostra estatísticas
- ✅ WABA Management lista contas
- ✅ Templates permite criar templates
- ✅ Analytics mostra dados (se houver)

---

## 🎥 Passo 12: Gravar Vídeo de Demonstração

Para aprovação Meta, grave um vídeo mostrando:

**Cena 1: Dashboard (30 segundos)**
- Mostrar página inicial
- Clicar em "Connect with Meta"
- Mostrar configurações preenchidas

**Cena 2: WABA Management (1 minuto)**
- Navegar para aba WABA
- Mostrar listagem de contas
- Clicar em uma conta
- Mostrar números de telefone
- Configurar webhook

**Cena 3: Templates (1 minuto)**
- Navegar para aba Templates
- Clicar em "Criar Template"
- Mostrar formulário preenchido
- Enviar para aprovação

**Cena 4: Teste Funcional (2 minutos)**
- Enviar mensagem do WhatsApp
- Mostrar mensagem chegando no Chatwoot
- Responder no Chatwoot
- Mostrar resposta chegando no WhatsApp

**Cena 5: Analytics (30 segundos)**
- Navegar para aba Analytics
- Mostrar estatísticas
- Selecionar período de tempo
- Mostrar gráficos

**Duração total: ~5 minutos**

**Dicas para gravação:**
- Use ferramenta de captura de tela (ex: Loom, OBS, QuickTime)
- Fale em português explicando cada passo
- Mostre a URL do navegador
- Destaque ações importantes
- Grave em 1080p ou 720p

---

## 🐛 Troubleshooting

### Deploy Falha
**Problema:** Build falha

**Solução:**
1. Verifique logs no Coolify (aba Logs)
2. Confirme que `package.json` existe em `frontend/`
3. Verifique se há erros de dependências

### 404 Not Found
**Problema:** Página não encontrada

**Solução:**
1. Verifique se Output Directory está correto (`dist`)
2. Confirme se Root Directory está correto (`frontend`)
3. Limpe cache do navegador

### DNS Não Propaga
**Problema:** DNS não atualiza

**Solução:**
1. Aguarde mais tempo (até 24h)
2. Verifique se registros DNS estão corretos
3. Use `dig app.ericlestatistica.com.br` para testar

### SSL Não Funciona
**Problema:** Certificado não é gerado

**Solução:**
1. Aguarde DNS propagar
2. Clique em "Force HTTPS" nas configurações
3. Verifique logs do Coolify

### Webhook Não Recebe Eventos
**Problema:** Eventos não chegam no n8n

**Solução:**
1. Verifique se URL está correta e pública
2. Confirme Verify Token está igual no Meta e n8n
3. Teste webhook manualmente com curl
4. Verifique logs do workflow n8n

---

## 📝 Checklist Final

- [ ] Repositório GitHub criado
- [ ] Aplicação criada no Coolify
- [ ] Build configurado corretamente
- [ ] Domínio `app.ericlestatistica.com.br` configurado
- [ ] Deploy realizado com sucesso
- [ ] Aplicação acessível em HTTPS
- [ ] DNS configurado corretamente
- [ ] n8n workflows importados
- [ ] Variáveis de ambiente configuradas
- [ ] Webhook Meta configurado
- [ ] Webhook Chatwoot configurado
- [ ] Teste WhatsApp → Chatwoot funcional
- [ ] Teste Chatwoot → WhatsApp funcional
- [ ] Frontend testado e funcional
- [ ] Vídeo de demonstração gravado
- [ ] App submetido para aprovação Meta

---

## 🎯 Resumo de URLs

| Serviço | URL |
|----------|-----|
| **Coolify** | https://coolify.ericlestatistica.com.br |
| **Frontend** | https://app.ericlestatistica.com.br |
| **n8n** | https://n8n.ericlestatistica.com.br |
| **GitHub** | https://github.com/ericlesvieira/meta-partner-app |
| **Meta Console** | https://developers.facebook.com/apps |

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique logs no Coolify
2. Verifique logs do n8n
3. Consulte documentação: https://coolify.io/docs
4. Consulte n8n docs: https://docs.n8n.io

---

**Boa sorte com o deploy! 🚀**

Assim que terminar, avise aqui para eu ajudar com os próximos passos!
