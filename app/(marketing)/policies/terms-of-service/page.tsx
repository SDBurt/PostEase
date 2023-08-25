function PrivacySection(title, content) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{content}</p>
    </section>
  )
}

export default async function PrivacyPage() {
  return (
    <div>
      <p>Last Updated: [Date]</p>

      <section>
        <p>
          {`These Terms of Use ("Terms") govern your use of the SaaS application,
          "http://localhost:3000" (the "App"), provided by [Your Company Name]
          ("we," "us," or "our"). By accessing or using the App, you agree to
          these Terms. Please read them carefully before using the App.`}
        </p>
      </section>

      <PrivacySection title="1. Acceptance of Terms">
        {`By accessing or using the App, you acknowledge that you have read,
        understood, and agree to be bound by these Terms, as well as our Privacy
        Policy. If you do not agree to these Terms, please do not use the App.`}
      </PrivacySection>
      <PrivacySection title="2. Use of the App">
        {`The App is designed to provide post scheduling services for social media
        platforms, including Twitter and LinkedIn. You must have an active
        Twitter and/or LinkedIn account to use these features.`}
      </PrivacySection>
      <PrivacySection title="3. User Accounts">
        {`You are responsible for maintaining the confidentiality of your account
        credentials and for any activities that occur under your account. You
        agree to provide accurate and up-to-date information during the
        registration process and to keep your account information current.`}
      </PrivacySection>
      <PrivacySection title="4. Content Posting">
        {`When using the App to schedule posts for Twitter and LinkedIn, you are
        solely responsible for the content you publish. You agree not to post
        any content that is illegal, defamatory, obscene, or violates the
        intellectual property rights of any third party.`}
      </PrivacySection>

      <PrivacySection title="5. Authentication">
        {`The App offers authentication through Twitter and LinkedIn. By using
        these authentication methods, you grant the App permission to access
        your social media accounts for the purpose of scheduling and posting
        content on your behalf.`}
      </PrivacySection>

      <PrivacySection title="6. Privacy">
        {`Your privacy is important to us. Our Privacy Policy outlines how we
        collect, use, and disclose your information. By using the App, you
        consent to the practices described in our Privacy Policy.`}
      </PrivacySection>

      <PrivacySection title="7. Intellectual Property">
        {`The App and its content, including but not limited to text, graphics,
        logos, and software, are the property of [Your Company Name] and are
        protected by copyright and other intellectual property laws.`}
      </PrivacySection>

      <PrivacySection title="8. Termination">
        {`We reserve the right to terminate or suspend your access to the App at
        any time, with or without cause and without prior notice.`}
      </PrivacySection>

      <PrivacySection title="9. Disclaimer of Warranties">
        {`The App is provided "as is" and without any warranties, express or
        implied. We do not warrant that the App will be error-free, secure, or
        uninterrupted.`}
      </PrivacySection>

      <PrivacySection title="10. Limitation of Liability">
        {`We shall not be liable for any direct, indirect, incidental,
        consequential, or special damages arising out of or in connection with
        your use of the App.`}
      </PrivacySection>

      <PrivacySection title="11. Governing Law">
        {`These Terms are governed by the laws of [Province/Territory], Canada,
        without regard to its conflict of law principles.`}
      </PrivacySection>

      <PrivacySection title="12. Changes to Terms">
        {`We reserve the right to modify or update these Terms at any time.
        Changes will be effective upon posting to the App. Your continued use of
        the App after any changes indicates your acceptance of the modified
        Terms.`}
      </PrivacySection>

      <PrivacySection title="13. Contact Us">
        {`If you have any questions or concerns about these Terms, please contact
        us at [contact email address].`}
      </PrivacySection>

      <section>
        <p>
          {`By using the App, you agree to abide by these Terms. Thank you for
          choosing [Your Company Name]'s "http://localhost:3000" SaaS
          application.`}
        </p>
      </section>

      <section>
        <ul>
          <li>Sean D. Burt</li>
          <li>1-250-667-2678</li>
        </ul>
      </section>
    </div>
  )
}
