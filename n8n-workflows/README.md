# Workflows n8n - Integração WhatsApp ↔ Chatwoot

Esta pasta contém os workflows do n8n para integração entre WhatsApp Business API e Chatwoot.

## Workflows

### 1. WhatsApp → Chatwoot (Incoming Messages)

**Arquivo:** `whatsapp-to-chatwoot.json`

Este workflow:
- Recebe webhooks do WhatsApp (mensagens recebidas, status, etc.)
- Processa e formata os dados para o formato do Chatwoot
- Envia para a API do Chatwoot para criar/atualizar conversas

**Estrutura:**
1. **Webhook Trigger**: Recebe eventos do WhatsApp
2. **Parse JSON**: Extrai dados do payload
3. **Filter**: Filtra apenas mensagens de texto (pode ser expandido)
4. **Transform Data**: Formata para o formato do Chatwoot
5. **HTTP Request**: Envia para a API do Chatwoot

### 2. Chatwoot → WhatsApp (Outgoing Messages)

**Arquivo:** `chatwoot-to-whatsapp.json`

Este workflow:
- Recebe webhooks do Chatwoot (eventos de mensagem criada)
- Processa e formata os dados para o formato do WhatsApp
- Envia via API do WhatsApp Cloud API

**Estrutura:**
1. **Webhook Trigger**: Recebe eventos do Chatwoot
2. **Filter**: Filtra apenas eventos `message_created`
3. **Transform Data**: Formata para o formato do WhatsApp
4. **HTTP Request**: Envia para a API do WhatsApp

### 3. Message Status Sync

**Arquivo:** `message-status-sync.json`

Este workflow:
- Recebe eventos de status de mensagem do WhatsApp
- Atualiza o status da mensagem no Chatwoot

## Configuração

### Variáveis de Ambiente

Configure estas variáveis no n8n:
- `CHATWOOT_API_URL`: URL base da API do Chatwoot
- `CHATWOOT_API_TOKEN`: Token de acesso da API do Chatwoot
- `CHATWOOT_ACCOUNT_ID`: ID da conta no Chatwoot
- `CHATWOOT_INBOX_ID`: ID da caixa de entrada do WhatsApp
- `WHATSAPP_ACCESS_TOKEN`: Token de acesso do WhatsApp
- `WHATSAPP_PHONE_NUMBER_ID`: ID do número de telefone do WhatsApp

### Configuração dos Webhooks

1. **WhatsApp → Chatwoot**:
   - URL: `https://your-n8n-instance.com/webhook/whatsapp-to-chatwoot`
   - Eventos: `messages`, `message_template_status_update`, `phone_number_quality_update`

2. **Chatwoot → WhatsApp**:
   - Configure no Chatwoot em Settings → Integrations → Webhooks
   - URL: `https://your-n8n-instance.com/webhook/chatwoot-to-whatsapp`
   - Eventos: `message_created`

## Teste

Após importar os workflows:
1. Configure as credenciais (WhatsApp e Chatwoot)
2. Ative os webhooks
3. Envie uma mensagem de teste do WhatsApp
4. Verifique se a mensagem aparece no Chatwoot
5. Envie uma mensagem do Chatwoot
6. Verifique se a mensagem é entregue no WhatsApp

## Troubleshooting

### Mensagens não aparecem no Chatwoot
- Verifique se o token do Chatwoot está correto
- Confirme que o inbox ID está correto
- Verifique os logs do workflow n8n

### Erros de autenticação do WhatsApp
- Verifique se o access token é válido
- Confirme que tem as permissões necessárias
- Verifique se o número de telefone está verificado

### Webhook não está recebendo eventos
- Confirme que o URL está acessível externamente
- Verifique se o HTTPS está funcionando
- Teste o webhook manualmente
