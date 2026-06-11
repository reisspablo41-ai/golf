'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

const STEPS = ['Base Cart', 'Seating', 'Motor', 'Color', 'Accessories', 'Contact'];

const BASE_CARTS = [
  { id: 'electric', label: 'Electric LSV', desc: 'Street-legal, eco-friendly, silent power delivery.', price: 8500 },
  { id: 'gas', label: 'Gas Powered', desc: 'Reliable V-twin engine, proven performance on any terrain.', price: 7200 },
  { id: 'offroad', label: 'Off-Road / Lifted', desc: 'Aggressive stance, heavy-duty suspension, all-terrain domination.', price: 9800 },
];

const SEATING = [
  { id: '2', label: '2-Seater', desc: 'Classic, agile, perfect for solo or paired riders.', price: 0 },
  { id: '4', label: '4-Seater', desc: 'Ideal for families or small groups.', price: 800 },
  { id: '6', label: '6-Seater', desc: 'Maximum capacity for large groups.', price: 1500 },
];

const MOTORS = [
  { id: 'standard', label: 'Standard Package', desc: 'Factory-spec motor — solid everyday performance.', price: 0 },
  { id: 'lithium', label: 'Upgraded 48V Lithium', desc: 'Longer range, faster charge, lighter weight.', price: 1500 },
  { id: 'dual', label: 'Premium Dual Motor', desc: 'Max torque, hill-climbing power, track-ready acceleration.', price: 3200 },
];

const COLORS = [
  { id: 'matte-black', label: 'Matte Black', hex: '#1a1a1a', price: 0 },
  { id: 'pearl-white', label: 'Pearl White', hex: '#f0f0ea', price: 0 },
  { id: 'midnight-blue', label: 'Midnight Blue', hex: '#1e3a5f', price: 0 },
  { id: 'racing-red', label: 'Racing Red', hex: '#b91c1c', price: 0 },
  { id: 'forest-green', label: 'Forest Green', hex: '#14532d', price: 0 },
  { id: 'custom', label: 'Custom Color', hex: 'conic-gradient(#eab308, #a855f7, #06b6d4, #eab308)', price: 500 },
];

const ACCESSORIES = [
  { id: 'lift-kit', label: 'Lift Kit (4")', desc: 'Raises clearance for serious off-road capability.', price: 800 },
  { id: 'custom-wheels', label: 'Custom Alloy Wheels', desc: '12" chrome or blacked-out alloy rims.', price: 600 },
  { id: 'sound', label: 'Premium Sound System', desc: 'Bluetooth speakers with weather-proof enclosure.', price: 400 },
  { id: 'led', label: 'LED Lighting Package', desc: 'Underbody glow + LED light bar.', price: 350 },
  { id: 'rear-seat', label: 'Rear Flip Seat Kit', desc: 'Adds 2 rear-facing seats with cargo conversion.', price: 500 },
  { id: 'windshield', label: 'Fold-Down Windshield', desc: 'Clear acrylic for all-weather protection.', price: 250 },
];

