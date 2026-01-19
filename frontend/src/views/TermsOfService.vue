<template>
  <AppLayout>
    <div class="animate-fade-in max-w-4xl mx-auto">
      <BaseCard variant="elevated" class="py-4">
        <!-- Header -->
        <div class="border-b border-border pb-6 mb-8">
          <p class="text-xs uppercase tracking-[0.2em] text-text-muted">Terms of Service</p>
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary mt-3">
            Meta Solution Provider Manager Terms of Service
          </h1>
          <p class="text-sm text-text-muted mt-2">Effective date: 2026-01-18</p>
        </div>

        <!-- Content -->
        <div class="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 class="text-xl font-semibold text-text-primary">1. Acceptance of Terms</h2>
            <p class="mt-3">
              By accessing or using Meta Solution Provider Manager, you agree to these Terms of
              Service. If you do not agree, you must not use the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">2. Service Description</h2>
            <p class="mt-3">
              The service provides tools to configure and manage WhatsApp Business API integrations
              with Chatwoot, including dashboards, workflow configuration, and message delivery
              monitoring.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">3. User Responsibilities</h2>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>Maintain accurate account and integration information.</li>
              <li>Protect access tokens and credentials from unauthorized use.</li>
              <li>Use the service in compliance with Meta and WhatsApp policies.</li>
              <li>Ensure end-user consent for any messages sent.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">4. Prohibited Activities</h2>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>Unauthorized access, tampering, or security testing.</li>
              <li>Sending spam, phishing, or unlawful content.</li>
              <li>Using the service to violate privacy or data protection laws.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">5. Data Handling</h2>
            <p class="mt-3">
              Data is handled in accordance with the Privacy Policy. You remain responsible for the
              data you process through the integration.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">6. Availability</h2>
            <p class="mt-3">
              We strive to keep the service available, but do not guarantee uninterrupted access.
              Maintenance or updates may result in temporary downtime.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">7. Termination</h2>
            <p class="mt-3">
              We may suspend or terminate access to the service if these terms are violated or to
              protect the platform and its users.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">8. Limitation of Liability</h2>
            <p class="mt-3">
              The service is provided "as is". We are not liable for indirect, incidental, or
              consequential damages arising from use of the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">9. Changes to Terms</h2>
            <p class="mt-3">
              We may update these terms from time to time. Continued use of the service indicates
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">10. Contact</h2>
            <p class="mt-3">
              For questions about these terms, contact us at
              <span class="font-semibold text-primary-600 dark:text-primary-400">contato@ericlestatistica.com.br</span>.
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
