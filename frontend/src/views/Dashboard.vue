<template>
  <AppLayout>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
    </div>

    <div v-else class="animate-fade-in space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseCard class="relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-6 -mt-6"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Contas WABA</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ wabaAccounts.length }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-6 -mt-6"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Numeros Ativos</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalPhoneNumbers }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-6 -mt-6"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Templates</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalTemplates }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard class="relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-6 -mt-6"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Status Webhook</p>
                <div class="flex items-center gap-2 mt-1">
                  <BaseBadge :variant="credentials.webhookUrl ? 'success' : 'error'" dot rounded>
                    {{ webhookStatus }}
                  </BaseBadge>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- WABA Accounts -->
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-text-primary">Contas WhatsApp Business</h2>
          </template>

          <div v-if="wabaAccounts.length === 0" class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
              <svg class="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-text-muted">Nenhuma conta WABA configurada</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="waba in wabaAccounts"
              :key="waba.id"
              class="p-4 rounded-lg bg-surface-elevated hover:bg-surface-hover border border-border hover:border-border-hover transition-all cursor-pointer group"
              @click="selectWaba(waba.id)"
            >
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <h3 class="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                    {{ waba.name }}
                  </h3>
                  <p class="text-sm text-text-muted mt-0.5 font-mono">ID: {{ waba.id }}</p>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <BaseBadge
                    :variant="getStatusVariant(waba.verification_status)"
                    size="sm"
                    rounded
                  >
                    {{ waba.verification_status || 'Unknown' }}
                  </BaseBadge>
                  <svg class="w-5 h-5 text-text-muted group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Webhook Config -->
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-text-primary">Configuracao Webhook</h2>
          </template>

          <div v-if="credentials.webhookUrl" class="space-y-4">
            <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p class="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">URL do Webhook</p>
              <p class="text-sm text-blue-700 dark:text-blue-400 break-all font-mono">{{ credentials.webhookUrl }}</p>
            </div>
            <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p class="text-sm font-medium text-green-900 dark:text-green-300 mb-1">Verify Token</p>
              <p class="text-sm text-green-700 dark:text-green-400 font-mono">{{ credentials.webhookVerifyToken }}</p>
            </div>
            <BaseButton :loading="isTestingWebhook" full-width @click="testWebhook">
              {{ isTestingWebhook ? 'Testando...' : 'Testar Webhook' }}
            </BaseButton>
          </div>

          <div v-else class="text-center py-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
              <svg class="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <p class="text-text-muted mb-3">Configure o webhook nas configuracoes</p>
            <router-link to="/settings">
              <BaseButton variant="secondary" size="sm">Ir para Configuracoes</BaseButton>
            </router-link>
          </div>
        </BaseCard>
      </div>

      <!-- Recent Messages -->
      <BaseCard>
        <template #header>
          <h2 class="text-lg font-semibold text-text-primary">Mensagens Recentes</h2>
        </template>

        <div class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
            <svg class="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p class="text-text-muted mb-3">Configure os webhooks no n8n para visualizar mensagens</p>
          <router-link to="/settings">
            <BaseButton variant="outline" size="sm">
              Ir para Configuracoes
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMetaStore } from '../stores/meta'
import { AppLayout } from '../components/layout'
import { BaseCard, BaseButton, BaseBadge } from '../components/ui'

const router = useRouter()
const metaStore = useMetaStore()

const isLoading = ref(false)
const isTestingWebhook = ref(false)

const wabaAccounts = computed(() => metaStore.wabaAccounts)
const credentials = computed(() => metaStore.credentials)

const totalPhoneNumbers = computed(() => metaStore.phoneNumbers.length)
const totalTemplates = computed(() => metaStore.templates.length)

const webhookStatus = computed(() => {
  return credentials.value.webhookUrl ? 'Configurado' : 'Nao configurado'
})

function getStatusVariant(status: string | undefined): 'success' | 'warning' | 'default' {
  if (status === 'VERIFIED') return 'success'
  if (status === 'PENDING') return 'warning'
  return 'default'
}

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
