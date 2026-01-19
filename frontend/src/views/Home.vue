<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto animate-fade-in">
      <!-- Hero Section -->
      <div class="text-center mb-10">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="ericlestatistica" class="h-20 w-20 rounded-full shadow-lg" />
        </div>
        <h1 class="text-4xl font-bold text-text-primary mb-3">
          Meta Solution Provider Manager
        </h1>
        <p class="text-lg text-text-secondary">
          Gerencie sua integracao WhatsApp Business API para Chatwoot
        </p>
      </div>

      <!-- Configuration Card -->
      <BaseCard variant="elevated" class="mb-8">
        <template #header>
          <h2 class="text-xl font-bold text-text-primary">Configurar Integracao</h2>
        </template>

        <form @submit.prevent="handleConnect" class="space-y-5">
          <BaseInput
            v-model="credentials.appId"
            label="App ID"
            placeholder="ID do seu aplicativo Meta"
            required
          />

          <BaseInput
            v-model="credentials.appSecret"
            type="password"
            label="App Secret"
            placeholder="App Secret do seu aplicativo Meta"
            required
          />

          <BaseInput
            v-model="credentials.accessToken"
            type="password"
            label="Access Token"
            placeholder="Token de acesso com permissoes whatsapp_business_messaging"
            hint="Certifique-se de que o token tenha as permissoes: whatsapp_business_messaging e whatsapp_business_management"
            required
          />

          <BaseInput
            v-model="credentials.webhookUrl"
            type="url"
            label="Webhook URL (n8n)"
            placeholder="https://your-n8n-instance.com/webhook/whatsapp"
            required
          />

          <BaseInput
            v-model="credentials.webhookVerifyToken"
            label="Webhook Verify Token"
            placeholder="Token de verificacao do webhook"
            required
          />

          <BaseButton type="submit" :loading="isLoading" full-width size="lg">
            {{ isLoading ? 'Conectando...' : 'Conectar com Meta' }}
          </BaseButton>
        </form>

        <!-- Messages -->
        <div v-if="error" class="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div class="flex items-center gap-2 text-red-700 dark:text-red-400">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ error }}</span>
          </div>
        </div>

        <div v-if="success" class="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div class="flex items-center gap-2 text-green-700 dark:text-green-400">
            <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ success }}</span>
          </div>
          <router-link
            to="/dashboard"
            class="mt-3 inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Ir para o Dashboard
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </BaseCard>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <BaseCard hoverable class="text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">WhatsApp Management</h3>
          <p class="text-text-secondary text-sm">Gerencie contas WhatsApp, numeros e configuracoes</p>
        </BaseCard>

        <BaseCard hoverable class="text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-400/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Templates</h3>
          <p class="text-text-secondary text-sm">Crie e gerencie templates de mensagens aprovados</p>
        </BaseCard>

        <BaseCard hoverable class="text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Analytics</h3>
          <p class="text-text-secondary text-sm">Acompanhe metricas e estatisticas de uso</p>
        </BaseCard>
      </div>

      <!-- Legal Links -->
      <BaseCard>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Legal</h3>
        <p class="text-text-secondary mb-4">Acesse as politicas e termos oficiais do servico.</p>
        <div class="flex flex-wrap gap-3">
          <router-link to="/privacy-policy">
            <BaseButton variant="secondary" size="sm">Privacy Policy</BaseButton>
          </router-link>
          <router-link to="/terms-of-service">
            <BaseButton variant="secondary" size="sm">Terms of Service</BaseButton>
          </router-link>
          <router-link to="/data-deletion">
            <BaseButton variant="secondary" size="sm">Data Deletion</BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMetaStore } from '../stores/meta'
import { AppLayout } from '../components/layout'
import { BaseCard, BaseInput, BaseButton } from '../components/ui'
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
    success.value = 'Conexao estabelecida com sucesso!'
  } catch (e: any) {
    error.value = e.message || 'Erro ao conectar com Meta. Verifique suas credenciais.'
  } finally {
    isLoading.value = false
  }
}
</script>