export default function CustomBuildPage() {
  const [step, setStep] = useState(0);
  const [baseCart, setBaseCart] = useState<string | null>(null);
  const [seating, setSeating] = useState<string | null>(null);
  const [motor, setMotor] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const basePrice = BASE_CARTS.find(c => c.id === baseCart)?.price ?? 0;
  const seatingPrice = SEATING.find(s => s.id === seating)?.price ?? 0;
  const motorPrice = MOTORS.find(m => m.id === motor)?.price ?? 0;
  const colorPrice = COLORS.find(c => c.id === color)?.price ?? 0;
  const accessoriesPrice = accessories.reduce((sum, id) => sum + (ACCESSORIES.find(a => a.id === id)?.price ?? 0), 0);
  const totalPrice = basePrice + seatingPrice + motorPrice + colorPrice + accessoriesPrice;

  const canNext = () => {
    if (step === 0) return baseCart !== null;
    if (step === 1) return seating !== null;
    if (step === 2) return motor !== null;
    if (step === 3) return color !== null;
    if (step === 4) return true;
    if (step === 5) return form.name.trim() !== '' && form.email.trim() !== '';
    return false;
  };

  const toggleAccessory = (id: string) => {
    setAccessories(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const lines = [
      `Base Cart: ${BASE_CARTS.find(c => c.id === baseCart)?.label}`,
      `Seating: ${SEATING.find(s => s.id === seating)?.label}`,
      `Motor/Battery: ${MOTORS.find(m => m.id === motor)?.label}`,
      `Color: ${COLORS.find(c => c.id === color)?.label}`,
      `Accessories: ${accessories.length ? accessories.map(id => ACCESSORIES.find(a => a.id === id)?.label).join(', ') : 'None'}`,
      `Estimated Total: $${totalPrice.toLocaleString('en-US')}`,
    ];
    await fetch('/api/custom-build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, message: lines.join('\n') }),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h2>Build Submitted!</h2>
          <p>Thanks, <strong>{form.name}</strong>! Our team will contact you at <strong>{form.email}</strong> within 24 hours to finalize your custom build.</p>
          <a href="/shop" className="btn btn-primary">Browse Ready-to-Ship Inventory</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Design Your Custom Cart</h1>
        <p>Configure your dream build in minutes. Our team brings it to life.</p>
      </div>

      <div className={styles.builderLayout}>
        <div className={styles.wizard}>
          {/* Progress bar */}
          <div className={styles.progress}>
            {STEPS.map((s, i) => (
              <div key={s} className={`${styles.progressStep} ${i === step ? styles.active : ''} ${i < step ? styles.done : ''}`}>
                <div className={styles.progressDot}>{i < step ? '✓' : i + 1}</div>
                <span className={styles.progressLabel}>{s}</span>
              </div>
            ))}
          </div>

          <div className={styles.stepContent}>
            {step === 0 && (
              <>
                <h2 className={styles.stepTitle}>Choose Your Base Cart</h2>
                <div className={styles.optionGrid}>
                  {BASE_CARTS.map(cart => (
                    <button key={cart.id} onClick={() => setBaseCart(cart.id)} className={`${styles.optionCard} ${baseCart === cart.id ? styles.selected : ''}`}>
                      <h3>{cart.label}</h3>
                      <p>{cart.desc}</p>
                      <span className={styles.priceTag}>From ${cart.price.toLocaleString('en-US')}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className={styles.stepTitle}>Seating Configuration</h2>
                <div className={styles.optionGrid}>
                  {SEATING.map(s => (
                    <button key={s.id} onClick={() => setSeating(s.id)} className={`${styles.optionCard} ${seating === s.id ? styles.selected : ''}`}>
                      <h3>{s.label}</h3>
                      <p>{s.desc}</p>
                      <span className={styles.priceTag}>{s.price > 0 ? `+$${s.price.toLocaleString('en-US')}` : 'Included'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className={styles.stepTitle}>Motor & Battery Package</h2>
                <div className={styles.optionGrid}>
                  {MOTORS.map(m => (
                    <button key={m.id} onClick={() => setMotor(m.id)} className={`${styles.optionCard} ${motor === m.id ? styles.selected : ''}`}>
                      <h3>{m.label}</h3>
                      <p>{m.desc}</p>
                      <span className={styles.priceTag}>{m.price > 0 ? `+$${m.price.toLocaleString('en-US')}` : 'Included'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className={styles.stepTitle}>Body Color</h2>
                <div className={styles.colorGrid}>
                  {COLORS.map(c => (
                    <button key={c.id} onClick={() => setColor(c.id)} className={`${styles.colorCard} ${color === c.id ? styles.selected : ''}`}>
                      <div className={styles.colorSwatch} style={{ background: c.hex }} />
                      <span className={styles.colorLabel}>{c.label}</span>
                      {c.price > 0 && <span className={styles.colorPrice}>+${c.price}</span>}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className={styles.stepTitle}>Add Accessories</h2>
                <p className={styles.stepSubtitle}>Select all that apply — each is individually priced.</p>
                <div className={styles.accessoryGrid}>
                  {ACCESSORIES.map(a => (
                    <button key={a.id} onClick={() => toggleAccessory(a.id)} className={`${styles.accessoryCard} ${accessories.includes(a.id) ? styles.selected : ''}`}>
                      <div className={styles.accessoryCheck}>{accessories.includes(a.id) ? '✓' : ''}</div>
                      <h3>{a.label}</h3>
                      <p>{a.desc}</p>
                      <span className={styles.priceTag}>+${a.price.toLocaleString('en-US')}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className={styles.stepTitle}>Your Contact Information</h2>
                <p className={styles.stepSubtitle}>We'll reach out within 24 hours to confirm your build and discuss next steps.</p>
                <div className={styles.contactForm}>
                  <div className={styles.inputGroup}>
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Smith" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@example.com" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Phone Number (Optional)</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 000-0000" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.navButtons}>
            {step > 0 && (
              <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button className={`btn btn-primary ${styles.nextBtn}`} onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleSubmit} disabled={!canNext() || submitting}>
                {submitting ? 'Submitting…' : 'Submit My Build'}
              </button>
            )}
          </div>
        </div>

        {/* Price summary sidebar */}
        <aside className={styles.summary}>
          <h3 className={styles.summaryTitle}>Build Summary</h3>
          <div className={styles.summaryLines}>
            {baseCart && <div className={styles.summaryLine}><span>{BASE_CARTS.find(c => c.id === baseCart)?.label}</span><span>${basePrice.toLocaleString('en-US')}</span></div>}
            {seating && seatingPrice > 0 && <div className={styles.summaryLine}><span>{SEATING.find(s => s.id === seating)?.label}</span><span>+${seatingPrice.toLocaleString('en-US')}</span></div>}
            {motor && motorPrice > 0 && <div className={styles.summaryLine}><span>{MOTORS.find(m => m.id === motor)?.label}</span><span>+${motorPrice.toLocaleString('en-US')}</span></div>}
            {color && colorPrice > 0 && <div className={styles.summaryLine}><span>{COLORS.find(c => c.id === color)?.label}</span><span>+${colorPrice.toLocaleString('en-US')}</span></div>}
            {accessories.map(id => {
              const a = ACCESSORIES.find(acc => acc.id === id);
              return a ? <div key={id} className={styles.summaryLine}><span>{a.label}</span><span>+${a.price.toLocaleString('en-US')}</span></div> : null;
            })}
          </div>
          {totalPrice > 0 ? (
            <div className={styles.summaryTotal}>
              <span>Estimated Total</span>
              <span>${totalPrice.toLocaleString('en-US')}</span>
            </div>
          ) : (
            <p className={styles.summaryEmpty}>Select options to see your estimate.</p>
          )}
          <p className={styles.summaryDisclaimer}>Final price confirmed after consultation. Financing available.</p>
        </aside>
      </div>
    </div>
  );
}
