export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Terms & Conditions</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>2. Custom Builds</h2>
        <p>Order submissions for custom golf carts require a non-refundable deposit for parts procurement. Once assembly has begun, the order cannot be canceled or modified without incurring additional fees.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>3. Pricing Accuracy</h2>
        <p>Premier Carts reserves the right to cancel orders arising from clear typographic, inventory systems, or mispricing errors. In the event of an error, we will contact you with the corrected pricing before proceeding with your order.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>4. Vehicle Operation</h2>
        <p>It is the sole responsibility of the purchaser to ensure adherence to local, state, or municipal regulations governing Neighborhood Electric Vehicles (NEVs) or Street-Legal golf cart operations. Premier Carts is not liable for citations, impounds, or accidents resulting from improper or illegal use of our vehicles.</p>
      </div>
    </div>
  );
}
