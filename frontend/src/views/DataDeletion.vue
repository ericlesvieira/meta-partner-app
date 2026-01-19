<template>
  <AppLayout>
    <div class="animate-fade-in max-w-4xl mx-auto">
      <BaseCard variant="elevated" class="py-4">
        <!-- Header -->
        <div class="border-b border-border pb-6 mb-8">
          <p class="text-xs uppercase tracking-[0.2em] text-text-muted">Data Deletion</p>
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary mt-3">
            Request Deletion of Your Data
          </h1>
          <p class="text-sm text-text-muted mt-2">Effective date: 2026-01-18</p>
        </div>

        <!-- Content -->
        <div class="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 class="text-xl font-semibold text-text-primary">1. How to Request Deletion</h2>
            <p class="mt-3">
              To request deletion of data processed by Meta Solution Provider Manager, email
              <span class="font-semibold text-primary-600 dark:text-primary-400">contato@ericlestatistica.com.br</span> with the subject
              line "Data Deletion Request" and include:
            </p>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>Your business name and Meta Business account ID.</li>
              <li>The WhatsApp Business phone number ID associated with the integration.</li>
              <li>The contact email used for the integration.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">2. What We Delete</h2>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>Stored integration configuration and credentials.</li>
              <li>Logs containing personal identifiers where applicable.</li>
              <li>Any cached or archived message metadata we control.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">3. Processing Time</h2>
            <p class="mt-3">
              We will confirm receipt of your request within 7 days and complete deletion within
              30 days unless legal obligations require longer retention.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">4. Confirmation</h2>
            <p class="mt-3">
              Once deletion is completed, we will send a confirmation to the email address used in
              your request.
            </p>
          </section>
        </div>
      </BaseCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../components/layout/AppLayout.vue'
import { BaseCard } from '../components/ui'
</script>
