<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <Navigation />

    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="bg-white shadow-xl rounded-2xl border border-slate-100 p-8 md:p-12">
        <div class="border-b border-slate-200 pb-6 mb-8">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Data Deletion</p>
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Request Deletion of Your Data
          </h1>
          <p class="text-sm text-slate-500 mt-2">Effective date: 2026-01-18</p>
        </div>

        <div class="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 class="text-xl font-semibold text-slate-900">1. How to Request Deletion</h2>
            <p class="mt-3">
              To request deletion of data processed by Meta Solution Provider Manager, email
              <span class="font-semibold">contato@ericlestatistica.com.br</span> with the subject
              line "Data Deletion Request" and include:
            </p>
            <ul class="mt-3 space-y-3">
              <li>Your business name and Meta Business account ID.</li>
              <li>The WhatsApp Business phone number ID associated with the integration.</li>
              <li>The contact email used for the integration.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">2. What We Delete</h2>
            <ul class="mt-3 space-y-3">
              <li>Stored integration configuration and credentials.</li>
              <li>Logs containing personal identifiers where applicable.</li>
              <li>Any cached or archived message metadata we control.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">3. Processing Time</h2>
            <p class="mt-3">
              We will confirm receipt of your request within 7 days and complete deletion within
              30 days unless legal obligations require longer retention.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">4. Confirmation</h2>
            <p class="mt-3">
              Once deletion is completed, we will send a confirmation to the email address used in
              your request.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>
