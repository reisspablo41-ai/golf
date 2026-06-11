export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>2. Use of Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, such as to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users, and send product updates and administrative messages.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>3. Sharing of Information</h2>
        <p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including: with third party service providers who perform services on our behalf; in response to a request for information by a competent authority if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process.</p>
      </div>
    </div>
  );
}
