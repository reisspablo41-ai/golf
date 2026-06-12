export default function RefundPolicyPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Refund & Return Policy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p><strong>Last Updated: June 12, 2026</strong></p>
        
        <p>
          At Premier Carts, we are committed to providing high-quality vehicles, premium parts, and elite craftsmanship. Because our inventory ranges from highly specialized mechanical components to fully customized low-speed vehicles (LSVs), we maintain clear, strict guidelines regarding returns, cancellations, and refunds.
        </p>
        <p>
          By purchasing from Premier Carts, you explicitly agree to the terms and conditions outlined below.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>1. Inventory Classification: Vehicles vs. Parts</h2>
        <p>To maintain operational efficiency and accommodate the heavy logistics involved in freight shipping, our inventory is split into two distinct operational classifications:</p>
        
        <h3 style={{ color: 'var(--text-primary)', marginTop: '0.5rem', fontSize: '1.25rem' }}>A. Custom-Built & Modified Vehicles</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Definition:</strong> Any golf cart, utility vehicle, or LSV that has been built-to-order, painted, lifted, modified, or configured based on customer-selected specifications.</li>
          <li><strong>Policy:</strong> Fully custom-built vehicles are strictly non-refundable and non-returnable. Once engineering, part allocation, or assembly commences at our facility, the vehicle cannot be canceled or returned.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', marginTop: '1rem', fontSize: '1.25rem' }}>B. Standard Parts, Components, & Accessories</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Definition:</strong> Standalone merchandise, replacement parts, tires, lift kits, electronic arrays, or enclosures purchased independently of a vehicle build.</li>
          <li><strong>Policy:</strong> These items carry a standard 30-day return window, subject to strict condition and restocking criteria.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>2. 30-Day Return Window & Strict Eligibility Criteria</h2>
        <p>For items classified as standard parts and accessories, returns must adhere to the following timelines and physical conditions:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>The 30-Day Limit:</strong> All return requests must be formally initiated within 30 calendar days from the verified date of delivery as recorded by the carrier. Requests made on day 31 or later will be automatically rejected.</li>
          <li><strong>Uninstalled & Unused Condition:</strong> To protect our inventory integrity, parts must be entirely uninstalled and unused. If an item shows tool marks, wiring modifications, scratches, grease, or any evidence of mounting, it is completely ineligible for a return.</li>
          <li><strong>Original Packaging:</strong> Merchandise must be returned in its original, pristine manufacturing packaging. This includes all structural boxes, internal foam, protective plastic wrap, hardware bags, instruction manuals, and documentation.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>3. Freight Logistics, Restocking Fees, & Shipping Costs</h2>
        <p>The transport of industrial golf cart components and pre-built vehicles involves complex freight routing and handling. To mitigate these overhead expenses, our financial allocation structure is as follows:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>15% Vehicle Restocking Fee:</strong> A standard 15% restocking fee applies to all pre-built, non-custom vehicle returns. This fee is automatically deducted from your final refund balance to offset secondary detailing, multi-point safety inspections, warehouse re-entry, and localized logistics.</li>
          <li><strong>Return Shipping Costs:</strong> The customer is solely responsible for organizing, scheduling, and paying for all return shipping charges.</li>
          <li><strong>Logistics Exemption:</strong> Premier Carts will cover return shipping expenses and wave restocking fees only if an item is explicitly verified by our team to have been shipped incorrectly or arrived with clear manufacturing defects.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>4. Rigorous Inspection & Electrical Verification Protocol</h2>
        <p>Every single item returned to our facility undergoes a comprehensive evaluation before any capital is credited back to your account.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Mandatory Warehouse Notice:</strong> We do not issue "instant refunds." All incoming items must be cleared through our technical intake grid.</li>
          <li><strong>Inspection Timeline:</strong> Refunds are processed and disbursed within 5 to 7 business days after the package has arrived at our primary fulfillment center.</li>
          <li><strong>Electrical Parts Warning:</strong> Given the sensitive nature of 48V/12V electrical systems, solenoids, controllers, and digital dashboards, these components undergo specialized bench testing. If an electrical component shows signs of a short-circuit caused by improper user installation, the return will be denied.</li>
          <li><strong>Rejected Returns:</strong> Items that fail inspection due to damage, wear, or missing parts will be rejected. In this scenario, the customer will be notified, and the item will be held for 14 days to be shipped back to the customer at their own expense. Unclaimed rejected returns will be discarded after 14 days.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>5. Non-Refundable Custom Build Deposits</h2>
        <p>Deposits are treated as immediate operational capital to secure manufacturing material assets.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Immediate Allocation:</strong> All deposits paid toward custom vehicle builds or specialty backordered parts are strictly non-refundable.</li>
          <li><strong>Why This Rule Exists:</strong> Upon receipt of your deposit, our automated procurement system immediately purchases custom bodies, specialized lithium battery cells, custom upholstery, or specific rims from our manufacturing partners. These raw materials cannot be returned or re-stocked by our facility.</li>
          <li><strong>Cancellation Forfeiture:</strong> If you choose to cancel a custom build order at any point after your deposit has been processed, the entire deposit sum is forfeited in full to cover the cost of the allocated assets.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>6. Shipping Damage & Shortages Claim Procedure</h2>
        <p>If your product arrives damaged via a third-party freight or parcel carrier, you must document it immediately to preserve your return rights:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Inspect on Arrival:</strong> For vehicle freight, inspect the physical exterior thoroughly before signing the Bill of Lading (BOL) provided by the truck driver.</li>
          <li><strong>Note Damage on BOL:</strong> If there is visible damage to the vehicle or packaging, you must write "Product Arrived Damaged" explicitly on the driver's paperwork before signing.</li>
          <li><strong>48-Hour Reporting Window:</strong> Photograph all damage extensively and email our support desk within 48 hours of delivery. Failure to note damage on the BOL or report it within 48 hours completely voids our ability to file a carrier claim, and your return request will be denied.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>7. How to Properly Initiate a Return (Step-by-Step)</h2>
        <p>To avoid shipping delays or unauthorized warehouse rejections, your return must follow this exact sequence:</p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Step 1: Request an RMA Number</strong><br />Contact our administration desk via email. You must provide your original order number and clear digital photos proving the item is still brand new in its original packaging. If approved, you will receive a Return Merchandise Authorization (RMA) number.</li>
          <li><strong>Step 2: Secure Commercial Packaging</strong><br />Pack the item back into its original shipping box. Ensure that all sub-components are wrapped securely to prevent shifting or cracking during reverse transit.</li>
          <li><strong>Step 3: Label and Ship with Tracking</strong><br />Clearly print your assigned RMA number on the outside of the shipping container. Ship the package using a reputable courier (UPS, FedEx, or DHL) and ensure you purchase tracking and shipping insurance. Premier Carts is not responsible for return packages that are lost, misrouted, or smashed in transit.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>8. Manufacturer Warranties vs. In-House Returns</h2>
        <p>If a component or vehicle breaks down after it has been used or installed, it falls completely outside the scope of our return policy and transitions into a warranty claim:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>New Equipment:</strong> Many of our lithium battery packs, high-performance motors, and full vehicles carry extensive manufacturer warranties ranging from 1 to 5 years.</li>
          <li><strong>Resolution Process:</strong> Premier Carts will gladly assist you in coordinating with the manufacturer to secure replacement parts or authorized repair work under their warranty guidelines, but the item cannot be exchanged for a cash refund.</li>
        </ul>

        <h2 style={{ color: 'var(--text-primary)', marginTop: '1.5rem', fontSize: '1.5rem' }}>9. Contact and Customer Support Desk</h2>
        <p>For formal return submittals, tracking updates on an active inspection, or to resolve an inventory dispute, please communicate exclusively through our authorized customer service channels:</p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Corporate Email Desk:</strong> contact@premiergolfcartssale.com</li>
          <li><strong>Direct Support Phone:</strong> (205) 304-0178</li>
          <li><strong>Standard Business Hours:</strong> Monday through Friday, 9:00 AM – 6:00 PM Eastern Standard Time (EST)</li>
        </ul>
      </div>
    </div>
  );
}
