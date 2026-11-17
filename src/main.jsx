import React, { useEffect, useMemo, useState, useRef, memo } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { products, categories, categoryBySlug } from './data/products.js';

const assets = '/assets/';

// Always start a fresh page load at the top instead of restoring an old
// browser scroll position. In-page navigation still scrolls normally.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Each product's photos live in public/assets/products/<slug>/ as 1.jpg, 2.jpg, 3.jpg
// Every product has exactly 3 photos in jpg format.
const navItems = [
  { route: 'products', label: 'Products' },
  { route: 'about', label: 'About' },
  { route: 'supply', label: 'Our Reach' },
  { route: 'government', label: 'Services' },
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
const address = '8/162, Chatrapatti - Srivilliputhur Rd, Sankarapandiapuram, Tamil Nadu 626102';
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
        <span>From Sankarapandiapuram to all across Tamil Nadu</span>
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
      <SupplySection />
      <GovernmentSection />
      <QualitySection />
      <FaqSection />
      <Contact enquiryHref={enquiryHref} />
    </main>
  );
}

function Hero() {
 return <section className="hero" id="home"><div className="shell hero-editorial">
 <div className="hero-kicker"><span>MEDICAL TEXTILES & ESSENTIALS</span><span className="supply-status">SUPPLY ACROSS TAMIL NADU</span></div>
 <div className="hero-title-row"><h1>Small essentials.<br /><em>Extraordinary care.</em></h1><div className="hero-intro"><p>From the first layer of gauze to the final wrap. Medical essentials, personal service and supply to every corner of Tamil Nadu.</p><a className="text-link" href="#/products">Discover the collection <ArrowRightIcon /></a></div></div>
 <div className="hero-scene"><img src={assets+'susee-gauze-hero.png'} alt="Soft folds of medical gauze against a dark background" width="1146" height="640" fetchPriority="high" /><div className="scene-caption"><span>THE EVERYDAY FOUNDATION OF CARE</span><p>Woven with purpose.</p></div></div>
 <div className="hero-footnote"><span>Gauze & bandages</span><span>Surgical cotton</span><span>Hospital wear & disposables</span><a href="#/contact">Discuss your requirements <ArrowRightIcon size={16} /></a></div>
 </div></section>;
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
      <div className="product-image"><span className="product-number">{String(products.indexOf(product) + 1).padStart(2, '0')}</span>
        <img src={`${assets}${product.image}?v=15`} alt="" width="1024" height="1024" loading="lazy" decoding="async" />
      </div>
      <div className="product-body">
        <span className="product-category">{categoryBySlug[product.slug]}</span>
        <h3>{displayName(product.name)}</h3>
        <p className="product-summary">{product.summary}</p>
        <span className="product-link">Explore product <ArrowRightIcon size={18} /></span>
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
          eyebrow="01 / The collection"
          title="Essentials, thoughtfully selected."
          lead="Find the right materials for your everyday healthcare requirements. Explore sizes, specifications and product photographs."
        />
        <div className="catalogue-tools"><a className="btn btn-outline catalogue-download" href="/catalogue/susee-agencies-catalogue.pdf" download>Download catalogue <span aria-hidden="true">&#8595;</span><small>PDF</small></a><div className="search-box" role="search">
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

      </div>
      <div className="catalogue-layout"><aside className="catalogue-sidebar"><p className="catalogue-label">BROWSE BY CATEGORY</p><div className="filter-row" role="group" aria-label="Filter products by category">
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

      <div className="catalogue-help"><p>A particular size or quantity?</p><a href="#/contact">Talk to our team <ArrowRightIcon size={16} /></a></div></aside><div className="catalogue-results"><p className="catalogue-count" aria-live="polite">
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
      </div></div>
    </Section>
  );
}

/* ========================================
   About
   ======================================== */
function AboutSection() {
 return <Section id="about" className="story-section"><div className="story-layout">
 <div className="story-image"><img src={assets+'products/bandage-cloth/1.jpg'} alt="Woven bandage cloth supplied by Susee Agencies" loading="lazy" /><span>ROOTED IN TAMIL NADU</span></div>
 <div className="story-copy"><p className="eyebrow">02 / Our story</p><h2>Behind every wrap,<br /><em>a human connection.</em></h2><p>Susee Agencies brings medical gauze, bandage manufacturing and onsite services together in Sankarapandiapuram, Tamil Nadu.</p><p>Whether you are sourcing for a hospital, stocking a clinic or planning a trade order, a conversation with our team is the starting point. Tell us what you need. We will help you explore the available products, sizes and packing options.</p><a className="text-link" href="#/contact">Meet your supply partner <ArrowRightIcon /></a></div>
 </div></Section>;
}

