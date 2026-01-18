<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gerenciamento WABA</h1>
          <p class="text-gray-600 mt-2">Gerencie contas WhatsApp Business e números de telefone</p>
        </div>
        <button
          @click="refreshData"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
        >
          <span class="mr-2">🔄</span>
          Atualizar
        </button>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else class="space-y-8">
        <div v-if="wabaAccounts.length === 0" class="bg-white rounded-xl shadow-lg p-12 text-center">
          <div class="text-6xl mb-4">📱</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Nenhuma conta WABA configurada</h2>
          <p class="text-gray-600 mb-6">
            Você precisa criar uma conta WhatsApp Business no Meta Business Manager
          </p>
          <a
            href="https://business.facebook.com/wa/manage"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            Criar Conta WABA →
          </a>
        </div>

        <div v-for="waba in wabaAccounts" :key="waba.id" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-indigo-600 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-white">{{ waba.name }}</h2>
                <p class="text-indigo-100 text-sm mt-1">ID: {{ waba.id }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-200 text-green-800': waba.verification_status === 'VERIFIED',
                    'bg-yellow-200 text-yellow-800': waba.verification_status === 'PENDING',
                    'bg-red-200 text-red-800': waba.verification_status === 'NOT_VERIFIED',
                    'bg-gray-200 text-gray-800': !waba.verification_status
                  }"
                >
                  {{ waba.verification_status || 'Desconhecido' }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Números de Telefone</h3>
                <button
                  @click="loadPhoneNumbers(waba.id)"
                  :disabled="isLoadingPhoneNumbers"
                  class="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                >
                  <span class="mr-1">📞</span>
                  Carregar Números
                </button>
              </div>

              <div v-if="getPhoneNumbersForWaba(waba.id).length === 0" class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                Nenhum número configurado para esta conta
              </div>

              <div v-else class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="phone in getPhoneNumbersForWaba(waba.id)"
                  :key="phone.id"
                  class="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ phone.display_phone_number }}</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ phone.phone_number }}</p>
                    </div>
                    <span
                      class="px-2 py-1 rounded text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': phone.quality_rating === 'GREEN',
                        'bg-yellow-100 text-yellow-800': phone.quality_rating === 'YELLOW',
                        'bg-red-100 text-red-800': phone.quality_rating === 'RED',
                        'bg-gray-100 text-gray-800': !phone.quality_rating
                      }"
                    >
                      {{ phone.quality_rating || 'Unknown' }}
                    </span>
                  </div>

                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Status:</span>
                      <span :class="phone.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'">
                        {{ phone.status }}
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Nome Verificado:</span>
                      <span class="text-gray-900">{{ phone.verified_name }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Plataforma:</span>
                      <span class="text-gray-900">{{ phone.platform_type }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Verificação:</span>
                      <span
                        :class="phone.code_verification_status === 'VERIFIED' ? 'text-green-600' : 'text-orange-600'"
                      >
                        {{ phone.code_verification_status }}
                      </span>
                    </div>
                  </div>

                  <div v-if="phone.code_verification_status !== 'VERIFIED'" class="mt-4 pt-4 border-t border-gray-200">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Código de Verificação
                    </label>
                    <div class="flex space-x-2">
                      <input
                        v-model="verificationCodes[phone.id]"
                        type="text"
                        placeholder="Digite o código recebido no WhatsApp"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        @click="verifyNumber(phone.id)"
                        :disabled="isVerifying"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50"
                      >
                        Verificar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Configuração do Webhook</h3>
                  <p class="text-sm text-gray-600 mt-1">
                    Configure o webhook para receber eventos do WhatsApp
                  </p>
                </div>
                <button
                  @click="showWebhookModal(waba.id)"
                  class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
                >
                  <span class="mr-2">🔗</span>
                  Configurar Webhook
                </button>
              </div>

              <div v-if="waba.webhook_config" class="mt-4 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm font-medium text-blue-900 mb-1">URL Configurada:</p>
                <p class="text-sm text-blue-700 break-all">{{ waba.webhook_config.url }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showWebhookSetup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showWebhookSetup = false"
    >
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Configurar Webhook</h3>
        <form @submit.prevent="configureWebhook" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
            <input
              v-model="webhookConfig.url"
              type="url"
              required
              placeholder="https://your-n8n.com/webhook/whatsapp"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Verify Token</label>
            <input
              v-model="webhookConfig.verifyToken"
              type="text"
              required
              placeholder="Token de verificação"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Campos Subscritos</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="messages"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Mensagens</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="message_template_status_update"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Atualização de Status de Templates</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="phone_number_quality_update"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Atualização de Qualidade do Número</span>
              </label>
            </div>
          </div>
          <div class="flex space-x-3">
            <button
              type="button"
              @click="showWebhookSetup = false"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isConfiguringWebhook"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              {{ isConfiguringWebhook ? 'Configurando...' : 'Configurar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'
import Navigation from '../components/Navigation.vue'
import type { PhoneNumber } from '../types'

const metaStore = useMetaStore()

const isLoading = ref(false)
const isLoadingPhoneNumbers = ref(false)
const isVerifying = ref(false)
const isConfiguringWebhook = ref(false)
const showWebhookSetup = ref(false)
const selectedWabaId = ref<string | null>(null)

const verificationCodes = ref<Record<string, string>>({})
const webhookConfig = ref({
  url: '',
  verifyToken: '',
  fields: ['messages', 'message_template_status_update', 'phone_number_quality_update']
})

const wabaAccounts = computed(() => metaStore.wabaAccounts)
const phoneNumbers = computed(() => metaStore.phoneNumbers)

function getPhoneNumbersForWaba(wabaId: string): PhoneNumber[] {
  return phoneNumbers.value.filter((phone: PhoneNumber) => {
    return phone.id.includes(wabaId)
  })
}

async function refreshData() {
  isLoading.value = true
  try {
    await metaStore.fetchWabaAccounts()
  } finally {
    isLoading.value = false
  }
}

async function loadPhoneNumbers(wabaId: string) {
  isLoadingPhoneNumbers.value = true
  try {
    await metaStore.fetchPhoneNumbers(wabaId)
  } finally {
    isLoadingPhoneNumbers.value = false
  }
}

async function verifyNumber(phoneNumberId: string) {
  const code = verificationCodes.value[phoneNumberId]
  if (!code) {
    alert('Digite o código de verificação')
    return
  }

  isVerifying.value = true
  try {
    await metaStore.verifyPhoneNumber(phoneNumberId, code)
    alert('Número verificado com sucesso!')
    verificationCodes.value[phoneNumberId] = ''
  } catch (e: any) {
    alert('Erro ao verificar número: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isVerifying.value = false
  }
}

function showWebhookModal(wabaId: string) {
  selectedWabaId.value = wabaId
  webhookConfig.value = {
    url: metaStore.credentials.webhookUrl || '',
    verifyToken: metaStore.credentials.webhookVerifyToken || '',
    fields: ['messages', 'message_template_status_update', 'phone_number_quality_update']
  }
  showWebhookSetup.value = true
}

async function configureWebhook() {
  if (!selectedWabaId.value) return

  isConfiguringWebhook.value = true
  try {
    await metaStore.configureWebhook(
      selectedWabaId.value,
      webhookConfig.value.url,
      webhookConfig.value.verifyToken,
      webhookConfig.value.fields
    )
    alert('Webhook configurado com sucesso!')
    showWebhookSetup.value = false
    await refreshData()
  } catch (e: any) {
    alert('Erro ao configurar webhook: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isConfiguringWebhook.value = false
  }
}

onMounted(async () => {
  await refreshData()
})
</script>
