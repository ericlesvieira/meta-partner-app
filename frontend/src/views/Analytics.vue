<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
        <p class="text-gray-600 mt-2">Estatísticas de uso da WhatsApp Business API</p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
            <input
              v-model="startDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-2">Data Fim</label>
            <input
              v-model="endDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            @click="loadAnalytics"
            :disabled="isLoading"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            <span v-if="isLoading">Carregando...</span>
            <span v-else>Carregar Dados</span>
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="analytics.length === 0" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <div class="text-6xl mb-4">📊</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Nenhum dado disponível</h2>
        <p class="text-gray-600 mb-6">
          Selecione um período de tempo para visualizar as estatísticas
        </p>
        <button
          @click="loadAnalytics"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
        >
          Carregar Analytics →
        </button>
      </div>

      <div v-else class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Mensagens Enviadas</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalSent }}</p>
              </div>
              <div class="text-3xl">📤</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Entregues</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalDelivered }}</p>
              </div>
              <div class="text-3xl">✅</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Lidas</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalRead }}</p>
              </div>
              <div class="text-3xl">👁️</div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Falhas</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">{{ totalFailed }}</p>
              </div>
              <div class="text-3xl">❌</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Evolução Temporal</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Enviadas</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Entregues</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Lidas</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Falhas</th>
                  <th class="text-right py-3 px-4 text-sm font-semibold text-gray-700">Taxa de Entrega</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="data in analytics"
                  :key="data.date"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4 text-sm text-gray-900">{{ formatDate(data.date) }}</td>
                  <td class="py-3 px-4 text-sm text-gray-900 text-right">{{ data.sent }}</td>
                  <td class="py-3 px-4 text-sm text-gray-900 text-right">{{ data.delivered }}</td>
                  <td class="py-3 px-4 text-sm text-gray-900 text-right">{{ data.read }}</td>
                  <td class="py-3 px-4 text-sm text-red-600 text-right">{{ data.failed }}</td>
                  <td class="py-3 px-4 text-sm text-gray-900 text-right">
                    <span
                      :class="{
                        'text-green-600': getDeliveryRate(data) >= 95,
                        'text-yellow-600': getDeliveryRate(data) >= 80 && getDeliveryRate(data) < 95,
                        'text-red-600': getDeliveryRate(data) < 80
                      }"
                    >
                      {{ getDeliveryRate(data).toFixed(1) }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Taxas de Sucesso</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600">{{ deliveryRate.toFixed(1) }}%</div>
              <p class="text-sm text-gray-600 mt-2">Taxa de Entrega</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all"
                  :style="{ width: deliveryRate + '%' }"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-4xl font-bold text-purple-600">{{ readRate.toFixed(1) }}%</div>
              <p class="text-sm text-gray-600 mt-2">Taxa de Leitura</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  class="bg-purple-600 h-2 rounded-full transition-all"
                  :style="{ width: readRate + '%' }"
                ></div>
              </div>
            </div>

            <div class="text-center">
              <div class="text-4xl font-bold text-red-600">{{ errorRate.toFixed(1) }}%</div>
              <p class="text-sm text-gray-600 mt-2">Taxa de Erro</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  class="bg-red-600 h-2 rounded-full transition-all"
                  :style="{ width: errorRate + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMetaStore } from '../stores/meta'
import Navigation from '../components/Navigation.vue'

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
