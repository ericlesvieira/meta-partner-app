<template>
  <AppLayout>
    <div class="animate-fade-in space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold text-text-primary">Templates de Mensagem</h1>
          <p class="text-text-secondary mt-1">Crie e gerencie templates aprovados pelo WhatsApp</p>
        </div>
        <BaseButton @click="showCreateModal = true">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Criar Template
        </BaseButton>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>

      <!-- Empty State -->
      <BaseCard v-else-if="templates.length === 0" variant="elevated" class="text-center py-12">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary mb-2">Nenhum template criado</h2>
        <p class="text-text-secondary mb-6 max-w-md mx-auto">
          Crie seu primeiro template de mensagem para enviar mensagens no WhatsApp
        </p>
        <BaseButton @click="showCreateModal = true">
          Criar Template
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </BaseButton>
      </BaseCard>

      <!-- Templates Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard
          v-for="template in templates"
          :key="template.id"
          variant="elevated"
          hoverable
          class="flex flex-col"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-text-primary truncate">{{ template.name }}</h3>
              <p class="text-sm text-text-muted mt-1 font-mono">ID: {{ template.id }}</p>
            </div>
            <BaseBadge :variant="getStatusVariant(template.status)" size="sm" class="ml-3 flex-shrink-0">
              {{ template.status || 'Unknown' }}
            </BaseBadge>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-text-secondary">Categoria:</span>
              <span class="font-medium text-text-primary">{{ template.category }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-text-secondary">Idioma:</span>
              <span class="font-medium text-text-primary">{{ template.language }}</span>
            </div>
          </div>

          <!-- Template Components Preview -->
          <div v-if="template.components && template.components.length > 0" class="border-t border-border pt-4 mt-auto">
            <h4 class="text-sm font-semibold text-text-primary mb-2">Componentes:</h4>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <div
                v-for="(component, index) in template.components"
                :key="index"
                class="p-3 bg-surface-elevated rounded-lg text-sm"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-text-primary">{{ component.type }}</span>
                  <BaseBadge v-if="component.format" variant="info" size="sm">
                    {{ component.format }}
                  </BaseBadge>
                </div>
                <p v-if="component.text" class="text-text-secondary text-xs mt-1 line-clamp-3">
                  {{ component.text }}
                </p>
                <div v-if="component.buttons && component.buttons.length > 0" class="mt-2 space-y-1">
                  <div
                    v-for="(button, btnIndex) in component.buttons"
                    :key="btnIndex"
                    class="text-xs bg-surface p-2 rounded border border-border"
                  >
                    <span class="font-medium text-text-primary">{{ button.type }}:</span>
                    <span class="ml-1 text-text-secondary">{{ button.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Create Template Modal -->
      <BaseModal v-model="showCreateModal" title="Criar Template" size="xl">
        <form @submit.prevent="createTemplate" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput
              v-model="newTemplate.name"
              label="Nome do Template"
              placeholder="ex: boas_vindas_cliente"
              pattern="[a-z_0-9]+"
              hint="Apenas letras minusculas, numeros e underscore"
              required
            />

            <div>
              <label class="block text-sm font-medium text-text-primary mb-2">Categoria</label>
              <select
                v-model="newTemplate.category"
                required
                class="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-text-primary transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="MARKETING">Marketing</option>
                <option value="UTILITY">Utilidade</option>
                <option value="AUTHENTICATION">Autenticacao</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">Idioma</label>
            <select
              v-model="newTemplate.language"
              required
              class="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-text-primary transition-colors"
            >
              <option value="pt_BR">Portugues (Brasil)</option>
              <option value="en_US">Ingles (EUA)</option>
              <option value="es">Espanhol</option>
              <option value="fr">Frances</option>
              <option value="de">Alemao</option>
            </select>
          </div>

          <div class="border-t border-border pt-6">
            <h4 class="text-sm font-semibold text-text-primary mb-3">Corpo da Mensagem</h4>
            <textarea
              v-model="newTemplate.bodyText"
              required
              rows="4"
              placeholder="Digite a mensagem do template. Use {{1}}, {{2}}, etc. para parametros dinamicos."
              class="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-text-primary transition-colors resize-none"
            ></textarea>
            <p class="text-xs text-text-muted mt-2">
              Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. para inserir variaveis dinamicas
            </p>
          </div>

          <div class="border-t border-border pt-6">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="newTemplate.addButton"
                type="checkbox"
                class="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-3 text-sm font-medium text-text-primary">Adicionar Botoes</span>
            </label>

            <div v-if="newTemplate.addButton" class="mt-4 space-y-3">
              <div
                v-for="(button, index) in newTemplate.buttons"
                :key="index"
                class="p-4 bg-surface-elevated rounded-lg border border-border"
              >
                <div class="grid grid-cols-2 gap-3">
                  <select
                    v-model="button.type"
                    class="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-text-primary"
                  >
                    <option value="QUICK_REPLY">Resposta Rapida</option>
                    <option value="URL">URL</option>
                    <option value="PHONE_NUMBER">Numero de Telefone</option>
                  </select>
                  <input
                    v-model="button.text"
                    type="text"
                    placeholder="Texto do botao"
                    class="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-text-primary"
                  />
                </div>
                <div v-if="button.type === 'URL'" class="mt-3">
                  <input
                    v-model="button.url"
                    type="url"
                    placeholder="https://exemplo.com/{{1}}"
                    class="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-text-primary"
                  />
                </div>
                <div v-if="button.type === 'PHONE_NUMBER'" class="mt-3">
                  <input
                    v-model="button.phone_number"
                    type="tel"
                    placeholder="+5511999999999"
                    class="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-text-primary"
                  />
                </div>
                <button
                  type="button"
                  @click="newTemplate.buttons.splice(index, 1)"
                  class="mt-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                >
                  Remover Botao
                </button>
              </div>
              <BaseButton type="button" variant="ghost" size="sm" @click="addButton">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Outro Botao
              </BaseButton>
            </div>
          </div>
        </form>

        <template #footer>
          <BaseButton variant="secondary" @click="showCreateModal = false">
            Cancelar
          </BaseButton>
          <BaseButton @click="createTemplate" :loading="isCreating">
            Enviar para Aprovacao
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
import type { TemplateButton } from '../types'

const metaStore = useMetaStore()

const isLoading = ref(false)
const isCreating = ref(false)
const showCreateModal = ref(false)

const templates = computed(() => metaStore.templates)

const newTemplate = ref({
  name: '',
  category: '',
  language: 'pt_BR',
  bodyText: '',
  addButton: false,
  buttons: [] as TemplateButton[]
})

function getStatusVariant(status: string | undefined): 'success' | 'warning' | 'danger' | 'default' {
  switch (status) {
    case 'APPROVED': return 'success'
    case 'PENDING': return 'warning'
    case 'REJECTED': return 'danger'
    default: return 'default'
  }
}

function addButton() {
  newTemplate.value.buttons.push({
    type: 'QUICK_REPLY',
    text: ''
  })
}

async function createTemplate() {
  if (!metaStore.selectedWabaId) {
    alert('Selecione uma conta WABA primeiro')
    return
  }

  const components: any[] = [
    {
      type: 'BODY',
      text: newTemplate.value.bodyText
    }
  ]

  if (newTemplate.value.addButton && newTemplate.value.buttons.length > 0) {
    components.push({
      type: 'BUTTONS',
      buttons: newTemplate.value.buttons
    })
  }

  const templateData = {
    name: newTemplate.value.name,
    category: newTemplate.value.category,
    language: newTemplate.value.language,
    components
  }

  isCreating.value = true
  try {
    await metaStore.createTemplate(metaStore.selectedWabaId, templateData)
    alert('Template enviado para aprovacao!')
    showCreateModal.value = false
    newTemplate.value = {
      name: '',
      category: '',
      language: 'pt_BR',
      bodyText: '',
      addButton: false,
      buttons: []
    }
  } catch (e: any) {
    alert('Erro ao criar template: ' + (e.message || 'Erro desconhecido'))
  } finally {
    isCreating.value = false
  }
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const wabaId = urlParams.get('id')
  if (wabaId) {
    metaStore.selectedWabaId = wabaId
    isLoading.value = true
    try {
      await metaStore.fetchTemplates(wabaId)
    } finally {
      isLoading.value = false
    }
  }
})
</script>
