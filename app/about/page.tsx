import { Trophy, Wrench, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About Premier Carts</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
          Forged from a passion for performance and an eye for uncompromising style, 
          we are the leading builders of premium custom and street-legal golf carts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
        <div style={{ backgroundColor: 'var(--background-alt)', padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Our Story</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
            What started as a small garage project has evolved into a premier nationwide supplier of high-performance vehicles. 
            We recognized that golf carts were no longer just for the fairway—they've become a primary mode of transportation 
            for master-planned communities, ranches, and city streets.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            By combining automotive-grade engineering with bespoke design, we have revolutionized what a golf cart can be. 
            Today, Premier Carts operates out of a state-of-the-art facility in Florida, delivering custom-built masterpieces to clients across the country.
          </p>
        </div>
        <div style={{ backgroundColor: 'var(--background-alt)', padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>The Build Process</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
            Every custom cart undergoes an exhaustive 32-point inspection spanning electrical diagnostics, torque validation, 
            and alignment mapping. Whether installing a 48V Lithium-Ion power plant or stitching marine-grade upholstery, 
            our technicians refuse to cut corners.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            From the initial chassis prep to the final clear coat, our process takes an average of 14 days. This meticulous attention to detail ensures that every cart leaving our depot exceeds both aesthetic expectations and DOT safety standards.
          </p>
        </div>
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Core Pillars</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center', marginBottom: '5rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-color)' }}><Trophy size={40} /></div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Quality Craftsmanship</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Built to outlast and outperform the competition with premium sourced materials.</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-color)' }}><Wrench size={40} /></div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Precision Engineering</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Advanced suspension systems, reliable powertrains, and cutting-edge lithium technology.</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-color)' }}><ShieldCheck size={40} /></div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Safety First</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Street-legal configurations exceeding local DOT requirements with full light kits and seatbelts.</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-color)' }}><Users size={40} /></div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Customer Dedication</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Unwavering support long after your cart is delivered, backed by our leading warranty.</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-light)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-light)' }}>Meet the Team</h2>
        <p style={{ fontSize: '1.125rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
          Our crew consists of master mechanics, specialized electricians, and dedicated customer success reps. We are all united by a single goal: building the best carts on the market.
        </p>
      </div>
    </div>
  );
}
