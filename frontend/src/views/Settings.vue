<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Configurações</h1>
        <p class="text-gray-600 mt-2">Configure sua integração com Meta e Chatwoot</p>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="mr-3">🔑</span>
            Credenciais Meta
          </h2>
          
          <form @submit.prevent="saveCredentials" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">App ID</label>
              <input
                v-model="credentials.appId"
                type="text"
                placeholder="ID do seu aplicativo Meta"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">App Secret</label>
              <input
                v-model="credentials.appSecret"
                type="password"
                placeholder="App Secret do seu aplicativo Meta"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
              <input
                v-model="credentials.accessToken"
                type="password"
                placeholder="Token de acesso do Meta"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">
                Certifique-se de que o token tenha as permissões:
                <code class="bg-gray-100 px-1 rounded">whatsapp_business_messaging</code> e
                <code class="bg-gray-100 px-1 rounded">whatsapp_business_management</code>
              </p>
            </div>

            <button
              type="submit"
              :disabled="isSaving"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              <span v-if="isSaving">Salvando...</span>
              <span v-else>Salvar Credenciais</span>
            </button>
          </form>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="mr-3">🔗</span>
            Configuração Webhook (n8n)
          </h2>
          
          <form @submit.prevent="saveWebhookConfig" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
              <input
                v-model="credentials.webhookUrl"
                type="url"
                required
                placeholder="https://your-n8n-instance.com/webhook/whatsapp"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">
                URL do webhook do n8n para receber eventos do WhatsApp
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Verify Token</label>
              <input
                v-model="credentials.webhookVerifyToken"
                type="text"
                required
                placeholder="Token de verificação do webhook"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">
                Token usado para validar requisições do WhatsApp
              </p>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 class="text-sm font-semibold text-blue-900 mb-2">Eventos Subscritos</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="subscribedFields"
                    type="checkbox"
                    value="messages"
                    class="mr-2"
                  />
                  <span class="text-sm text-blue-800">Mensagens (recebimento e status)</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="subscribedFields"
                    type="checkbox"
                    value="message_template_status_update"
                    class="mr-2"
                  />
                  <span class="text-sm text-blue-800">Atualizações de status de templates</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="subscribedFields"
                    type="checkbox"
                    value="phone_number_quality_update"
                    class="mr-2"
                  />
                  <span class="text-sm text-blue-800">Atualizações de qualidade de número</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isSaving"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              <span v-if="isSaving">Salvando...</span>
              <span v-else>Salvar Webhook</span>
            </button>
          </form>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="mr-3">💬</span>
            Integração Chatwoot
          </h2>
          
          <form @submit.prevent="saveChatwootConfig" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Chatwoot URL</label>
              <input
                v-model="chatwootConfig.url"
                type="url"
                placeholder="https://your-chatwoot.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">API Access Token</label>
              <input
                v-model="chatwootConfig.accessToken"
                type="password"
                placeholder="Token de acesso da API do Chatwoot"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Account ID</label>
              <input
                v-model="chatwootConfig.accountId"
                type="text"
                placeholder="ID da conta no Chatwoot"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Inbox ID (WhatsApp)</label>
              <input
                v-model="chatwootConfig.inboxId"
                type="text"
                placeholder="ID da caixa de entrada do WhatsApp"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              :disabled="isSaving"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
            >
              <span v-if="isSaving">Salvando...</span>
              <span v-else>Salvar Configuração Chatwoot</span>
            </button>
          </form>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span class="mr-3">🗑️</span>
            Limpar Dados
          </h2>
          
          <p class="text-gray-600 mb-4">
            Isso irá remover todas as credenciais armazenadas localmente.
          </p>
          
          <button
            @click="clearAllData"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            Limpar Todos os Dados
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMetaStore } from '../stores/meta'
import Navigation from '../components/Navigation.vue'
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
    alert('Configuração do webhook salva com sucesso!')
  } catch (e: any) {
    alert('Erro ao salvar configuração do webhook: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isSaving.value = false
  }
}

async function saveChatwootConfig() {
  isSaving.value = true
  try {
    localStorage.setItem('chatwootConfig', JSON.stringify(chatwootConfig.value))
    alert('Configuração do Chatwoot salva com sucesso!')
  } catch (e: any) {
    alert('Erro ao salvar configuração do Chatwoot: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isSaving.value = false
  }
}

function clearAllData() {
  if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
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
