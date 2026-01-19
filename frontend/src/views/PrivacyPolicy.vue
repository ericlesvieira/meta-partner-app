<template>
  <AppLayout>
    <div class="animate-fade-in max-w-4xl mx-auto">
      <BaseCard variant="elevated" class="py-4">
        <!-- Header -->
        <div class="border-b border-border pb-6 mb-8">
          <p class="text-xs uppercase tracking-[0.2em] text-text-muted">Privacy Policy</p>
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary mt-3">
            Meta Solution Provider Manager Privacy Policy
          </h1>
          <p class="text-sm text-text-muted mt-2">Effective date: 2026-01-18</p>
          <p class="text-sm text-text-secondary mt-4">
            This policy is provided to support Meta Business verification requirements.
          </p>
        </div>

        <!-- Content -->
        <div class="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 class="text-xl font-semibold text-text-primary">1. Overview</h2>
            <p class="mt-3">
              This Privacy Policy explains how Meta Solution Provider Manager collects, uses, and
              protects information when you use our web application to manage WhatsApp Business API
              integrations with Chatwoot.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">2. Information We Collect</h2>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>
                Account and integration details such as WhatsApp Business IDs, phone number IDs,
                webhook URLs, and access tokens provided by you.
              </li>
              <li>
                Message content and metadata routed through the integration, including sender and
                recipient identifiers, timestamps, and delivery status.
              </li>
              <li>
                Usage data such as API requests, logs, and configuration changes to keep the
                integration reliable and secure.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">3. How We Use Information</h2>
            <ul class="mt-3 space-y-3 list-disc list-inside">
              <li>Enable the WhatsApp Business API and Chatwoot integration you configure.</li>
              <li>Deliver, sync, and monitor messages and status updates.</li>
              <li>Provide dashboards, analytics, and troubleshooting support.</li>
              <li>Protect the platform, prevent abuse, and meet legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">4. Sharing and Disclosure</h2>
            <p class="mt-3">
              We share information only as needed to operate the integration. This includes
              transferring data to Meta (WhatsApp Business API) and Chatwoot based on your
              configuration, or to service providers that help us run the platform.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">5. Data Storage and Security</h2>
            <p class="mt-3">
              We apply technical and organizational safeguards to protect information from loss,
              misuse, and unauthorized access. Access tokens and credentials should be managed
              securely and rotated regularly.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">6. Retention</h2>
            <p class="mt-3">
              We retain information only for as long as necessary to provide the service, resolve
              disputes, and comply with legal requirements. You may remove stored configuration data
              at any time.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">7. Your Rights</h2>
            <p class="mt-3">
              You can request access, correction, or deletion of your information. To submit a
              request, contact us using the details below.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">8. International Transfers</h2>
            <p class="mt-3">
              Your information may be processed in countries other than your own. We take steps to
              ensure appropriate safeguards are in place for cross-border transfers.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">9. Changes to This Policy</h2>
            <p class="mt-3">
              We may update this policy from time to time. The effective date at the top of this
              page indicates when the latest version was published.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-text-primary">10. Contact</h2>
            <p class="mt-3">
              For questions about this policy or privacy practices, contact us at
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
