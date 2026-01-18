<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-2">Visão geral da sua integração WhatsApp Business API</p>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Contas WABA</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ wabaAccounts.length }}</p>
              </div>
              <div class="text-3xl">📱</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Números Ativos</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalPhoneNumbers }}</p>
              </div>
              <div class="text-3xl">📞</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Templates</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalTemplates }}</p>
              </div>
              <div class="text-3xl">📝</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Status do Webhook</p>
                <p class="text-lg font-bold mt-1" :class="webhookStatusClass">{{ webhookStatus }}</p>
              </div>
              <div class="text-3xl">🔗</div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 mb-8">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Contas WhatsApp Business</h2>
            <div v-if="wabaAccounts.length === 0" class="text-center py-8 text-gray-500">
              Nenhuma conta WABA configurada
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="waba in wabaAccounts"
                :key="waba.id"
                class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                @click="selectWaba(waba.id)"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ waba.name }}</h3>
                    <p class="text-sm text-gray-600 mt-1">ID: {{ waba.id }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': waba.verification_status === 'VERIFIED',
                        'bg-yellow-100 text-yellow-800': waba.verification_status === 'PENDING',
                        'bg-gray-100 text-gray-800': !waba.verification_status
                      }"
                    >
                      {{ waba.verification_status || 'Unknown' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Configuração Webhook</h2>
            <div v-if="credentials.webhookUrl" class="space-y-4">
              <div class="p-4 bg-blue-50 rounded-lg">
                <p class="text-sm font-medium text-blue-900 mb-1">URL do Webhook</p>
                <p class="text-sm text-blue-700 break-all">{{ credentials.webhookUrl }}</p>
              </div>
              <div class="p-4 bg-green-50 rounded-lg">
                <p class="text-sm font-medium text-green-900 mb-1">Verify Token</p>
                <p class="text-sm text-green-700 font-mono">{{ credentials.webhookVerifyToken }}</p>
              </div>
              <button
                @click="testWebhook"
                :disabled="isTestingWebhook"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50"
              >
                {{ isTestingWebhook ? 'Testando...' : 'Testar Webhook' }}
              </button>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              Configure o webhook nas configurações
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Mensagens Recentes</h2>
          <div class="text-center py-8 text-gray-500">
            <p>Configure os webhooks no n8n para visualizar mensagens</p>
            <router-link to="/settings" class="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
              Ir para Configurações →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMetaStore } from '../stores/meta'
import Navigation from '../components/Navigation.vue'

const router = useRouter()
const metaStore = useMetaStore()

const isLoading = ref(false)
const isTestingWebhook = ref(false)

const wabaAccounts = computed(() => metaStore.wabaAccounts)
const credentials = computed(() => metaStore.credentials)

const totalPhoneNumbers = computed(() => metaStore.phoneNumbers.length)
const totalTemplates = computed(() => metaStore.templates.length)

const webhookStatus = computed(() => {
  return credentials.value.webhookUrl ? 'Configurado' : 'Não configurado'
})

const webhookStatusClass = computed(() => {
  return credentials.value.webhookUrl ? 'text-green-600' : 'text-red-600'
})

function selectWaba(wabaId: string) {
  router.push(`/waba?id=${wabaId}`)
}

async function testWebhook() {
  isTestingWebhook.value = true
  try {
    await fetch(`${credentials.value.webhookUrl}/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    })
    alert('Webhook testado com sucesso!')
  } catch (e) {
    alert('Erro ao testar webhook: ' + (e as Error).message)
  } finally {
    isTestingWebhook.value = false
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    await metaStore.fetchWabaAccounts()
  } finally {
    isLoading.value = false
  }
})
</script>
