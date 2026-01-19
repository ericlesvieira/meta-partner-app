<template>
  <AppLayout>
    <div class="animate-fade-in space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-text-primary">Analytics</h1>
        <p class="text-text-secondary mt-1">Estatisticas de uso da WhatsApp Business API</p>
      </div>

      <!-- Date Filter Card -->
      <BaseCard variant="default">
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-text-primary mb-2">Data Inicio</label>
            <input
              v-model="startDate"
              type="date"
              class="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-text-primary transition-colors"
            />
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-text-primary mb-2">Data Fim</label>
            <input
              v-model="endDate"
              type="date"
              class="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-text-primary transition-colors"
            />
          </div>
          <BaseButton @click="loadAnalytics" :loading="isLoading">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Carregar Dados
          </BaseButton>
        </div>
      </BaseCard>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>

      <!-- Empty State -->
      <BaseCard v-else-if="analytics.length === 0" variant="elevated" class="text-center py-12">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary mb-2">Nenhum dado disponivel</h2>
        <p class="text-text-secondary mb-6 max-w-md mx-auto">
          Selecione um periodo de tempo para visualizar as estatisticas
        </p>
        <BaseButton @click="loadAnalytics">
          Carregar Analytics
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </BaseButton>
      </BaseCard>

      <!-- Analytics Content -->
      <div v-else class="space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <BaseCard variant="elevated" class="relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Mensagens Enviadas</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalSent.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </BaseCard>

          <BaseCard variant="elevated" class="relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Entregues</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalDelivered.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </BaseCard>

          <BaseCard variant="elevated" class="relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Lidas</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalRead.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </BaseCard>

          <BaseCard variant="elevated" class="relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-secondary">Falhas</p>
                <p class="text-3xl font-bold text-text-primary mt-1">{{ totalFailed.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Data Table -->
        <BaseCard variant="elevated">
          <template #header>
            <h2 class="text-lg font-bold text-text-primary">Evolucao Temporal</h2>
          </template>
          <div class="overflow-x-auto -mx-6">
            <table class="w-full min-w-[600px]">
              <thead>
                <tr class="border-b border-border">
                  <th class="text-left py-3 px-6 text-sm font-semibold text-text-secondary">Data</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Enviadas</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Entregues</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Lidas</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-text-secondary">Falhas</th>
                  <th class="text-right py-3 px-6 text-sm font-semibold text-text-secondary">Taxa de Entrega</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="data in analytics"
                  :key="data.date"
                  class="border-b border-border/50 hover:bg-surface-hover transition-colors"
                >
                  <td class="py-3 px-6 text-sm text-text-primary">{{ formatDate(data.date) }}</td>
                  <td class="py-3 px-4 text-sm text-text-primary text-right">{{ data.sent.toLocaleString() }}</td>
                  <td class="py-3 px-4 text-sm text-text-primary text-right">{{ data.delivered.toLocaleString() }}</td>
                  <td class="py-3 px-4 text-sm text-text-primary text-right">{{ data.read.toLocaleString() }}</td>
                  <td class="py-3 px-4 text-sm text-red-600 dark:text-red-400 text-right">{{ data.failed.toLocaleString() }}</td>
                  <td class="py-3 px-6 text-sm text-right">
                    <span
                      :class="{
                        'text-green-600 dark:text-green-400': getDeliveryRate(data) >= 95,
                        'text-yellow-600 dark:text-yellow-400': getDeliveryRate(data) >= 80 && getDeliveryRate(data) < 95,
                        'text-red-600 dark:text-red-400': getDeliveryRate(data) < 80
                      }"
                      class="font-medium"
                    >
                      {{ getDeliveryRate(data).toFixed(1) }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>

        <!-- Success Rates -->
        <BaseCard variant="elevated">
          <template #header>
            <h2 class="text-lg font-bold text-text-primary">Taxas de Sucesso</h2>
          </template>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ deliveryRate.toFixed(1) }}%</div>
              <p class="text-sm text-text-secondary mt-2">Taxa de Entrega</p>
              <div class="w-full bg-surface-elevated rounded-full h-2.5 mt-4">
                <div
                  class="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  :style="{ width: deliveryRate + '%' }"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ readRate.toFixed(1) }}%</div>
              <p class="text-sm text-text-secondary mt-2">Taxa de Leitura</p>
              <div class="w-full bg-surface-elevated rounded-full h-2.5 mt-4">
                <div
                  class="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                  :style="{ width: readRate + '%' }"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-4xl font-bold text-red-600 dark:text-red-400">{{ errorRate.toFixed(1) }}%</div>
              <p class="text-sm text-text-secondary mt-2">Taxa de Erro</p>
              <div class="w-full bg-surface-elevated rounded-full h-2.5 mt-4">
                <div
                  class="bg-red-600 dark:bg-red-500 h-2.5 rounded-full transition-all duration-500"
                  :style="{ width: errorRate + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'
import AppLayout from '../components/layout/AppLayout.vue'
import { BaseButton, BaseCard } from '../components/ui'

const metaStore = useMetaStore()

const isLoading = ref(false)

const today = new Date()
const last30Days = new Date(today)
last30Days.setDate(last30Days.getDate() - 30)

const startDate = ref(last30Days.toISOString().split('T')[0])
const endDate = ref(today.toISOString().split('T')[0])

const analytics = computed(() => metaStore.analytics)

const totalSent = computed(() => analytics.value.reduce((sum, data) => sum + data.sent, 0))
const totalDelivered = computed(() => analytics.value.reduce((sum, data) => sum + data.delivered, 0))
const totalRead = computed(() => analytics.value.reduce((sum, data) => sum + data.read, 0))
const totalFailed = computed(() => analytics.value.reduce((sum, data) => sum + data.failed, 0))

const deliveryRate = computed(() => {
  if (totalSent.value === 0) return 0
  return (totalDelivered.value / totalSent.value) * 100
})

const readRate = computed(() => {
  if (totalDelivered.value === 0) return 0
  return (totalRead.value / totalDelivered.value) * 100
})

const errorRate = computed(() => {
  if (totalSent.value === 0) return 0
  return (totalFailed.value / totalSent.value) * 100
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}

function getDeliveryRate(data: any): number {
  if (data.sent === 0) return 0
  return (data.delivered / data.sent) * 100
}

async function loadAnalytics() {
  const wabaId = currentWabaId.value
  const start = startDate.value
  const end = endDate.value

  if (!wabaId) {
    alert('Selecione uma conta WABA primeiro')
    return
  }

  if (!start || !end) {
    alert('Selecione as datas')
    return
  }

  isLoading.value = true
  try {
    await metaStore.fetchAnalytics(wabaId as string, start, end)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const wabaId = urlParams.get('id')
  if (wabaId) {
    metaStore.selectedWabaId = wabaId
  }
})

const currentWabaId = computed(() => {
  const id = metaStore.selectedWabaId
  return typeof id === 'string' ? id : ''
})
</script>
