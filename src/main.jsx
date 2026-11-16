import React, { useEffect, useMemo, useState, useRef, memo } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const assets = '/assets/';

// Always start a fresh page load at the top instead of restoring an old
// browser scroll position. In-page navigation still scrolls normally.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Each product's photos live in public/assets/products/<slug>/ as 1.jpg, 2.jpg, 3.jpg
// Every product has exactly 3 photos in jpg format.
function gallery(slug) {
  return Array.from({ length: 3 }, (_, i) => `products/${slug}/${i + 1}.jpg`);
}

const products = [
  {
    slug: 'absorbent-gauze-cloth',
    name: 'Absorbent Gauze Cloth',
    summary: 'Soft, breathable and highly absorbent 100% pure cotton gauze fabric.',
    description:
      'Absorbent Gauze Cloth is a soft, breathable and highly absorbent fabric made from 100% pure cotton yarn. It is specially woven to provide superior absorbency and is used in medical dressings and wound care products.',
    sizes: ['90cms to 120cms', '10mtr to 50mtr'],
    features: ['100% pure cotton yarn', 'Superior absorbency', 'Breathable woven fabric', 'Soft contact surface'],
    applications: ['Medical dressings', 'Wound care products', 'Clinical supplies'],
    specifications: [
      { label: 'Material', value: '100% Pure Woven Cotton' },
      { label: 'Thread Count', value: '19 x 15 threads/inch² (or BP Type 13 / 17)' },
      { label: 'Standard Widths', value: '90 cm, 100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 100 meters' },
      { label: 'Sterility', value: 'Non-Sterile (Autoclavable)' },
      { label: 'Absorption Rate', value: 'Sinks in less than 10 seconds' },
      { label: 'Packaging', value: 'Individually wrapped rolls in master cardboard cartons' }
    ]
  },
  {
    slug: 'bandage-cloth',
    name: 'Bandage Cloth',
    summary: 'High-quality woven cotton fabric used in medical bandage manufacturing.',
    description:
      'Bandage Cloth is a high-quality woven cotton fabric used in the manufacturing of medical bandages. Made from 100% pure cotton yarn, it is breathable, soft and designed for use around fractures, surgical dressings and wound care support.',
    sizes: ['90cms to 120cms', '10mtr to 50mtr'],
    features: ['High-quality woven cotton', 'Soft and breathable', 'Suitable for repeated wrapping', 'Bulk roll format'],
    applications: ['Medical bandages', 'Fracture support', 'Surgical dressing support', 'General wound care'],
    specifications: [
      { label: 'Material', value: '100% Cotton Woven Fabric' },
      { label: 'Weave Type', value: 'Plain weave with selvage edge support' },
      { label: 'Standard Widths', value: '90 cm, 100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 50 meters' },
      { label: 'Thread Count', value: '17-thread count standard mesh' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Protective inner poly sleeve with bulk transport cartons' }
    ]
  },
  {
    slug: 'roller-bandage-paper-packing',
    name: 'Roller Bandage - Paper Packing',
    summary: 'Roller bandage for support, secure dressing and compression.',
    description:
      'Roller bandages are essential medical supplies used to support injuries, secure dressings, reduce swelling and provide light compression. They are made from soft, breathable material and are suitable for quick clinical use.',
    sizes: ['5cm', '7.5cm', '10cm', '15cm', '3mtr to 30mtr'],
    features: ['Paper packing option', 'Easy to wrap', 'Breathable construction', 'Comfortable support'],
    applications: ['Dressing fixation', 'Sprain support', 'Compression wrapping', 'First-aid and hospital use'],
    specifications: [
      { label: 'Material', value: '100% Bleached Cotton Gauze' },
      { label: 'Widths Available', value: '5 cm, 7.5 cm, 10 cm, 15 cm' },
      { label: 'Bandage Length', value: '3 meters, 4 meters, custom up to 30 meters' },
      { label: 'Thread Count', value: '19 x 15 threads/inch²' },
      { label: 'Packing Type', value: 'Individual medical-grade paper wrapping' },
      { label: 'Sterility', value: 'Non-Sterile (Can be steam/ETO sterilized)' },
      { label: 'Features', value: 'Easy wrap, breathable weave, soft compression' }
    ]
  },
  // {
  //   slug: 'individual-roller-bandage',
  //   name: 'Individual Roller Bandage',
  //   summary: 'Individually packed roller bandage for hygienic handling.',
  //   description:
  //     'Individual Roller Bandage is hygienically packed for safer handling. It is used by hospitals, clinics and healthcare providers to secure wound dressing and support injury management.',
  //   sizes: ['5cm', '7.5cm', '10cm', '15cm', '3mtr to 30mtr'],
  //   features: ['Individual packing', 'Clean handling', 'Soft and breathable', 'Easy stock management'],
  //   applications: ['Emergency dressing', 'Ward supply', 'Clinic stock', 'Distributor packing'],
  //   specifications: [
  //     { label: 'Material', value: '100% Absorbent Cotton' },
  //     { label: 'Widths Available', value: '5 cm, 7.5 cm, 10 cm, 15 cm' },
  //     { label: 'Bandage Length', value: '3 meters to 30 meters' },
  //     { label: 'Packing Type', value: 'Individual hygienic polybag wrap' },
  //     { label: 'Sterility', value: 'Non-Sterile' },
  //     { label: 'Use case', value: 'Clinic and ward dressing fixation' }
  //   ]
  // },
  {
    slug: 'gauze-mopping-pad',
    name: 'Gauze Mopping Pad',
    summary: 'Absorbent surgical dressing to control fluids and maintain a clear field.',
    description:
      'Gauze Mopping Pads are absorbent surgical dressings used primarily during operations to control bleeding, absorb fluids and maintain a clear surgical field. Made from 100% cotton gauze, these pads are designed to be soft, lint-free and highly absorbent.',
    sizes: ['25cm x 25cm x 8ply and 12ply', '30cm x 30cm x 8ply and 12ply', '25cm x 40cm x 8ply'],
    features: ['Sterile and non-sterile options', 'Highly absorbent', 'Soft cotton gauze', 'Surgical field support'],
    applications: ['Operation theatre use', 'Blood and fluid absorption', 'Procedure packs', 'Hospital dressing supply'],
    specifications: [
      { label: 'Material', value: '100% Cotton Gauze (High Density)' },
      { label: 'Sizes Available', value: '25cm x 25cm, 30cm x 30cm, 25cm x 40cm' },
      { label: 'Ply Options', value: '8-ply, 12-ply, 16-ply' },
      { label: 'Safety Feature', value: 'X-ray detectable barium sulphate thread option' },
      { label: 'Design', value: 'Pre-washed, loop attachment for operative handling' },
      { label: 'Sterility', value: 'Sterile (ETO) or Non-Sterile packs' },
      { label: 'Packaging', value: 'Individually wrapped or blister-packed' }
    ]
  },
  {
    slug: 'gauze-dressing-pad',
    name: 'Gauze Dressing Pad - Sterile and Non-Sterile',
    summary: 'Medical dressing pad for wound coverage and exudate management.',
    description:
      'Gauze Dressing Pads are sterile or non-sterile medical dressings made from highly absorbent cotton gauze. They are used to cover and protect wounds while allowing airflow for faster healing. Designed to be soft, breathable and non-adherent, these pads are ideal for managing exudating wounds, post-surgical sites and cuts.',
    sizes: ['10cm x 10cm', '10cm x 15cm', '10cm x 20cm'],
    features: ['Soft wound contact', 'Breathable structure', 'Good exudate management', 'Sterile and non-sterile supply'],
    applications: ['Wound coverage', 'Post-surgical dressing', 'Cuts and abrasions', 'Clinic dressing rooms'],
    specifications: [
      { label: 'Outer Material', value: 'Bleached Absorbent Cotton Gauze wrapper' },
      { label: 'Inner Core', value: 'Highly absorbent surgical cotton wool pad' },
      { label: 'Sizes Available', value: '10cm x 10cm, 10cm x 15cm, 10cm x 20cm' },
      { label: 'Absorbency', value: 'Excellent fluid retention and cushioning' },
      { label: 'Sterility', value: 'ETO Sterile and Non-Sterile available' },
      { label: 'Packaging', value: 'Individually packed in paper/film peel pouch' }
    ]
  },
  {
    slug: 'gamjee-roll',
    name: 'Gamjee Roll',
    summary: 'Thick absorbent surgical dressing roll with cotton wool between gauze layers.',
    description:
      'Gamjee Roll is a soft, thick surgical dressing roll made by layering absorbent cotton wool between layers of gauze. It is stitched or wrapped together to form a cushioned protective roll and is commonly used in hospitals and clinics for wound care, padding and dressing retention.',
    sizes: ['10cm x 1mtr, 2mtr, 3mtr', '15cm x 1mtr, 2mtr, 3mtr'],
    features: ['Cushioned padding', 'High absorbency', 'Protective dressing support', 'Comfortable roll format'],
    applications: ['Wound padding', 'Dressing retention', 'Orthopedic support', 'Post-operative dressing'],
    specifications: [
      { label: 'Composition', value: 'Thick surgical cotton wool rolled between outer gauze layers' },
      { label: 'Widths Available', value: '10 cm, 15 cm' },
      { label: 'Roll Lengths', value: '1 meter, 2 meters, 3 meters' },
      { label: 'Layering Weight', value: '120-150 GSM thick protective layer' },
      { label: 'Sterility', value: 'Non-Sterile (Sterilizable)' },
      { label: 'Primary Use', value: 'Post-operative dressings, protective padding for fractures' },
      { label: 'Packaging', value: 'Roll packed in protective craft paper sleeves' }
    ]
  },
  {
    slug: 'ribbon-gauze',
    name: 'Ribbon Gauze',
    summary: 'Soft, absorbent 100% pure cotton ribbon gauze in multiple widths and lengths.',
    description:
      'Ribbon Gauze is a soft, absorbent bandage roll made from 100% pure cotton. Available in a range of widths and lengths, it is suitable for wound dressing, securing dressings and general medical use.',
    sizes: ['1cm', '2.5cm', '5cm', '7.5cm'],
    features: ['100% pure cotton', 'Soft and absorbent', 'Multiple widths and lengths', 'Convenient roll packing'],
    applications: ['Wound dressing', 'Securing dressings', 'Clinical and hospital use', 'First-aid supplies'],
    specifications: [
      { label: 'Sizes', value: '1 cm, 2.5 cm, 5 cm, 7.5 cm' },
      { label: 'Lengths', value: '1 m, 2 m, 3 m, 4 m, 5 m' },
      { label: 'Material', value: '100% pure cotton' },
      { label: 'Packing', value: '1 roll, 5 rolls, 10 rolls' }
    ]
  },
  {
    slug: 'gauze-4-ply-roll',
    name: 'Gauze 4 Ply Roll',
    summary: 'Bleached white cotton gauze roll available in multiple sizes, ply options and mesh counts.',
    description:
      'Gauze 4 Ply Roll is made from 100% cotton and is available in bleached white, sterile and non-sterile options, with or without an X-ray detectable thread. It is used to bandage the wound, absorb exudate, and protect and isolate the wound.',
    sizes: ['90cm x 100yds', '90cm x 100m', '90cm x 50yds', '90cm x 50m', '90cm x 2000m', 'Custom sizes available'],
    features: ['100% cotton', 'Bleached white', 'Sterile and non-sterile options', 'With or without X-ray detectable thread'],
    applications: ['Bandage wounds', 'Absorb wound exudate', 'Protect and isolate wounds'],
    specifications: [
      { label: 'Size', value: '90cm x 100yds, 90cm x 100m, 90cm x 50yds, 90cm x 50m, 90cm x 2000m, etc.' },
      { label: 'Ply', value: '4-ply, 2-ply, 1-ply' },
      { label: 'Mesh', value: '12 x 8 mesh, 19 x 11 mesh, 19 x 15 mesh, 26 x 18 mesh, 30 x 20 mesh, etc.' },
      { label: 'Color', value: 'Bleached white' },
      { label: 'Material', value: '100% cotton (40s, 32s, 21s, etc.)' },
      { label: 'Type', value: 'Without X-ray or with X-ray detectable thread' },
      { label: 'Sterilization', value: 'Sterile or non-sterile' },
      { label: 'Application', value: 'Used to bandage the wound, absorb the exudate, and protect and isolate the wound' }
    ]
  },
  {
    slug: 'gauze-slitting-roll',
    name: 'Gauze Slitting Roll',
    summary: 'Bleached white cotton gauze roll in multiple widths, lengths and mesh options.',
    description:
      'Gauze Slitting Roll is made from 100% cotton and supplied in bleached white. Available in widths from 10cm to 50cm, lengths from 500m to 1000m, and plain or X-ray detectable options.',
    sizes: ['10cm to 50cm'],
    features: ['100% cotton', 'Bleached white', 'Multiple mesh options', 'Plain and X-ray detectable options'],
    applications: ['Medical gauze and dressing use'],
    specifications: [
      { label: 'Sizes', value: '10cm to 50cm' },
      { label: 'Length', value: '500m to 1000m' },
      { label: 'Mesh', value: '12 x 8 mesh, 19 x 11 mesh, 19 x 15 mesh, 26 x 18 mesh, 30 x 20 mesh, etc.' },
      { label: 'Color', value: 'Bleached white' },
      { label: 'Material', value: '100% cotton (40s, 30s, 20s, etc.)' },
      { label: 'Type', value: 'Plain or X-ray detectable' }
    ]
  },
  {
    slug: 'absorbent-cotton-roll',
    name: 'Absorbent Cotton Roll',
    summary: 'Soft, fluffy and highly absorbent 100% pure cotton medical roll.',
    description:
      'Absorbent Cotton Roll, also known as surgical cotton wool, is a soft, fluffy and highly absorbent medical product made from 100% pure cotton fibres. It is widely used in medical, surgical and personal care applications for wound cleaning, dressing, padding and general hygiene.',
    sizes: ['25gm gross - 15gm net', '50gm gross - 40gm net', '100gm gross - 75gm net', '400gm gross - 300gm net', '500gm gross - 400gm net'],
    features: ['100% pure cotton', 'Soft and fluffy', 'High fluid absorption', 'Multiple pack sizes'],
    applications: ['Wound cleaning', 'Dressing padding', 'Hospital hygiene', 'Personal care'],
    specifications: [
      { label: 'Material', value: '100% Pure Bleached Surgical Cotton Wool' },
      { label: 'Weights Available', value: '15g, 40g, 75g, 300g, 400g (Net weights)' },
      { label: 'Absorbency Rate', value: 'Sinks in less than 3 seconds' },
      { label: 'Whiteness', value: 'Superior natural white, chlorine bleached' },
      { label: 'Sterility', value: 'Non-Sterile (Can be sterilized)' },
      { label: 'Packaging', value: 'Individually wrapped in blue craft paper or moisture-proof poly bag' }
    ]
  },
  {
    slug: 'cotton-balls',
    name: 'Cotton Balls',
    summary: 'Soft, round and fluffy cotton balls for medical, cosmetic and personal care.',
    description:
      'Cotton Balls are made from 100% pure absorbent cotton. Designed for gentle use, they are ideal for medical, cosmetic and personal care applications. These balls are soft, fluffy and hygienic, making them suitable for daily professional use.',
    sizes: ['Available on enquiry', 'Bulk and custom packing available'],
    features: ['100% pure absorbent cotton', 'Soft round shape', 'Gentle for skin contact', 'Hygienic packing'],
    applications: ['Medical cleaning', 'Cosmetic use', 'Personal care', 'Clinic and hospital supply'],
    specifications: [
      { label: 'Material', value: '100% Surgical Absorbent Cotton' },
      { label: 'Weight per Ball', value: 'Approx. 0.5 to 1.0 grams per ball' },
      { label: 'Consistency', value: 'Uniform round shape, soft and fluffy' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Packets of 100s, 500s or custom count poly packs' }
    ]
  },
  {
    slug: 'patient-gown',
    name: 'Patient Gown',
    summary: 'Non-woven disposable patient gown for hygiene, comfort and protection.',
    description:
      'This non-woven disposable patient gown is designed to provide safe, hygienic and comfortable coverage for patients during medical examination, procedures and hospital stays. Made from premium non-woven polypropylene material, it offers lightweight protection and helps prevent cross-contamination.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom sizing available'],
    features: ['Non-woven polypropylene', 'Single-use hygiene', 'Lightweight and comfortable', 'Cross-contamination control'],
    applications: ['Patient examination', 'Hospital stay', 'Procedures', 'Disposable clinical wear'],
    specifications: [
      { label: 'Material', value: 'Non-woven Spunbond Polypropylene (SS/SMS)' },
      { label: 'Grammage', value: '30 to 45 GSM' },
      { label: 'Sizes Available', value: 'S, M, L, XL, XXL' },
      { label: 'Design', value: 'Back tie closure, round neck, short/long sleeves' },
      { label: 'Usage', value: 'Single-use / Disposable' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Individually packed in polybags, 50/100 per carton' }
    ]
  },
  {
    slug: 'surgeon-doctor-gown',
    name: 'Surgeon / Doctor Gown',
    summary: 'Disposable blue non-woven surgical gown for sterile operating theatre use.',
    description:
      'Disposable Surgeon / Doctor Gown is designed to provide full-body protection for healthcare professionals during surgical procedures. Made from premium SMS/spunbond non-woven polypropylene fabric, it offers excellent fluid resistance, breathability and barrier protection in medical environments.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom sizing available'],
    features: ['SS/SMS non-woven polypropylene', 'High fluid barrier protection', 'Comfortable elastic cuffs', 'Single-use sterile packaging'],
    applications: ['Operating theatres', 'Surgical teams', 'Infection control departments', 'Clinical laboratories'],
    specifications: [
      { label: 'Material', value: 'Disposable Non-woven Polypropylene (SS/SMS)' },
      { label: 'Fabric Weight', value: '35 to 50 GSM' },
      { label: 'Color', value: 'Medical Blue' },
      { label: 'Cuff Style', value: 'Soft elasticated knitted cuffs' },
      { label: 'Design Details', value: 'Full back wrap-around with overlap, secure waist ties' },
      { label: 'Sterility', value: 'ETO Sterile option or Non-Sterile available' },
      { label: 'Packaging', value: 'Individually wrapped pouches, 50 gowns per master carton' }
    ]
  },
  {
    slug: 'disposables-bed-sheet-pillow-cover',
    name: 'Disposables - Bed Sheet and Pillow Covers',
    summary: 'Disposable bed sheet and pillow cover supplies for hospital hygiene.',
    description:
      'Disposable bed sheets and pillow covers support clean, safe and hygienic patient care environments. They are useful for hospitals, clinics, procedure rooms and patient handling areas where quick replacement and contamination control are important.',
    sizes: ['Available on enquiry', 'Bulk supply available', 'Custom packing available'],
    features: ['Single-use hygiene', 'Easy replacement', 'Hospital-friendly supply', 'Custom packing support'],
    applications: ['Patient beds', 'Procedure rooms', 'Clinic hygiene', 'Disposable hospital supply'],
    specifications: [
      { label: 'Material', value: 'Spunbond Non-Woven Polypropylene (Hydrophobic)' },
      { label: 'Bed Sheet Size', value: '120 cm x 200 cm (Custom hospital sizing available)' },
      { label: 'Pillow Cover Size', value: '50 cm x 75 cm' },
      { label: 'Fabric Density', value: '25 to 40 GSM' },
      { label: 'Colors Available', value: 'Medical Blue, Forest Green, White' },
      { label: 'Sterility', value: 'Non-Sterile (Single-use)' },
      { label: 'Packaging', value: '10 pieces per inner pack, 100 sheets per master pack' }
    ]
  },
  // {
  //   slug: 'dialysis-kit',
  //   name: 'Dialysis Kit',
  //   summary: 'Dialysis care kit supply for clinical and hospital requirements.',
  //   description:
  //     'Dialysis Kit supply is available for hospitals, dialysis centres and clinical requirements. Product configuration, packing and quantity can be customized based on buyer needs and healthcare usage.',
  //   sizes: ['Available on enquiry', 'Custom kit configuration available'],
  //   features: ['Clinical-use packing', 'Custom configuration', 'Bulk supply support', 'Distributor-friendly'],
  //   applications: ['Dialysis centres', 'Hospitals', 'Clinical care kits', 'Healthcare distribution'],
  //   specifications: [
  //     { label: 'Kit Components', value: 'Prep drape, sterile gloves, cotton balls, forceps, drape sheet' },
  //     { label: 'Customization', value: 'Available on enquiry as per dialysis centre lists' },
  //     { label: 'Sterility', value: 'Sterile EO (Ethylene Oxide) processed' },
  //     { label: 'Packaging', value: 'Medical-grade peel pouch wrap (blister pack)' },
  //     { label: 'Certification', value: 'Sterility assurance level (SAL) 10⁻⁶' }
  //   ]
  // },
].map((product) => ({
  ...product,
  images: gallery(product.slug),
  image: gallery(product.slug)[0],
}));

const governmentSupplyStates = [
  { name: 'Medical gauze', logo: 'products/absorbent-gauze-cloth/1.jpg' },
  { name: 'Bandages', logo: 'products/bandage-cloth/1.jpg' },
];

const categories = ['All Products', 'Gauze & Bandage', 'Surgical Cotton', 'Hospital Wear & Disposables'];

const categoryBySlug = {
  'absorbent-gauze-cloth': 'Gauze & Bandage',
  'bandage-cloth': 'Gauze & Bandage',
  'roller-bandage-paper-packing': 'Gauze & Bandage',
  'individual-roller-bandage': 'Gauze & Bandage',
  'gauze-mopping-pad': 'Gauze & Bandage',
  'gauze-dressing-pad': 'Gauze & Bandage',
  'gamjee-roll': 'Gauze & Bandage',
  'ribbon-gauze': 'Gauze & Bandage',
  'gauze-4-ply-roll': 'Gauze & Bandage',
  'gauze-slitting-roll': 'Gauze & Bandage',
  'absorbent-cotton-roll': 'Surgical Cotton',
  'cotton-balls': 'Surgical Cotton',
  'patient-gown': 'Hospital Wear & Disposables',
  'surgeon-doctor-gown': 'Hospital Wear & Disposables',
  'disposables-bed-sheet-pillow-cover': 'Hospital Wear & Disposables',
  'dialysis-kit': 'Hospital Wear & Disposables',
};

const navItems = [
  { route: 'products', label: 'Products' },
  { route: 'about', label: 'About' },
  { route: 'government', label: 'Services & Hours' },
  { route: 'quality', label: 'Quality' },
  { route: 'contact', label: 'Contact' },
];

const certifications = [
  { name: 'Medical gauze', detail: 'Manufacturing & supply' },
  { name: 'Bandages', detail: 'Manufacturing' },
  { name: 'Onsite services', detail: 'Available by enquiry' },
];

const companyName = 'Susee Agencies';
const whatsappNumber = '919345782296';
const phones = [{ display: '+91 93457 82296', tel: '+919345782296' }];
const emails = ['suseeagencies2004@gmail.com'];
const address = '8/162, Chatrapatti - Srivilliputhur Rd, Sankarapandiapuram, Samsigapuram, Tamil Nadu 626102';
const businessHours = 'Mon–Sat: 8:30 AM–6:30 PM; Sun: 8:30 AM–3:30 PM';
const mapQuery = encodeURIComponent(
  `${companyName}, ${address}, India`
);

// Keeps a line from starting with the dash in names like "Roller Bandage - Paper Packing".
function displayName(name) {
  return name.replace(' - ', ' – ');
}

function whatsappLink(productName) {
  const subject = productName || 'your surgical dressing products';
  const message = `Hello ${companyName}, I want to enquire about ${subject}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ========================================
   Icons
   ======================================== */
function Icon({ size = 18, strokeWidth = 2, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function SearchIcon(props) {
  return <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>;
}

function PhoneIcon(props) {
  return <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>;
}

function MailIcon(props) {
  return <Icon {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>;
}

function PinIcon(props) {
  return <Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></Icon>;
}

function GlobeIcon(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Icon>;
}

function ShieldIcon(props) {
  return <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></Icon>;
}

function TruckIcon(props) {
  return <Icon {...props}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></Icon>;
}

function TagIcon(props) {
  return <Icon {...props}><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>;
}

function CheckIcon(props) {
  return <Icon strokeWidth={2.5} {...props}><polyline points="20 6 9 17 4 12" /></Icon>;
}

function ArrowRightIcon(props) {
  return <Icon {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>;
}

function ArrowLeftIcon(props) {
  return <Icon {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>;
}

function ArrowUpIcon(props) {
  return <Icon {...props}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Icon>;
}

function PlusIcon(props) {
  return <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ========================================
   Routing and scrolling
   ======================================== */
function getHashRoute() {
  return window.location.hash.replace(/^#\/?/, '');
}

function scrollToRoute(route) {
  const target = document.getElementById(route || 'home');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// The hash doesn't change when a link to the current route is clicked, so the
// route effect can't handle that case. Scroll to the section directly instead.
function rescrollIfCurrent(event) {
  const href = event.target.closest('a')?.getAttribute('href');
  if (!href?.startsWith('#/')) return;
  const route = href.slice(2);
  if (route === getHashRoute() && !route.startsWith('product/')) scrollToRoute(route);
}

function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function useScrolledPast(threshold) {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isPast;
}

/* Highlights the nav item for the section currently in view. */
function useActiveSection(enabled) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!enabled) return undefined;

    const sections = navItems.map((item) => document.getElementById(item.route)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? '' : current));
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

/* ========================================
   Error Boundary
   ======================================== */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>We are sorry for the inconvenience. Please try refreshing the page.</p>
          <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ========================================
   App
   ======================================== */
function App() {
  const [route, setRoute] = useState(getHashRoute());
  const isInitialRoute = useRef(true);

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (isInitialRoute.current) {
      isInitialRoute.current = false;
      return;
    }

    if (route.startsWith('product/')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    scrollToRoute(route);
  }, [route]);

  const selectedProduct = useMemo(() => {
    const slug = route.startsWith('product/') ? route.replace('product/', '') : '';
    return products.find((product) => product.slug === slug);
  }, [route]);

  const enquiryHref = whatsappLink(selectedProduct?.name);

  return (
    <>
      <a className="skip-link" href="#/main-content">Skip to main content</a>
      <TopBar />
      <Header enquiryHref={enquiryHref} isProductPage={Boolean(selectedProduct)} route={route} />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} enquiryHref={enquiryHref} />
      ) : (
        <Home enquiryHref={enquiryHref} />
      )}
      <Footer />
      <WhatsAppFAB href={enquiryHref} />
      <ScrollToTop />
    </>
  );
}

/* ========================================
   Top bar and header
   ======================================== */
function TopBar() {
  return (
    <div className="topbar">
      <div className="shell topbar-inner">
        <span>Samsigapuram, Tamil Nadu, India</span>
        <div className="topbar-links">
          <a href={`tel:${phones[0].tel}`}><PhoneIcon size={14} /> {phones[0].display}</a>
          <a href={`mailto:${emails[0]}`}><MailIcon size={14} /> {emails[0]}</a>
        </div>
      </div>
    </div>
  );
}

function Header({ enquiryHref, isProductPage, route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(!isProductPage);
  const activeRoute = isProductPage ? 'products' : activeSection;
  const isScrolled = useScrolledPast(8);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  useEffect(() => {
    document.body.classList.toggle('menu-locked', menuOpen);
    return () => document.body.classList.remove('menu-locked');
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="shell header-inner">
          <a
            className="brand"
            href="#/"
            aria-label="Susee Agencies home"
            onClick={(event) => { setMenuOpen(false); rescrollIfCurrent(event); }}
          >
            <span className="brand-mark">
              <img src={`${assets}susee-mark.svg`} alt="" width="350" height="250" />
            </span>
            <span>
              <strong>Susee Agencies</strong>
              <small>Medical Gauze &amp; Bandages</small>
            </span>
          </a>
          <nav
            id="primary-navigation"
            className={`primary-nav${menuOpen ? ' open' : ''}`}
            aria-label="Primary navigation"
            onClick={(event) => { setMenuOpen(false); rescrollIfCurrent(event); }}
          >
            {navItems.map((item) => (
              <a
                key={item.route}
                href={`#/${item.route}`}
                className={activeRoute === item.route ? 'active' : ''}
                aria-current={activeRoute === item.route ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="btn btn-primary header-cta" href={enquiryHref} target="_blank" rel="noopener noreferrer">
              Enquire now
            </a>
            <button
              className={`menu-toggle${menuOpen ? ' open' : ''}`}
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="nav-scrim" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

/* ========================================
   Shared layout pieces
   ======================================== */
function Section({ id, className = '', children }) {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} id={id} className={`band ${className}`}>
      <div className={`shell reveal${isVisible ? ' is-visible' : ''}`}>{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div className="section-heading stagger">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/* ========================================
   Home page
   ======================================== */
function Home({ enquiryHref }) {
  return (
    <main id="main-content" className="page-enter" key="home">
      <Hero />
      <ProductsSection />
      <AboutSection />
      <GovernmentSection />
      <QualitySection />
      <FaqSection />
      <Contact enquiryHref={enquiryHref} />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-copy stagger">
          <p className="eyebrow">Susee Agencies <span aria-hidden="true">/</span> Samsigapuram, Tamil Nadu</p>
          <h1>Care in <em>every</em> wrap.</h1>
          <p className="hero-text">
            Thoughtfully made medical gauze and bandages, backed by personal service from our team
            in Tamil Nadu.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#/products">
              Explore our products <ArrowRightIcon />
            </a>
            <a className="btn btn-outline btn-lg" href="#/contact">Contact sales</a>
          </div>
          <ul className="trust-list" aria-label="Company highlights">
            {['Medical gauze', 'Bandage manufacturing', 'Onsite services', 'Tamil Nadu'].map((item) => (
              <li key={item}><CheckIcon size={15} /> {item}</li>
            ))}
          </ul>
        </div>
        <div className="hero-media">
          <img
            src={`${assets}susee-gauze-hero.png`}
            alt="A soft medical gauze dressing displayed against a dark background"
            width="1146"
            height="640"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

/* ========================================
   Products
   ======================================== */
function ProductCard({ product, index = 0 }) {
  const [ref, isVisible] = useReveal();

  return (
    <a
      ref={ref}
      className={`product-card reveal-item${isVisible ? ' is-visible' : ''}`}
      style={{ '--delay': `${(index % 4) * 70}ms` }}
      href={`#/product/${product.slug}`}
    >
      <div className="product-image">
        <img src={`${assets}${product.image}?v=15`} alt="" width="1024" height="1024" loading="lazy" decoding="async" />
      </div>
      <div className="product-body">
        <span className="product-category">{categoryBySlug[product.slug]}</span>
        <h3>{displayName(product.name)}</h3>
        <p className="product-summary">{product.summary}</p>
        <span className="product-link">View details <ArrowRightIcon size={15} /></span>
      </div>
    </a>
  );
}

function ProductsSection() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) || product.summary.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === categories[0] || categoryBySlug[product.slug] === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const countFor = (category) =>
    category === categories[0]
      ? products.length
      : products.filter((product) => categoryBySlug[product.slug] === category).length;

  return (
    <Section id="products" className="band-tint">
      <div className="products-head">
        <SectionHeading
          eyebrow="Our products"
          title="Complete brochure product range"
          lead="Search below or select a category to view specifications and gallery."
        />
        <div className="search-box" role="search">
          <SearchIcon size={18} />
          <input
            type="search"
            placeholder="Search gauze, cotton, gown..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
          {search && (
            <button type="button" onClick={() => setSearch('')} aria-label="Clear search">&times;</button>
          )}
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter products by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip${selectedCategory === category ? ' active' : ''}`}
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category} <span>{countFor(category)}</span>
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length > 0 ? (
        // Keyed by category so the cards animate in again when the filter changes.
        <div className="product-grid" key={selectedCategory}>
          {filteredProducts.map((product, index) => (
            <ProductCard product={product} index={index} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No products found matching "<strong>{search}</strong>" in <strong>{selectedCategory}</strong>.</p>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => { setSearch(''); setSelectedCategory(categories[0]); }}
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
}

/* ========================================
   About
   ======================================== */
function AboutSection() {
  return (
    <Section id="about">
      <div className="about-grid">
        <div className="about-copy stagger">
          <p className="eyebrow">About the company</p>
          <h2>Our Mission and Vision</h2>
          <p>
            Susee Agencies manufactures medical gauze and bandages and provides onsite services.
            Based in Samsigapuram, Tamil Nadu, we welcome enquiries from healthcare and trade
            customers.
          </p>
          <h2>Quality You Can Trust</h2>
          <p>
            We use carefully selected materials and controlled manufacturing processes to produce
            reliable surgical dressings. Every product is made with close attention to hygiene,
            consistency and compliance for hospitals, clinics and distributors.
          </p>
        </div>
        <aside className="cert-panel">
          <h3>Our products &amp; services</h3>
          <CertificationList />
        </aside>
      </div>
    </Section>
  );
}

const CertificationList = memo(function CertificationList() {
  return (
    <ul className="cert-list stagger">
      {certifications.map((cert) => (
        <li key={cert.name}>
          <strong>{cert.name}</strong>
          <span>{cert.detail}</span>
        </li>
      ))}
    </ul>
  );
});

/* ========================================
   Manufacturing and services
   ======================================== */
function GovernmentSection() {
  return (
    <Section id="government" className="band-tint">
      <SectionHeading
        eyebrow="Manufacturing & services"
        title="Medical gauze, bandages and onsite services."
        lead="Susee Agencies serves customers from Sankarapandiapuram, Samsigapuram, Tamil Nadu. Contact us to discuss product and service requirements."
      />
      <div className="gov-layout">
        <div className="state-grid stagger">
          {governmentSupplyStates.map((state) => (
            <article className="state-card" key={state.name}>
              <div className="state-logo">
                <img
                  src={`${assets}${state.logo}`}
                  alt={`${state.name} product`}
                  loading="lazy"
                  width="96"
                  height="96"
                />
              </div>
              <div>
                <h3>{state.name}</h3>
                <span>Manufacturing</span>
              </div>
            </article>
          ))}
        </div>
        <div className="export-panel services-contact-panel">
          <div>
            <p className="export-tag"><GlobeIcon size={15} /> Susee Agencies</p>
            <h3>Visit or contact our team</h3>
            <p>
              Find us at 8/162, Chatrapatti - Srivilliputhur Road, Sankarapandiapuram,
              Samsigapuram, Tamil Nadu 626102. Our team is available during the hours listed below.
              <br /><br />{businessHours}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   Quality
   ======================================== */
const qualityPoints = [
  { icon: ShieldIcon, title: 'Medical gauze', text: 'Manufacturing and supply for healthcare requirements.' },
  { icon: TruckIcon, title: 'Bandage manufacturing', text: 'Contact our team to discuss available products and quantities.' },
  { icon: TagIcon, title: 'Onsite services', text: 'Onsite service enquiries are welcome.' },
  { icon: GlobeIcon, title: 'Local business', text: 'Serving customers from Samsigapuram, Tamil Nadu.' },
];

function QualitySection() {
  return (
    <Section id="quality" className="band-dark">
      <div className="quality-grid">
        <SectionHeading eyebrow="Why choose us" title="Built around quality, speed and flexibility." />
        <div className="quality-list stagger">
          {qualityPoints.map(({ icon: PointIcon, title, text }) => (
            <div key={title}>
              <PointIcon size={24} strokeWidth={1.75} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   FAQ
   ======================================== */
const faqs = [
  {
    question: 'What products do we manufacture?',
    answer:
      'Susee Agencies manufactures medical gauze and bandages. Contact us to confirm available products and specifications.',
  },
  {
    question: 'Do we supply bulk and custom requirements?',
    answer:
      'Please contact Susee Agencies with your product, quantity and delivery requirements to discuss supply options.',
  },
  {
    question: 'Where are we located?',
    answer:
      '8/162, Chatrapatti - Srivilliputhur Rd, Sankarapandiapuram, Samsigapuram, Tamil Nadu 626102.',
  },
  {
    question: 'What are your business hours?',
    answer: businessHours,
  },
];

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="faq">
      <div className="faq-grid">
        <SectionHeading eyebrow="Buyer information" title="Common questions from hospitals and distributors" />
        <div className="faq-list stagger">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <PlusIcon size={18} />
                  </button>
                </h3>
                <div className="faq-answer" id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`}>
                  <div><p>{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   Product detail page
   ======================================== */
function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);
  const count = product.images.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  const showPrevious = () => setActiveIndex((index) => (index === 0 ? count - 1 : index - 1));
  const showNext = () => setActiveIndex((index) => (index + 1) % count);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  };

  const activeImage = product.images[activeIndex] || product.images[0];

  return (
    <div className="gallery">
      <div className="gallery-main" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <img
          key={activeImage}
          src={`${assets}${activeImage}?v=15`}
          alt={`${product.name}, photo ${activeIndex + 1} of ${count}`}
          width="1024"
          height="1024"
        />
        {count > 1 && (
          <>
            <button className="gallery-nav prev" type="button" onClick={showPrevious} aria-label="Previous product photo">
              <ArrowLeftIcon size={20} />
            </button>
            <button className="gallery-nav next" type="button" onClick={showNext} aria-label="Next product photo">
              <ArrowRightIcon size={20} />
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="gallery-thumbs">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={index === activeIndex ? 'active' : ''}
              aria-label={`View ${product.name} photo ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              <img src={`${assets}${image}?v=15`} alt="" width="1024" height="1024" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product, enquiryHref }) {
  const category = categoryBySlug[product.slug];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${product.name} | Susee Agencies`;
    return () => { document.title = previousTitle; };
  }, [product]);

  // Prefer products from the same category when suggesting what to view next.
  const related = useMemo(() => {
    const others = products.filter((item) => item.slug !== product.slug);
    const sameCategory = others.filter((item) => categoryBySlug[item.slug] === category);
    const otherCategories = others.filter((item) => categoryBySlug[item.slug] !== category);
    return [...sameCategory, ...otherCategories].slice(0, 4);
  }, [product, category]);

  return (
    <main className="page-enter" id="main-content" key={product.slug}>
      <section className="detail-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#/products"><ArrowLeftIcon size={15} /> All products</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{displayName(product.name)}</span>
          </nav>
          <div className="detail-grid">
            <ProductGallery product={product} />
            <div className="detail-copy stagger">
              <p className="eyebrow">{category}</p>
              <h1>{displayName(product.name)}</h1>
              <p className="detail-description">{product.description}</p>

              {product.sizes?.length > 0 && (
                <div className="detail-block">
                  <h2>Available sizes</h2>
                  <ul className="size-list">
                    {product.sizes.map((size) => <li key={size}>{size}</li>)}
                  </ul>
                </div>
              )}

              <div className="detail-actions">
                <a className="btn btn-whatsapp btn-lg" href={enquiryHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp enquiry
                </a>
                <a className="btn btn-outline btn-lg" href={`tel:${phones[0].tel}`}>
                  <PhoneIcon /> Call sales
                </a>
              </div>

              <div className="detail-block">
                <h2>Our products &amp; services</h2>
                <CertificationList />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="band-tint">
        <div className="spec-grid">
          <div>
            <SectionHeading
              eyebrow="Technical details"
              title="Product Specifications"
              lead="Standard manufacturing criteria and parameters. Custom sizes and packaging can be supplied on request."
            />
            <div className="spec-table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Standard specification</th>
                  </tr>
                </thead>
                <tbody className="stagger">
                  {product.specifications?.map((spec) => (
                    <tr key={spec.label}>
                      <th scope="row">{spec.label}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="spec-side">
            <DetailPanel title="Key features" items={product.features} />
            <DetailPanel title="Common applications" items={product.applications} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Continue browsing" title="Other products" />
        <div className="product-grid">
          {related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}
        </div>
      </Section>

      <Contact enquiryHref={enquiryHref} />
    </main>
  );
}

const DetailPanel = memo(function DetailPanel({ title, items }) {
  return (
    <article className="detail-panel">
      <h3>{title}</h3>
      <ul className="stagger">
        {items.map((item) => (
          <li key={item}><CheckIcon size={15} /> {item}</li>
        ))}
      </ul>
    </article>
  );
});

/* ========================================
   Contact
   ======================================== */
function ContactRow({ icon: RowIcon, label, value, href, external }) {
  return (
    <a
      className="contact-row"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="contact-icon"><RowIcon size={18} /></span>
      <span className="contact-text">
        <small>{label}</small>
        <span>{value}</span>
      </span>
    </a>
  );
}

function Contact({ enquiryHref }) {
  return (
    <Section id="contact" className="band-tint">
      <div className="contact-card">
        <div className="contact-details">
          <p className="eyebrow">Get in touch</p>
          <h2>Ready to place an enquiry?</h2>
          <p className="lead">
            Share your product requirement, size, quantity and destination. Our team will help with
            product details, packing and bulk supply options.
          </p>
          <div className="contact-rows stagger">
            {phones.map((phone) => (
              <ContactRow key={phone.tel} icon={PhoneIcon} label="Call" value={phone.display} href={`tel:${phone.tel}`} />
            ))}
            {emails.map((email) => (
              <ContactRow key={email} icon={MailIcon} label="Email" value={email} href={`mailto:${email}`} />
            ))}
            <ContactRow icon={GlobeIcon} label="Business hours" value={businessHours} href="#/contact" />
            <ContactRow
              icon={PinIcon}
              label="Address"
              value={address}
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              external
            />
          </div>
          <a className="btn btn-whatsapp btn-lg btn-block" href={enquiryHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> WhatsApp enquiry
          </a>
        </div>
        <div className="contact-map">
          <iframe
            title="Susee Agencies location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   Footer
   ======================================== */
const Footer = memo(function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={`${assets}susee-logo.svg`} alt="Susee Agencies" width="350" height="250" loading="lazy" />
          <p>
            Medical gauze and bandage manufacturer offering onsite services in Samsigapuram, Tamil Nadu.
          </p>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.route}><a href={`#/${item.route}`} onClick={rescrollIfCurrent}>{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Products</h2>
          <ul>
            {products.slice(0, 5).map((product) => (
              <li key={product.slug}><a href={`#/product/${product.slug}`}>{displayName(product.name)}</a></li>
            ))}
            <li><a href="#/products" onClick={rescrollIfCurrent}>View all products</a></li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            {phones.map((phone) => (
              <li key={phone.tel}><a href={`tel:${phone.tel}`}>{phone.display}</a></li>
            ))}
            {emails.map((email) => (
              <li key={email}><a href={`mailto:${email}`}>{email}</a></li>
            ))}
            <li>{businessHours}</li>
            <li className="footer-address">{address}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="shell">
          <span>&copy; Susee Agencies. All Rights Reserved.</span>
          {/* <span>Website Designed &amp; Developed by Karuppasamy M &amp; Karthickraja S | Contact: +91 93455 83758 | +91 93602 26758</span> */}
        </div>
      </div>
    </footer>
  );
});

/* ========================================
   Floating actions
   ======================================== */
function WhatsAppFAB({ href }) {
  return (
    <a className="whatsapp-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label="Send WhatsApp enquiry">
      <WhatsAppIcon size={24} />
      <span>Enquire now</span>
    </a>
  );
}

function ScrollToTop() {
  const isVisible = useScrolledPast(600);

  return (
    <button
      className={`scroll-top${isVisible ? ' visible' : ''}`}
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon size={20} />
    </button>
  );
}

/* ========================================
   Render
   ======================================== */
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
