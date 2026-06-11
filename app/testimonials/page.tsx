import styles from './page.module.css';

const testimonials = [
  { name: 'Michael T.', location: 'Florida', quote: 'The attention to detail on my custom Phantom build is insane. It’s the talk of the neighborhood. Premier handled the shipping perfectly!' },
  { name: 'Sarah J.', location: 'Texas', quote: 'We ordered 4 electric carts for our ranch. The lithium battery upgrade was worth every penny. Phenomenal torque and battery life.' },
  { name: 'David R.', location: 'Georgia', quote: 'Great customer service. I needed specific OEM parts for a rebuild and they sourced them within days. Highly recommended.' },
  { name: 'Jessica M.', location: 'California', quote: 'Best street-legal cart I have ever driven. The suspension is butter smooth, even on rough trails.' },
  { name: 'James W.', location: 'Ohio', quote: 'Bought a Timberwolf gas utility cart for my farm. It hauls heavy feed bags effortlessly. Built like a tank.' },
  { name: 'Robert B.', location: 'South Carolina', quote: 'The custom paint job matched my exact specifications. Very impressed with the clear coat quality.' },
  { name: 'Linda S.', location: 'Arizona', quote: 'Our community requires quiet carts, and the electric model is virtually silent. Perfect for evening rides.' },
  { name: 'William K.', location: 'North Carolina', quote: 'I was hesitant to buy online, but the nationwide delivery was seamless and the cart arrived flawless.' },
  { name: 'Patricia L.', location: 'Nevada', quote: 'The seats are incredibly comfortable, and the marine-grade vinyl is perfect for the desert heat.' },
  { name: 'Richard P.', location: 'Colorado', quote: 'Took the lifted cart into the mountains and it handled the inclines without breaking a sweat.' },
  { name: 'Charles H.', location: 'Tennessee', quote: 'I’ve owned 3 carts in my life, and this is by far the highest quality build. The frame is rock solid.' },
  { name: 'Susan G.', location: 'Michigan', quote: 'Excellent warranty support. Had a minor issue with a headlight and they sent a replacement overnight.' },
  { name: 'Joseph F.', location: 'Pennsylvania', quote: 'The financing process was quick and painless. Got approved in minutes.' },
  { name: 'Thomas D.', location: 'Virginia', quote: 'Added the street-legal kit myself. The instructions were clear and all parts fit perfectly.' },
  { name: 'Christopher A.', location: 'Washington', quote: 'The 4-seater is spacious. Even tall adults fit comfortably in the back without feeling cramped.' },
  { name: 'Daniel V.', location: 'Oregon', quote: 'Love the Bluetooth audio system integration. Sounds crisp and clear even at top speed.' },
  { name: 'Paul M.', location: 'Utah', quote: 'The digital dashboard is a game changer. Very easy to read battery levels and speed in direct sunlight.' },
  { name: 'Mark C.', location: 'Idaho', quote: 'This cart gets more compliments than my truck. The LED underglow kit is a nice touch.' },
  { name: 'Donald E.', location: 'New York', quote: 'Arrived exactly when promised. The delivery driver was professional and walked me through the features.' },
  { name: 'George Y.', location: 'New Jersey', quote: 'Upgraded to the 14-inch wheels. Gives the cart a super aggressive stance. Love it.' },
  { name: 'Kenneth O.', location: 'Maryland', quote: 'The turn signals and brake lights are extremely bright, making me feel much safer driving on local roads.' },
  { name: 'Steven L.', location: 'Massachusetts', quote: 'I use it daily to commute to the local club. It hasn’t skipped a beat in over a year.' },
  { name: 'Edward I.', location: 'Indiana', quote: 'The brush guard is heavy-duty. Already saved the front end from a few rogue branches.' },
  { name: 'Brian N.', location: 'Wisconsin', quote: 'Battery range is exactly as advertised. I can go days without plugging it in.' },
  { name: 'Ronald S.', location: 'Minnesota', quote: 'The foldable windshield is great for chilly mornings and drops down easily for hot afternoons.' },
  { name: 'Anthony T.', location: 'Missouri', quote: 'Customer support answered the phone immediately when I had a question about the charger. A+.' },
  { name: 'Kevin U.', location: 'Alabama', quote: 'The utility bed is massive. I use it for hauling firewood and it handles the payload easily.' },
  { name: 'Jason B.', location: 'Louisiana', quote: 'The custom upholstery stitching is flawless. Looks like it belongs in a luxury sports car.' },
  { name: 'Matthew W.', location: 'Mississippi', quote: 'Navigating the website and customizing my build was super intuitive and fun.' },
  { name: 'Gary H.', location: 'Arkansas', quote: 'I was amazed by the torque on the electric motor. It pulls me and 3 buddies up steep hills with ease.' },
  { name: 'Timothy C.', location: 'Oklahoma', quote: 'The cooler attachment is a must-have. Keeps ice frozen all day on the course.' },
  { name: 'Jose R.', location: 'New Mexico', quote: 'The matte black finish looks incredibly stealthy. Constantly getting asked where I bought it.' },
  { name: 'Larry F.', location: 'Kansas', quote: 'The disc brakes are highly responsive. Stops on a dime compared to my old cart.' },
  { name: 'Jeffrey K.', location: 'Nebraska', quote: 'I run a security team and we use these carts nightly. They are reliable and low-maintenance.' },
  { name: 'Frank P.', location: 'South Dakota', quote: 'The extended roof covers the back passengers perfectly, keeping everyone out of the sun.' },
  { name: 'Scott M.', location: 'North Dakota', quote: 'Winter tires grip the snow much better than I expected. A true all-season vehicle.' },
  { name: 'Eric J.', location: 'Montana', quote: 'The suspension travel on the lifted model makes bumpy trails feel like paved roads.' },
  { name: 'Stephen G.', location: 'Wyoming', quote: 'I use it for hunting. The gas engine is surprisingly quiet and gets great mileage.' },
  { name: 'Andrew B.', location: 'Alaska', quote: 'Held up great through a harsh winter. Battery didn’t lose much capacity in the cold.' },
  { name: 'Raymond Y.', location: 'Hawaii', quote: 'The anti-corrosion coating is crucial for the salty air here. So far, zero rust.' },
  { name: 'Gregory D.', location: 'Rhode Island', quote: 'Compact enough to fit perfectly in my small garage while still seating 4.' },
  { name: 'Joshua V.', location: 'Delaware', quote: 'The onboard charger is super convenient. I just plug it into a regular wall outlet.' },
  { name: 'Jerry W.', location: 'Connecticut', quote: 'Upgraded steering wheel feels great in the hands. Much better than the stock plastic ones.' },
  { name: 'Dennis N.', location: 'New Hampshire', quote: 'The custom floor mats are easy to hose off after a muddy ride.' },
  { name: 'Walter C.', location: 'Maine', quote: 'Purchased for my parents. The step-up bar makes it very easy for them to get in and out.' },
  { name: 'Patrick L.', location: 'Vermont', quote: 'The locking dash compartments are great for keeping valuables secure while parked.' },
  { name: 'Peter R.', location: 'Iowa', quote: 'I was shocked at how fast the 48V system accelerates. Highly recommend the upgrade.' },
  { name: 'Harold E.', location: 'Illinois', quote: 'The cart is perfectly balanced. Cornering feels very stable even with a full load.' },
  { name: 'Douglas S.', location: 'Kentucky', quote: 'The headlights cast a very wide beam, making night driving much safer.' },
  { name: 'Henry A.', location: 'West Virginia', quote: 'Incredible value for the money. You get premium features without the massive markup.' },
];

export default function TestimonialsPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1280px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>What Our Riders Say</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Read experiences from 50 of our satisfied customers nationwide.
        </p>
      </div>

      <div className={styles.masonryGrid}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.testimonialCard}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>"{t.quote}"</p>
            <div className={styles.authorInfo}>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.location}>{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
