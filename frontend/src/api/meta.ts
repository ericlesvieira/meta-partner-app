import axios, { type AxiosInstance } from 'axios'
import type {
  WhatsAppBusinessAccount,
  PhoneNumber,
  MessageTemplate,
  TemplateCreateRequest,
  AnalyticsData
} from '../types'

function createMetaApiInstance(accessToken: string): AxiosInstance {
  return axios.create({
    baseURL: 'https://graph.facebook.com/v20.0',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

export async function getWabaAccounts(accessToken: string): Promise<WhatsAppBusinessAccount[]> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.get<{ data: WhatsAppBusinessAccount[] }>('/me/owned_whatsapp_business_accounts')
  return response.data.data
}

export async function getPhoneNumbers(wabaId: string, accessToken: string): Promise<PhoneNumber[]> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.get<{ data: PhoneNumber[] }>(`/${wabaId}/phone_numbers`)
  return response.data.data
}

export async function getMessageTemplates(wabaId: string, accessToken: string): Promise<MessageTemplate[]> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.get<{ data: MessageTemplate[] }>(`/${wabaId}/message_templates`)
  return response.data.data
}

export async function createMessageTemplate(
  wabaId: string,
  accessToken: string,
  templateData: TemplateCreateRequest
): Promise<MessageTemplate> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.post<{ id: string }>(`/${wabaId}/message_templates`, templateData)
  return {
    id: response.data.id,
    name: templateData.name,
    category: templateData.category,
    status: 'PENDING',
    language: templateData.language,
    components: templateData.components
  }
}

export async function getAnalytics(
  wabaId: string,
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<AnalyticsData[]> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.get<{
    data: Array<{
      metric_values: AnalyticsData[]
    }>
  }>(`/${wabaId}/insights`, {
    params: {
      metric: ['sent', 'delivered', 'read', 'failed'],
      breakdowns: ['date'],
      start: startDate,
      end: endDate,
      granularity: 'daily'
    }
  })
  return response.data.data[0]?.metric_values || []
}

export async function configureWebhook(
  wabaId: string,
  accessToken: string,
  webhookUrl: string,
  verifyToken: string,
  fields: string[]
): Promise<void> {
  const api = createMetaApiInstance(accessToken)
  await api.post(`/${wabaId}/subscribed_apps`, {
    object: 'whatsapp_business_account',
    callback_url: webhookUrl,
    verify_token: verifyToken,
    fields: fields
  })
}

export async function verifyPhoneNumber(
  phoneNumberId: string,
  accessToken: string,
  code: string
): Promise<void> {
  const api = createMetaApiInstance(accessToken)
  await api.post(`/${phoneNumberId}/verify_code`, { code })
}

export async function sendMessage(
  phoneNumberId: string,
  accessToken: string,
  messageData: any
): Promise<any> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.post(`/${phoneNumberId}/messages`, messageData)
  return response.data
}

export async function subscribeToWebhooks(
  wabaId: string,
  accessToken: string,
  webhookUrl: string,
  verifyToken: string
): Promise<void> {
  const api = createMetaApiInstance(accessToken)
  await api.post(`/${wabaId}/subscribed_apps`, {
    object: 'whatsapp_business_account',
    callback_url: webhookUrl,
    verify_token: verifyToken,
    fields: ['messages', 'message_template_status_update', 'phone_number_quality_update']
  })
}

export async function getWabaDetails(
  wabaId: string,
  accessToken: string
): Promise<WhatsAppBusinessAccount> {
  const api = createMetaApiInstance(accessToken)
  const response = await api.get<WhatsAppBusinessAccount>(`/${wabaId}`, {
    params: {
      fields: 'id,name,message_template_namespace,verification_status,timezone'
    }
  })
  return response.data
}