function SupplySection() {
  return (
    <Section id="supply" className="supply-section">
      <div className="supply-heading">
        <p className="eyebrow">OUR HOME. OUR REACH.</p>
        <span className="supply-caption">SUSEE AGENCIES / STATEWIDE SUPPLY</span>
      </div>
      <div className="supply-layout">
        <div className="supply-copy">
          <h2>Rooted here.<br /><em>Reaching everywhere.</em></h2>
          <p>We supply medical essentials to all locations across Tamil Nadu. From city hospitals to neighbourhood clinics and trade partners, tell us where you need your order.</p>
          <a className="btn supply-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Enquire about supply <ArrowRightIcon size={18} /></a>
        </div>
        <div className="supply-destination">
          <span className="destination-label">WHERE WE SUPPLY</span>
          <strong>Tamil Nadu<span>Every city. Every town.</span></strong>
          <p>We supply across Tamil Nadu.</p>
          <div className="destination-rule"><PinIcon size={18} /><span>Based in Sankarapandiapuram<br />Serving the entire state</span></div>
        </div>
      </div>
      <div className="supply-cities"><span>Chennai</span><span>Coimbatore</span><span>Madurai</span><span>Tiruchirappalli</span><span>Salem</span><span>Tirunelveli</span><span>& every location in Tamil Nadu</span></div>
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
 return <Section id="government" className="service-section"><div className="service-heading"><SectionHeading eyebrow="03 / Made for your requirements" title="A simple path from enquiry to essentials." /><a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Start a conversation <ArrowRightIcon /></a></div>
 <div className="service-steps">{[
 ['01','Choose your essentials','Browse gauze, bandages, cotton and disposable products. Open any product to explore its sizes and specifications.'],
 ['02','Tell us the details','Share your required quantity, preferred sizes, packing and delivery location with our team.'],
 ['03','Supply across Tamil Nadu','We supply to all locations in Tamil Nadu. Discuss availability and delivery arrangements directly with our team.']
 ].map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
 <div className="hours-line"><span>Visit us in Sankarapandiapuram</span><span>{businessHours}</span><a href="#/contact">Get in touch <ArrowRightIcon size={16} /></a></div></Section>;
}

/* ========================================
   Quality
   ======================================== */
const qualityPoints = [
  { icon: ShieldIcon, title: 'Know your materials', text: 'Review material, size and packing information before discussing your order.' },
  { icon: TruckIcon, title: 'Find your fit', text: 'Discuss the bandage widths and roll lengths suited to your requirements.' },
  { icon: TagIcon, title: 'Speak to a person', text: 'Connect directly with our team for product and onsite service enquiries.' },
  { icon: GlobeIcon, title: 'Stay connected', text: 'Reach our Tamil Nadu team by phone, email or WhatsApp during business hours.' },
];

function QualitySection() {
  return (
    <Section id="quality" className="band-dark">
      <div className="quality-grid">
        <SectionHeading eyebrow="04 / The Susee approach" title="The details make the difference." />
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
  { question: 'Do you supply across Tamil Nadu?', answer: 'Yes. We supply to all locations across Tamil Nadu. Share your product requirements, quantity and delivery location with our team to discuss your order.' },
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
      '8/162, Chatrapatti - Srivilliputhur Rd, Sankarapandiapuram, Tamil Nadu 626102.',
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
        <SectionHeading eyebrow="Buyer information" title="A little clarity, before we begin." />
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

function QuickEnquiry() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  function submitEnquiry(event) {
    event.preventDefault();
    if (!product || !quantity.trim() || !city.trim()) {
      setError('Please enter a product, quantity and delivery city.');
      return;
    }
    setError('');
    const message = [
      'Hello Susee Agencies, I would like to enquire about:',
      'Product: ' + product,
      'Quantity: ' + quantity.trim(),
      'Delivery city: ' + city.trim() + ', Tamil Nadu',
      'Please share availability, pricing and delivery details.'
    ].join('\n');
    window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="quick-enquiry" onSubmit={submitEnquiry} aria-labelledby="enquiry-title">
      <p className="eyebrow">A FEW DETAILS. A PERSONAL RESPONSE.</p>
      <h3 id="enquiry-title">Quick enquiry</h3>
      <p>Tell us what you need and where to supply it.</p>
      <label htmlFor="enquiry-product">Product</label>
      <select id="enquiry-product" required value={product} onChange={event => setProduct(event.target.value)}>
        <option value="" disabled>Select a product</option>
        {products.map(item => <option key={item.slug} value={item.name}>{item.name}</option>)}
        <option value="Multiple products / general enquiry">Multiple products / general enquiry</option>
      </select>
      <div className="enquiry-fields">
        <div><label htmlFor="enquiry-quantity">Quantity &amp; unit</label><input id="enquiry-quantity" required maxLength={100} placeholder="e.g. 100 rolls" value={quantity} onChange={event => setQuantity(event.target.value)} /></div>
        <div><label htmlFor="enquiry-city">Delivery city / town</label><input id="enquiry-city" required maxLength={100} autoComplete="address-level2" placeholder="e.g. Madurai" value={city} onChange={event => setCity(event.target.value)} /></div>
      </div>
      {error && <p className="enquiry-error" role="alert">{error}</p>}
      <button type="submit" className="btn btn-primary btn-block"><WhatsAppIcon /> Continue on WhatsApp</button>
      <p className="enquiry-note">Your enquiry opens in WhatsApp. Review it and tap Send to contact our team.</p>
    </form>
  );
}

function Contact({ enquiryHref }) {
  return (
    <Section id="contact" className="band-tint">
      <div className="contact-card">
        <div className="contact-details">
          <p className="eyebrow">Get in touch</p>
          <h2>Your next order starts here.</h2>
          <p className="lead">
            Share your product requirement, size, quantity and destination. Our team will help with
            product details, packing and supply to any location across Tamil Nadu.
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
        <div className="contact-aside"><QuickEnquiry /><div className="contact-map">
          <iframe
            title="Susee Agencies location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div></div>
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
          <img src={`${assets}susee-logo-light.svg`} alt="Susee Agencies" width="590" height="120" loading="lazy" />
          <p>
            Medical gauze and bandage manufacturer based in Sankarapandiapuram. Supplying medical essentials across Tamil Nadu, with onsite services available by enquiry.
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
            <li><a href="/catalogue/susee-agencies-catalogue.pdf" download>Download catalogue (PDF)</a></li>
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
