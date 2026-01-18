<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
    <Navigation />
    
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Meta Solution Provider Manager
        </h1>
        <p class="text-xl text-gray-600">
          Gerencie sua integração com WhatsApp Business API para Chatwoot
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Configurar Integração</h2>
        
        <form @submit.prevent="handleConnect" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              App ID
            </label>
            <input
              v-model="credentials.appId"
              type="text"
              required
              placeholder="ID do seu aplicativo Meta"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              App Secret
            </label>
            <input
              v-model="credentials.appSecret"
              type="password"
              required
              placeholder="App Secret do seu aplicativo Meta"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Access Token
            </label>
            <input
              v-model="credentials.accessToken"
              type="password"
              required
              placeholder="Token de acesso com permissões whatsapp_business_messaging e whatsapp_business_management"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL (n8n)
            </label>
            <input
              v-model="credentials.webhookUrl"
              type="url"
              required
              placeholder="https://your-n8n-instance.com/webhook/whatsapp"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Webhook Verify Token
            </label>
            <input
              v-model="credentials.webhookVerifyToken"
              type="text"
              required
              placeholder="Token de verificação do webhook"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <span v-if="isLoading">Conectando...</span>
            <span v-else>Conectar com Meta</span>
          </button>
        </form>

        <div v-if="error" class="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
          <p class="text-red-700 font-medium">{{ error }}</p>
        </div>

        <div v-if="success" class="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
          <p class="text-green-700 font-medium">{{ success }}</p>
          <router-link
            to="/dashboard"
            class="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Ir para o Dashboard →
          </router-link>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl mb-4">📱</div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">WhatsApp Management</h3>
          <p class="text-gray-600 text-sm">Gerencie contas WhatsApp, números e configurações</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl mb-4">📝</div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Templates</h3>
          <p class="text-gray-600 text-sm">Crie e gerencie templates de mensagens aprovados</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
          <p class="text-gray-600 text-sm">Acompanhe métricas e estatísticas de uso</p>
        </div>
      </div>

      <div class="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">📋 Próximos Passos</h3>
        <ol class="list-decimal list-inside space-y-2 text-blue-800">
          <li>Crie um aplicativo no Meta for Developers com o produto WhatsApp</li>
          <li>Solicite as permissões <code class="bg-blue-100 px-2 py-1 rounded">whatsapp_business_messaging</code> e <code class="bg-blue-100 px-2 py-1 rounded">whatsapp_business_management</code></li>
          <li>Configure os webhooks no n8n para receber/enviar mensagens</li>
          <li>Integre com o Chatwoot através dos webhooks</li>
          <li>Envie o vídeo de demonstração para aprovação do Meta</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMetaStore } from '../stores/meta'
import Navigation from '../components/Navigation.vue'
import type { MetaCredentials } from '../types'

const metaStore = useMetaStore()

const credentials = ref<MetaCredentials>({
  appId: '',
  appSecret: '',
  accessToken: '',
  webhookUrl: '',
  webhookVerifyToken: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

async function handleConnect() {
  isLoading.value = true
  error.value = null
  success.value = null

  try {
    metaStore.setCredentials(credentials.value)
    await metaStore.fetchWabaAccounts()
    success.value = 'Conexão estabelecida com sucesso!'
  } catch (e: any) {
    error.value = e.message || 'Erro ao conectar com Meta. Verifique suas credenciais.'
  } finally {
    isLoading.value = false
  }
}
</script>
