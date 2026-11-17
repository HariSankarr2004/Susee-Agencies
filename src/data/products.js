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
    sizes: ['100cm to 120cm', '10mtr to 40mtr'],
    features: ['100% pure cotton yarn', 'Superior absorbency', 'Breathable woven fabric', 'Soft contact surface'],
    applications: ['Medical dressings', 'Wound care products', 'Clinical supplies'],
    specifications: [
      { label: 'Material', value: '100% Pure Woven Cotton' },
      { label: 'Thread Count', value: '19 x 15 threads/inch² (or BP Type 13 / 17)' },
      { label: 'Standard Widths', value: '100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 40 meters' },
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
    sizes: ['100cm to 120cm', '10mtr to 40mtr'],
    features: ['High-quality woven cotton', 'Soft and breathable', 'Suitable for repeated wrapping', 'Bulk roll format'],
    applications: ['Medical bandages', 'Fracture support', 'Surgical dressing support', 'General wound care'],
    specifications: [
      { label: 'Material', value: '100% Cotton Woven Fabric' },
      { label: 'Weave Type', value: 'Plain weave with selvage edge support' },
      { label: 'Standard Widths', value: '100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 40 meters' },
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
  /* Products unavailable for supply are kept commented out until confirmed.
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
  */
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
    slug: 'c-arm-cover',
    name: 'C-Arm Cover',
    summary: 'Clear disposable protective cover for C-arm imaging equipment.',
    description:
      'C-Arm Cover is a clear, flexible protective cover designed to fit the imaging head of a C-arm unit. Its lightweight drape helps keep the equipment covered during clinical procedures. Contact us for sizing and packing details.',
    sizes: ['Available on enquiry', 'Custom fit options on request'],
    features: ['Clear flexible film', 'Protective equipment barrier', 'Designed for C-arm imaging heads', 'Disposable format'],
    applications: ['C-arm imaging equipment', 'Procedure rooms', 'Hospital and clinic supply'],
    specifications: [
      { label: 'Product type', value: 'Disposable C-arm equipment cover' },
      { label: 'Material', value: 'Transparent flexible plastic film' },
      { label: 'Fit', value: 'C-arm imaging head; confirm dimensions when ordering' },
      { label: 'Size', value: 'Available on enquiry' },
      { label: 'Packaging', value: 'Contact us for available pack quantities' }
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
  'c-arm-cover': 'Hospital Wear & Disposables',
  'dialysis-kit': 'Hospital Wear & Disposables',
};


export { products, categories, categoryBySlug };
