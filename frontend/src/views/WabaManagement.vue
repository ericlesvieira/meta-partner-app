<template>
  <AppLayout>
    <div class="animate-fade-in space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold text-text-primary">Gerenciamento WABA</h1>
          <p class="text-text-secondary mt-1">Gerencie contas WhatsApp Business e numeros de telefone</p>
        </div>
        <BaseButton @click="refreshData" :loading="isLoading">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </BaseButton>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>

      <!-- Empty State -->
      <BaseCard v-else-if="wabaAccounts.length === 0" variant="elevated" class="text-center py-12">
        <div class="text-6xl mb-4">
          <svg class="w-16 h-16 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary mb-2">Nenhuma conta WABA configurada</h2>
        <p class="text-text-secondary mb-6 max-w-md mx-auto">
          Voce precisa criar uma conta WhatsApp Business no Meta Business Manager
        </p>
        <BaseButton
          as="a"
          href="https://business.facebook.com/wa/manage"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criar Conta WABA
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </BaseButton>
      </BaseCard>

      <!-- WABA Accounts List -->
      <div v-else class="space-y-6">
        <BaseCard v-for="waba in wabaAccounts" :key="waba.id" variant="elevated" class="overflow-hidden">
          <!-- WABA Header -->
          <template #header>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-primary-600 to-primary-700 -mx-6 -mt-4 px-6 py-4">
              <div>
                <h2 class="text-xl font-bold text-white">{{ waba.name }}</h2>
                <p class="text-primary-100 text-sm mt-1">ID: {{ waba.id }}</p>
              </div>
              <BaseBadge
                :variant="getVerificationVariant(waba.verification_status)"
                size="md"
              >
                {{ waba.verification_status || 'Desconhecido' }}
              </BaseBadge>
            </div>
          </template>

          <!-- Phone Numbers Section -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-text-primary">Numeros de Telefone</h3>
              <BaseButton
                variant="ghost"
                size="sm"
                @click="loadPhoneNumbers(waba.id)"
                :loading="isLoadingPhoneNumbers"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Carregar Numeros
              </BaseButton>
            </div>

            <!-- No Phone Numbers -->
            <div v-if="getPhoneNumbersForWaba(waba.id).length === 0" class="text-center py-8 text-text-muted bg-surface-elevated rounded-lg">
              Nenhum numero configurado para esta conta
            </div>

            <!-- Phone Numbers Grid -->
            <div v-else class="grid md:grid-cols-2 gap-4">
              <div
                v-for="phone in getPhoneNumbersForWaba(waba.id)"
                :key="phone.id"
                class="p-4 border border-border rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors bg-surface"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h4 class="font-semibold text-text-primary">{{ phone.display_phone_number }}</h4>
                    <p class="text-sm text-text-secondary mt-1">{{ phone.phone_number }}</p>
                  </div>
                  <BaseBadge :variant="getQualityVariant(phone.quality_rating)" size="sm">
                    {{ phone.quality_rating || 'Unknown' }}
                  </BaseBadge>
                </div>

                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-text-secondary">Status:</span>
                    <span :class="phone.status === 'ACTIVE' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ phone.status }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">Nome Verificado:</span>
                    <span class="text-text-primary">{{ phone.verified_name }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">Plataforma:</span>
                    <span class="text-text-primary">{{ phone.platform_type }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">Verificacao:</span>
                    <span :class="phone.code_verification_status === 'VERIFIED' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                      {{ phone.code_verification_status }}
                    </span>
                  </div>
                </div>

                <!-- Verification Code Input -->
                <div v-if="phone.code_verification_status !== 'VERIFIED'" class="mt-4 pt-4 border-t border-border">
                  <label class="block text-sm font-medium text-text-primary mb-2">
                    Codigo de Verificacao
                  </label>
                  <div class="flex gap-2">
                    <BaseInput
                      v-model="verificationCodes[phone.id]"
                      type="text"
                      placeholder="Digite o codigo recebido no WhatsApp"
                      class="flex-1"
                    />
                    <BaseButton
                      @click="verifyNumber(phone.id)"
                      :loading="isVerifying"
                      size="sm"
                    >
                      Verificar
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Webhook Configuration Section -->
          <div class="border-t border-border pt-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-text-primary">Configuracao do Webhook</h3>
                <p class="text-sm text-text-secondary mt-1">
                  Configure o webhook para receber eventos do WhatsApp
                </p>
              </div>
              <BaseButton variant="secondary" @click="showWebhookModal(waba.id)">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Configurar Webhook
              </BaseButton>
            </div>

            <div v-if="waba.webhook_config" class="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <p class="text-sm font-medium text-primary-900 dark:text-primary-100 mb-1">URL Configurada:</p>
              <p class="text-sm text-primary-700 dark:text-primary-300 break-all font-mono">{{ waba.webhook_config.url }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Webhook Configuration Modal -->
      <BaseModal v-model="showWebhookSetup" title="Configurar Webhook" size="lg">
        <form @submit.prevent="configureWebhook" class="space-y-6">
          <BaseInput
            v-model="webhookConfig.url"
            type="url"
            label="Webhook URL"
            placeholder="https://your-n8n.com/webhook/whatsapp"
            required
          />

          <BaseInput
            v-model="webhookConfig.verifyToken"
            type="text"
            label="Verify Token"
            placeholder="Token de verificacao"
            required
          />

          <div>
            <label class="block text-sm font-medium text-text-primary mb-3">Campos Subscritos</label>
            <div class="space-y-3">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="messages"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-3 text-sm text-text-primary">Mensagens</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="message_template_status_update"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-3 text-sm text-text-primary">Atualizacao de Status de Templates</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="webhookConfig.fields"
                  type="checkbox"
                  value="phone_number_quality_update"
                  class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-3 text-sm text-text-primary">Atualizacao de Qualidade do Numero</span>
              </label>
            </div>
          </div>
        </form>

        <template #footer>
          <BaseButton variant="secondary" @click="showWebhookSetup = false">
            Cancelar
          </BaseButton>
          <BaseButton @click="configureWebhook" :loading="isConfiguringWebhook">
            Configurar
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'
import AppLayout from '../components/layout/AppLayout.vue'
import { BaseButton, BaseCard, BaseInput, BaseBadge, BaseModal } from '../components/ui'
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

function getVerificationVariant(status: string | undefined): 'success' | 'warning' | 'danger' | 'default' {
  switch (status) {
    case 'VERIFIED': return 'success'
    case 'PENDING': return 'warning'
    case 'NOT_VERIFIED': return 'danger'
    default: return 'default'
  }
}

function getQualityVariant(rating: string | undefined): 'success' | 'warning' | 'danger' | 'default' {
  switch (rating) {
    case 'GREEN': return 'success'
    case 'YELLOW': return 'warning'
    case 'RED': return 'danger'
    default: return 'default'
  }
}

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
    alert('Digite o codigo de verificacao')
    return
  }

  isVerifying.value = true
  try {
    await metaStore.verifyPhoneNumber(phoneNumberId, code)
    alert('Numero verificado com sucesso!')
    verificationCodes.value[phoneNumberId] = ''
  } catch (e: any) {
    alert('Erro ao verificar numero: ' + (e.message || 'Erro desconhecido'))
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
