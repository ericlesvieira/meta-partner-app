<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <Navigation />

    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="bg-white shadow-xl rounded-2xl border border-slate-100 p-8 md:p-12">
        <div class="border-b border-slate-200 pb-6 mb-8">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Terms of Service</p>
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Meta Solution Provider Manager Terms of Service
          </h1>
          <p class="text-sm text-slate-500 mt-2">Effective date: 2026-01-18</p>
        </div>

        <div class="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 class="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
            <p class="mt-3">
              By accessing or using Meta Solution Provider Manager, you agree to these Terms of
              Service. If you do not agree, you must not use the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">2. Service Description</h2>
            <p class="mt-3">
              The service provides tools to configure and manage WhatsApp Business API integrations
              with Chatwoot, including dashboards, workflow configuration, and message delivery
              monitoring.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">3. User Responsibilities</h2>
            <ul class="mt-3 space-y-3">
              <li>Maintain accurate account and integration information.</li>
              <li>Protect access tokens and credentials from unauthorized use.</li>
              <li>Use the service in compliance with Meta and WhatsApp policies.</li>
              <li>Ensure end-user consent for any messages sent.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">4. Prohibited Activities</h2>
            <ul class="mt-3 space-y-3">
              <li>Unauthorized access, tampering, or security testing.</li>
              <li>Sending spam, phishing, or unlawful content.</li>
              <li>Using the service to violate privacy or data protection laws.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">5. Data Handling</h2>
            <p class="mt-3">
              Data is handled in accordance with the Privacy Policy. You remain responsible for the
              data you process through the integration.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">6. Availability</h2>
            <p class="mt-3">
              We strive to keep the service available, but do not guarantee uninterrupted access.
              Maintenance or updates may result in temporary downtime.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">7. Termination</h2>
            <p class="mt-3">
              We may suspend or terminate access to the service if these terms are violated or to
              protect the platform and its users.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">8. Limitation of Liability</h2>
            <p class="mt-3">
              The service is provided "as is". We are not liable for indirect, incidental, or
              consequential damages arising from use of the service.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">9. Changes to Terms</h2>
            <p class="mt-3">
              We may update these terms from time to time. Continued use of the service indicates
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-slate-900">10. Contact</h2>
            <p class="mt-3">
              For questions about these terms, contact us at
              <span class="font-semibold">contato@ericlestatistica.com.br</span>.
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
