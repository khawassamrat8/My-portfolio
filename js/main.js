/**
 * Samrat Portfolio - Interactive Logic & UI Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initPortfolioFilters();
  initProjectModal();
  initYear();
});

/* ---------------------------------------------------------
   1. Navbar Scroll Effect & Active Link Highlight
   --------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class for blur & shrink
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link on scroll
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ---------------------------------------------------------
   2. Mobile Drawer Navigation
   --------------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars-staggered"></i>';
  });

  // Close mobile menu when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    });
  });
}

/* ---------------------------------------------------------
   3. Scroll Reveal Animations (IntersectionObserver)
   --------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   4. Portfolio Filtering (All, Design, Marketing, Bakery)
   --------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ---------------------------------------------------------
   5. Interactive Project Lightbox Modal
   --------------------------------------------------------- */
const projectDetailsData = {
  "1": {
    category: "Graphic Design & Branding",
    title: "Aether Roasters - Complete Visual Identity & Packaging Suite",
    img: "assets/images/graphic_design.jpg",
    desc: "A comprehensive brand identity conceived for an upscale specialty coffee roastery. The visual language features minimalist typography, luxury bronze-foil stamped business cards, matte black packaging, and custom iconography that communicates craftsmanship and purity.",
    tags: ["Brand Identity", "Figma", "Photoshop", "Typography", "Print Production"]
  },
  "2": {
    category: "Bakery & Barista Arts",
    title: "Artisan Swan Latte Art & Slow-Fermented Pastry Craft",
    img: "assets/images/bakery_coffee.jpg",
    desc: "Daily morning ritual combining third-wave espresso extraction with silken microfoam swan latte art. Showcased alongside 72-hour cold-fermented French laminated croissants and traditional sourdough bread crafted with unbleached organic flour.",
    tags: ["Swan Free-Pour", "Microfoam Texturing", "Sourdough Lamination", "Third Wave Coffee"]
  },
  "3": {
    category: "Digital Marketing & Performance Growth",
    title: "Omnichannel Social Media Growth & High-ROAS Paid Funnel",
    img: "assets/images/digital_marketing.jpg",
    desc: "A data-driven digital marketing initiative that scaled an e-commerce brand's online presence to 125K+ organic followers while achieving a 4.2x Return on Ad Spend (ROAS) via targeted Meta and Instagram Reels ad funnels.",
    tags: ["Meta Ads", "Audience Retargeting", "Viral Reels Strategy", "Conversion Rate Optimization"]
  },
  "4": {
    category: "Graphic Design & Packaging",
    title: "Origin Coffee & Bakery - Sustainable Kraft Packaging Suite",
    img: "assets/images/packaging_branding.jpg",
    desc: "Eco-friendly, biodegradable kraft pouch packaging designed with embossed gold-leaf typography and custom botanical line illustrations for specialty single-origin Ethiopian coffee beans and artisan sourdough loaves.",
    tags: ["Sustainable Packaging", "Kraft Paper", "Gold Foil Stamping", "Illustrator"]
  },
  "5": {
    category: "Specialty Barista Brewing",
    title: "Manual V60 Pour-Over & Single Origin Extraction",
    img: "assets/images/specialty_pour_over.jpg",
    desc: "Mastery of manual brewing utilizing copper gooseneck kettles, precise water chemistry (92°C at 1:16 ratio), and slow conical filtration to extract the nuanced floral, citrus, and blueberry flavor notes of Ethiopian Yirgacheffe coffee beans.",
    tags: ["Hario V60", "Gooseneck Pouring", "Specialty Coffee Dial-in", "Sensory Analysis"]
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = projectDetailsData[id];
      if (!data) return;

      modalImg.src = data.img;
      modalImg.alt = data.title;
      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      // Populate tags
      modalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scroll behind modal
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------------------------------------------------------
   6. Contact Form Submission -> Direct WhatsApp Opener
   --------------------------------------------------------- */
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const contact = document.getElementById('userContact').value.trim();
  const interest = document.getElementById('interestArea').value;
  const message = document.getElementById('userMessage').value.trim();

  // Construct formatted WhatsApp message
  const waText = `Namaste Samrat!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Contact:* ${encodeURIComponent(contact)}%0A*Interested In:* ${encodeURIComponent(interest)}%0A*Message:* ${encodeURIComponent(message)}`;
  const waUrl = `https://wa.me/9779800000000?text=${waText}`;

  // Show inline success message
  const alertBox = document.getElementById('formAlert');
  alertBox.className = 'form-alert success';
  alertBox.innerHTML = `<strong>Thank you, ${name}!</strong> Opening WhatsApp to send your message directly to Samrat...`;

  showToast('Opening WhatsApp with your message...');

  // Open WhatsApp in a new window/tab
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 800);
}

/* ---------------------------------------------------------
   7. Copy Contact Info with Toast Notification
   --------------------------------------------------------- */
function copyContact(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage || 'Copied to clipboard!');
  }).catch(() => {
    // Fallback
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMessage || 'Copied to clipboard!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ---------------------------------------------------------
   8. Dynamic Footer Year
   --------------------------------------------------------- */
function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
