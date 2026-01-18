<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />
    
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Templates de Mensagem</h1>
          <p class="text-gray-600 mt-2">Crie e gerencie templates aprovados pelo WhatsApp</p>
        </div>
        <button
          @click="showCreateModal = true"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
        >
          <span class="mr-2">➕</span>
          Criar Template
        </button>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="templates.length === 0" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Nenhum template criado</h2>
        <p class="text-gray-600 mb-6">
          Crie seu primeiro template de mensagem para enviar mensagens no WhatsApp
        </p>
        <button
          @click="showCreateModal = true"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
        >
          Criar Template →
        </button>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="template in templates"
          :key="template.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ template.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">ID: {{ template.id }}</p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': template.status === 'APPROVED',
                  'bg-yellow-100 text-yellow-800': template.status === 'PENDING',
                  'bg-red-100 text-red-800': template.status === 'REJECTED',
                  'bg-gray-100 text-gray-800': !template.status
                }"
              >
                {{ template.status || 'Unknown' }}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Categoria:</span>
                <span class="font-medium text-gray-900">{{ template.category }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Idioma:</span>
                <span class="font-medium text-gray-900">{{ template.language }}</span>
              </div>
            </div>

            <div v-if="template.components && template.components.length > 0" class="border-t border-gray-200 pt-4">
              <h4 class="text-sm font-semibold text-gray-900 mb-2">Componentes:</h4>
              <div class="space-y-2">
                <div
                  v-for="(component, index) in template.components"
                  :key="index"
                  class="p-3 bg-gray-50 rounded-lg text-sm"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-900">{{ component.type }}</span>
                    <span v-if="component.format" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {{ component.format }}
                    </span>
                  </div>
                  <p v-if="component.text" class="text-gray-600 text-xs mt-1 line-clamp-3">
                    {{ component.text }}
                  </p>
                  <div v-if="component.buttons && component.buttons.length > 0" class="mt-2 space-y-1">
                    <div
                      v-for="(button, btnIndex) in component.buttons"
                      :key="btnIndex"
                      class="text-xs bg-white p-2 rounded border border-gray-200"
                    >
                      <span class="font-medium">{{ button.type }}:</span>
                      <span class="ml-1">{{ button.text }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8"
      @click.self="showCreateModal = false"
    >
      <div class="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 my-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Criar Template</h3>
          <button
            @click="showCreateModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="createTemplate" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Template</label>
              <input
                v-model="newTemplate.name"
                type="text"
                required
                placeholder="ex: boas_vindas_cliente"
                pattern="[a-z_0-9]+"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">Apenas letras minúsculas, números e underscore</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                v-model="newTemplate.category"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                <option value="MARKETING">Marketing</option>
                <option value="UTILITY">Utilidade</option>
                <option value="AUTHENTICATION">Autenticação</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
            <select
              v-model="newTemplate.language"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="pt_BR">Português (Brasil)</option>
              <option value="en_US">Inglês (EUA)</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
              <option value="de">Alemão</option>
            </select>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Corpo da Mensagem</h4>
            <textarea
              v-model="newTemplate.bodyText"
              required
              rows="4"
              placeholder="Digite a mensagem do template. Use {{1}}, {{2}}, etc. para parâmetros dinâmicos."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Use {{1}}, {{2}}, etc. para inserir variáveis dinâmicas
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <input
                v-model="newTemplate.addButton"
                type="checkbox"
                class="mr-2"
              />
              Adicionar Botões
            </label>
            <div v-if="newTemplate.addButton" class="mt-3 space-y-3">
              <div
                v-for="(button, index) in newTemplate.buttons"
                :key="index"
                class="p-3 bg-gray-50 rounded-lg"
              >
                <div class="grid grid-cols-2 gap-2">
                  <select
                    v-model="button.type"
                    class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="QUICK_REPLY">Resposta Rápida</option>
                    <option value="URL">URL</option>
                    <option value="PHONE_NUMBER">Número de Telefone</option>
                  </select>
                  <input
                    v-model="button.text"
                    type="text"
                    placeholder="Texto do botão"
                    class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div v-if="button.type === 'URL'" class="mt-2">
                  <input
                    v-model="button.url"
                    type="url"
                    placeholder="https://exemplo.com/{{1}}"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div v-if="button.type === 'PHONE_NUMBER'" class="mt-2">
                  <input
                    v-model="button.phone_number"
                    type="tel"
                    placeholder="+5511999999999"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  @click="newTemplate.buttons.splice(index, 1)"
                  class="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remover Botão
                </button>
              </div>
              <button
                type="button"
                @click="addButton"
                class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                + Adicionar Outro Botão
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isCreating"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              {{ isCreating ? 'Enviando...' : 'Enviar para Aprovação' }}
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
    alert('Template enviado para aprovação!')
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
