import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  WhatsAppBusinessAccount,
  PhoneNumber,
  MessageTemplate,
  MetaCredentials,
  AnalyticsData
} from '../types'
import * as metaApi from '../api/meta'

export const useMetaStore = defineStore('meta', () => {
  const credentials = ref<MetaCredentials>({
    appId: '',
    appSecret: '',
    accessToken: '',
    whatsappBusinessAccountId: '',
    phoneNumberId: '',
    webhookUrl: '',
    webhookVerifyToken: ''
  })

  const wabaAccounts = ref<WhatsAppBusinessAccount[]>([])
  const phoneNumbers = ref<PhoneNumber[]>([])
  const templates = ref<MessageTemplate[]>([])
  const analytics = ref<AnalyticsData[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isConnected = computed(() => !!credentials.value.accessToken)
  const selectedWabaId = ref<string | null>(null)

  function setCredentials(creds: Partial<MetaCredentials>) {
    credentials.value = { ...credentials.value, ...creds }
    localStorage.setItem('metaCredentials', JSON.stringify(credentials.value))
  }

  function loadCredentialsFromStorage() {
    const stored = localStorage.getItem('metaCredentials')
    if (stored) {
      try {
        credentials.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load credentials from storage', e)
      }
    }
  }

  async function fetchWabaAccounts() {
    isLoading.value = true
    error.value = null
    try {
      wabaAccounts.value = await metaApi.getWabaAccounts(credentials.value.accessToken)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch WABA accounts'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPhoneNumbers(wabaId: string) {
    isLoading.value = true
    error.value = null
    try {
      phoneNumbers.value = await metaApi.getPhoneNumbers(wabaId, credentials.value.accessToken)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch phone numbers'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTemplates(wabaId: string) {
    isLoading.value = true
    error.value = null
    try {
      templates.value = await metaApi.getMessageTemplates(wabaId, credentials.value.accessToken)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch templates'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function createTemplate(wabaId: string, templateData: any) {
    isLoading.value = true
    error.value = null
    try {
      const template = await metaApi.createMessageTemplate(wabaId, credentials.value.accessToken, templateData)
      templates.value.push(template)
      return template
    } catch (e: any) {
      error.value = e.message || 'Failed to create template'
      console.error(e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAnalytics(wabaId: string, startDate: string, endDate: string) {
    isLoading.value = true
    error.value = null
    try {
      analytics.value = await metaApi.getAnalytics(wabaId, credentials.value.accessToken, startDate, endDate)
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch analytics'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function configureWebhook(wabaId: string, webhookUrl: string, verifyToken: string, fields: string[]) {
    isLoading.value = true
    error.value = null
    try {
      await metaApi.configureWebhook(wabaId, credentials.value.accessToken, webhookUrl, verifyToken, fields)
      credentials.value.webhookUrl = webhookUrl
      credentials.value.webhookVerifyToken = verifyToken
      localStorage.setItem('metaCredentials', JSON.stringify(credentials.value))
    } catch (e: any) {
      error.value = e.message || 'Failed to configure webhook'
      console.error(e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function verifyPhoneNumber(phoneNumberId: string, code: string) {
    isLoading.value = true
    error.value = null
    try {
      await metaApi.verifyPhoneNumber(phoneNumberId, credentials.value.accessToken, code)
      await fetchPhoneNumbers(selectedWabaId.value || '')
    } catch (e: any) {
      error.value = e.message || 'Failed to verify phone number'
      console.error(e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  return {
    credentials,
    wabaAccounts,
    phoneNumbers,
    templates,
    analytics,
    isLoading,
    error,
    isConnected,
    selectedWabaId,
    setCredentials,
    loadCredentialsFromStorage,
    fetchWabaAccounts,
    fetchPhoneNumbers,
    fetchTemplates,
    createTemplate,
    fetchAnalytics,
    configureWebhook,
    verifyPhoneNumber
  }
})
