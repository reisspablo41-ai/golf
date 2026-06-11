export default function RefundPolicyPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Refund & Return Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Vehicles vs. Parts</h2>
        <p>Fully custom-built golf carts are non-refundable once assembly commences. We require a non-refundable deposit for parts procurement prior to building your custom cart. Standard parts and accessories carry a distinct 30-day trial window.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Return Window</h2>
        <p>You may return uninstalled parts and accessories in their original packaging within 30 days from the date of delivery.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Restocking Fee</h2>
        <p>A 15% restocking fee applies to all standard vehicle freight returns to offset return transit and logistics costs. This applies to pre-built, non-custom inventory only.</p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>Inspection Protocol</h2>
        <p>Refunds are disbursed within 5–7 business days following structural and electrical verification at our main fulfillment center. Items returned damaged or showing signs of installation/wear may be rejected or subject to a higher fee.</p>
      </div>
    </div>
  );
}
