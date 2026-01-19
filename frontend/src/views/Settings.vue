<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto animate-fade-in space-y-6">
      <!-- Meta Credentials -->
      <BaseCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-text-primary">Credenciais Meta</h2>
          </div>
        </template>

        <form @submit.prevent="saveCredentials" class="space-y-5">
          <BaseInput
            v-model="credentials.appId"
            label="App ID"
            placeholder="ID do seu aplicativo Meta"
          />

          <BaseInput
            v-model="credentials.appSecret"
            type="password"
            label="App Secret"
            placeholder="App Secret do seu aplicativo Meta"
          />

          <BaseInput
            v-model="credentials.accessToken"
            type="password"
            label="Access Token"
            placeholder="Token de acesso do Meta"
            hint="Permissoes necessarias: whatsapp_business_messaging e whatsapp_business_management"
          />

          <BaseButton type="submit" :loading="isSaving" full-width>
            Salvar Credenciais
          </BaseButton>
        </form>
      </BaseCard>

      <!-- Webhook Configuration -->
      <BaseCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-text-primary">Configuracao Webhook (n8n)</h2>
          </div>
        </template>

        <form @submit.prevent="saveWebhookConfig" class="space-y-5">
          <BaseInput
            v-model="credentials.webhookUrl"
            type="url"
            label="Webhook URL"
            placeholder="https://your-n8n-instance.com/webhook/whatsapp"
            hint="URL do webhook do n8n para receber eventos do WhatsApp"
            required
          />

          <BaseInput
            v-model="credentials.webhookVerifyToken"
            label="Verify Token"
            placeholder="Token de verificacao do webhook"
            hint="Token usado para validar requisicoes do WhatsApp"
            required
          />

          <!-- Subscribed Events -->
          <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h3 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">Eventos Subscritos</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  v-model="subscribedFields"
                  type="checkbox"
                  value="messages"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm text-blue-800 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-200">
                  Mensagens (recebimento e status)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  v-model="subscribedFields"
                  type="checkbox"
                  value="message_template_status_update"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm text-blue-800 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-200">
                  Atualizacoes de status de templates
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  v-model="subscribedFields"
                  type="checkbox"
                  value="phone_number_quality_update"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="text-sm text-blue-800 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-200">
                  Atualizacoes de qualidade de numero
                </span>
              </label>
            </div>
          </div>

          <BaseButton type="submit" :loading="isSaving" full-width>
            Salvar Webhook
          </BaseButton>
        </form>
      </BaseCard>

      <!-- Chatwoot Integration -->
      <BaseCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-text-primary">Integracao Chatwoot</h2>
          </div>
        </template>

        <form @submit.prevent="saveChatwootConfig" class="space-y-5">
          <BaseInput
            v-model="chatwootConfig.url"
            type="url"
            label="Chatwoot URL"
            placeholder="https://your-chatwoot.com"
          />

          <BaseInput
            v-model="chatwootConfig.accessToken"
            type="password"
            label="API Access Token"
            placeholder="Token de acesso da API do Chatwoot"
          />

          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput
              v-model="chatwootConfig.accountId"
              label="Account ID"
              placeholder="ID da conta no Chatwoot"
            />

            <BaseInput
              v-model="chatwootConfig.inboxId"
              label="Inbox ID (WhatsApp)"
              placeholder="ID da caixa de entrada"
            />
          </div>

          <BaseButton type="submit" :loading="isSaving" full-width variant="primary">
            Salvar Configuracao Chatwoot
          </BaseButton>
        </form>
      </BaseCard>

      <!-- Danger Zone -->
      <BaseCard class="border-red-200 dark:border-red-800">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-red-600 dark:text-red-400">Zona de Perigo</h2>
          </div>
        </template>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-text-primary font-medium">Limpar Todos os Dados</p>
            <p class="text-text-secondary text-sm mt-1">
              Isso ira remover todas as credenciais armazenadas localmente.
            </p>
          </div>
          <BaseButton variant="danger" @click="clearAllData">
            Limpar Dados
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMetaStore } from '../stores/meta'
import { AppLayout } from '../components/layout'
import { BaseCard, BaseInput, BaseButton } from '../components/ui'
import type { MetaCredentials } from '../types'

const router = useRouter()
const metaStore = useMetaStore()

const isSaving = ref(false)

const credentials = ref<MetaCredentials>({
  appId: '',
  appSecret: '',
  accessToken: '',
  webhookUrl: '',
  webhookVerifyToken: ''
})

const chatwootConfig = ref({
  url: '',
  accessToken: '',
  accountId: '',
  inboxId: ''
})

const subscribedFields = ref([
  'messages',
  'message_template_status_update',
  'phone_number_quality_update'
])

async function saveCredentials() {
  isSaving.value = true
  try {
    metaStore.setCredentials(credentials.value)
    alert('Credenciais salvas com sucesso!')
  } catch (e: any) {
    alert('Erro ao salvar credenciais: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isSaving.value = false
  }
}

async function saveWebhookConfig() {
  isSaving.value = true
  try {
    metaStore.setCredentials(credentials.value)
    localStorage.setItem('chatwootConfig', JSON.stringify({
      ...chatwootConfig.value,
      subscribedFields: subscribedFields.value
    }))
    alert('Configuracao do webhook salva com sucesso!')
  } catch (e: any) {
    alert('Erro ao salvar configuracao do webhook: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isSaving.value = false
  }
}

async function saveChatwootConfig() {
  isSaving.value = true
  try {
    localStorage.setItem('chatwootConfig', JSON.stringify(chatwootConfig.value))
    alert('Configuracao do Chatwoot salva com sucesso!')
  } catch (e: any) {
    alert('Erro ao salvar configuracao do Chatwoot: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isSaving.value = false
  }
}

function clearAllData() {
  if (confirm('Tem certeza que deseja limpar todos os dados? Esta acao nao pode ser desfeita.')) {
    localStorage.clear()
    credentials.value = {
      appId: '',
      appSecret: '',
      accessToken: '',
      webhookUrl: '',
      webhookVerifyToken: ''
    }
    chatwootConfig.value = {
      url: '',
      accessToken: '',
      accountId: '',
      inboxId: ''
    }
    alert('Dados limpos com sucesso!')
    router.push('/')
  }
}

onMounted(() => {
  metaStore.loadCredentialsFromStorage()
  credentials.value = { ...metaStore.credentials }

  const storedChatwoot = localStorage.getItem('chatwootConfig')
  if (storedChatwoot) {
    try {
      const parsed = JSON.parse(storedChatwoot)
      chatwootConfig.value = {
        url: parsed.url || '',
        accessToken: parsed.accessToken || '',
        accountId: parsed.accountId || '',
        inboxId: parsed.inboxId || ''
      }
      if (parsed.subscribedFields) {
        subscribedFields.value = parsed.subscribedFields
      }
    } catch (e) {
      console.error('Failed to load Chatwoot config', e)
    }
  }
})
</script>
