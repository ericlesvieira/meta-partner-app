# Meta Solution Provider App - WhatsApp ↔ Chatwoot Integration

Aplicativo completo para se tornar um Tech Provider da Meta, integrando WhatsApp Business API com Chatwoot via n8n.

## 📋 Visão Geral

Este projeto consiste em três componentes principais:

1. **Frontend Vue.js** - Interface web para gerenciamento do WhatsApp Business Management API
2. **n8n Workflows** - Automação para fluxo de mensagens entre WhatsApp e Chatwoot
3. **Chatwoot Integration** - Configuração para bidirecionalidade de mensagens

## 🏗️ Arquitetura

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   WhatsApp  │ ───► │     n8n     │ ───► │   Chatwoot  │
│   Cloud API │      │  Workflows  │      │    API      │
└─────────────┘      └─────────────┘      └─────────────┘
       ▲                                            │
       │                                            │
       └────────────────────────────────────────────┘
                        Vue.js Management UI
```

## 🚀 Funcionalidades

### Frontend (Vue.js)
- Dashboard com estatísticas em tempo real
- Gerenciamento de contas WABA (WhatsApp Business Accounts)
- Gerenciamento de números de telefone
- Criação e gerenciamento de templates de mensagens
- Analytics de uso da API
- Configuração de webhooks
- Integração com Chatwoot

### n8n Workflows
- Recebimento de mensagens do WhatsApp → Chatwoot
- Envio de mensagens do Chatwoot → WhatsApp
- Sincronização de status de mensagens

## 📋 Pré-requisitos

- Meta Developer Account
- Chatwoot instalado ou em nuvem
- n8n (self-hosted ou n8n.cloud)
- VPS com Coolify para deployment
- Domínio com SSL configurado

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <repo-url>
cd meta-partner-app
```

### 2. Configurar Meta App
1. Acesse [Meta for Developers](https://developers.facebook.com/)
2. Crie um novo app com o produto "WhatsApp"
3. Configure as permissões:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
4. Gere um Access Token de longa duração
5. Configure os webhooks
6. Submeta para aprovação

### 3. Configurar Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` e configure suas credenciais Meta.

### 4. Configurar n8n Workflows

Importe os workflows do n8n:
- `n8n-workflows/whatsapp-to-chatwoot.json`
- `n8n-workflows/chatwoot-to-whatsapp.json`
- `n8n-workflows/message-status-sync.json`

Configure as variáveis de ambiente:
```
CHATWOOT_API_URL=https://your-chatwoot.com
CHATWOOT_API_TOKEN=your_token
CHATWOOT_ACCOUNT_ID=1
CHATWOOT_INBOX_ID=1
WHATSAPP_ACCESS_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
```

### 5. Configurar Chatwoot

Adicione um webhook no Chatwoot:
- URL: `https://your-n8n.com/webhook/chatwoot-to-whatsapp`
- Eventos: `message_created`

## 🐳 Deployment com Coolify

### Frontend
1. Conecte seu repositório ao Coolify
2. Configure o build:
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
3. Configure as variáveis de ambiente
4. Deploy!

### n8n
Use o docker-compose incluído:
```bash
docker-compose up -d n8n
```

Ou adicione como serviço no Coolify.

## 📱 Criação de Conta WABA

### Meta Business Manager
1. Acesse [Business Manager](https://business.facebook.com/wa/manage)
2. Clique em "Add Business Account"
3. Preencha as informações da empresa
4. Verifique seu número de telefone

### Verificação
1. Aguarde a revisão do Meta
2. Siga as instruções de verificação
3. Configure as informações de negócio

## 📝 Testes

### Teste de Recebimento (WhatsApp → Chatwoot)
1. Envie uma mensagem para seu número WhatsApp configurado
2. Aguarde alguns segundos
3. Verifique se a mensagem aparece no Chatwoot
4. Confirme que os dados foram processados corretamente

### Teste de Envio (Chatwoot → WhatsApp)
1. Crie uma conversa no Chatwoot
2. Envie uma mensagem
3. Aguarde alguns segundos
4. Verifique se a mensagem foi entregue no WhatsApp

## 🎥 Preparação do Vídeo de Demonstração

Para aprovação do Meta, grave um vídeo demonstrando:

1. **Dashboard**
   - Mostrar estatísticas
   - Listar contas WABA
   - Mostrar configuração de webhooks

2. **Gerenciamento WABA**
   - Criar/configurar conta WABA
   - Adicionar e verificar número de telefone
   - Configurar webhook

3. **Templates**
   - Criar um novo template
   - Mostrar campos e componentes
   - Enviar para aprovação

4. **Integração Funcional**
   - Enviar mensagem do WhatsApp → Chatwoot
   - Enviar mensagem do Chatwoot → WhatsApp
   - Mostrar sincronização de status

5. **Analytics**
   - Mostrar estatísticas de envio
   - Demonstrar taxas de sucesso

Duração sugerida: 3-5 minutos

## 📚 Documentação

### Meta Documentation
- [WhatsApp Business Management API](https://developers.facebook.com/docs/whatsapp/business-management-api/)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/)
- [Solution Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/)

### n8n Documentation
- [WhatsApp Business Cloud Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/)
- [Webhook Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/)

### Chatwoot Documentation
- [API Reference](https://developers.chatwoot.com/api-reference/)
- [Webhooks](https://www.chatwoot.com/hc/user-guide/articles/1677693021-how-to-use-webhooks)

## 🔐 Segurança

- Nunca commit credenciais no repositório
- Use variáveis de ambiente para tokens sensíveis
- Configure HTTPS obrigatoriamente
- Valide assinaturas de webhooks
- Implemente rate limiting
- Rotacione tokens regularmente

## 🐛 Troubleshooting

### Erro: "Invalid OAuth access token"
- Verifique se o token está correto
- Confirme que tem as permissões necessárias
- Gere um novo token se necessário

### Webhook não recebe eventos
- Confirme que a URL está acessível externamente
- Verifique a configuração do webhook no Meta
- Teste manualmente com curl/Postman
- Verifique logs do n8n

### Mensagens não aparecem no Chatwoot
- Verifique o inbox ID configurado
- Confirme que o token do Chatwoot está válido
- Verifique logs do workflow n8n
- Teste a API do Chatwoot diretamente

## 📄 Licença

Este projeto é distribuído sob licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para questões sobre:
- **Meta API**: [Meta Support](https://developers.facebook.com/support/)
- **n8n**: [n8n Community](https://community.n8n.io/)
- **Chatwoot**: [Chatwoot Forum](https://forum.chatwoot.com/)

## 🎯 Roadmap

- [ ] Suporte para mensagens de mídia
- [ ] Suporte para templates com botões de URL
- [ ] Dashboard mais detalhado
- [ ] Exportação de analytics
- [ ] Multi-tenancy para múltiplos clientes
- [ ] Integração com CRM adicionais

---

Desenvolvido com ❤️ para a comunidade de WhatsApp Business
