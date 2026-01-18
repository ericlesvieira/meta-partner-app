export interface WhatsAppBusinessAccount {
  id: string
  name: string
  message_template_namespace?: string
  verification_status?: string
  webhook_config?: WebhookConfig
  created_time: string
  timezone: string
}

export interface WebhookConfig {
  url: string
  fields: string[]
  verify_token: string
}

export interface PhoneNumber {
  id: string
  display_phone_number: string
  phone_number: string
  verified_name: string
  quality_rating: string
  platform_type: string
  webhook_status: string
  code_verification_status: string
  name_status: string
  new_name_status: string
  status: string
}

export interface MessageTemplate {
  id: string
  name: string
  category: string
  status: string
  language: string
  components: TemplateComponent[]
}

export interface TemplateComponent {
  type: string
  format?: string
  text?: string
  example?: string[]
  buttons?: TemplateButton[]
}

export interface TemplateButton {
  type: string
  text: string
  url?: string
  phone_number?: string
}

export interface Message {
  id: string
  from: string
  to: string
  type: string
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read' | 'failed'
}

export interface TemplateCreateRequest {
  name: string
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
  language: string
  components: TemplateComponent[]
}

export interface MessageSendRequest {
  to: string
  type: string
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: string
    }
  }
}

export interface WebhookEvent {
  object: string
  entry: WebhookEntry[]
}

export interface WebhookEntry {
  id: string
  changes: WebhookChange[]
}

export interface WebhookChange {
  field: string
  value: any
}

export interface MetaCredentials {
  appId: string
  appSecret: string
  accessToken: string
  whatsappBusinessAccountId?: string
  phoneNumberId?: string
  webhookUrl: string
  webhookVerifyToken: string
}

export interface AnalyticsData {
  sent: number
  delivered: number
  read: number
  failed: number
  date: string
}
