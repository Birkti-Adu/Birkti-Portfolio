const portfolioDefaults = {
  portfolioName: "Biruktawit Adugna Desalegn",
  professionalTitle: "Software Engineer",
  heroTitle: "Building responsive digital systems that solve real-world problems.",
  heroLead:
    "I am Biruktawit Adugna Desalegn, a BSc Software Engineering graduate with a strong foundation in web development, ERP systems, and system design. I enjoy creating practical, user-friendly solutions that are both functional and impactful.",
  quote: "“I turn requirements into simple, reliable digital experiences.”",
  profileImage: "image/photo_2026-10-07_11-04-52.jpg",
  location: "Addis Ababa, Ethiopia",
  aboutHeading: "A software engineer focused on practical solutions, user needs, and continuous growth.",
  storyOne:
    "I am Biruktawit Adugna Desalegn, a motivated and detail-oriented Software Engineering graduate from Ethiopia. My academic and project work has built a strong foundation in web development, data management, system design, and responsive user experience.",
  storyTwo:
    "I am passionate about creating digital solutions that are useful, clean, and easy to use. Through my projects and current role as an IT Officer at HDAMA, I have developed practical experience in website management, ERP support, user administration, and system operations. I enjoy solving real problems and improving how people interact with technology.",
  drivesList:
    "Turning ideas and requirements into reliable digital solutions\nBuilding user-friendly systems that support real-world tasks\nCombining technical skill with responsibility, teamwork, and continuous learning",
  email: "adubirkti9487@gmail.com",
  phone: "+251 941 341 367",
  telegram: "https://t.me/birkti",
  whatsapp: "https://wa.me/251912345678",
  instagram: "https://instagram.com/birkti",
  address: "Addis Ababa, Ethiopia",
  availability: "Open for software engineering roles, internships, and freelance work",
  customSections: [
    {
      id: "section-1",
      title: "Problem solving",
      content: "I enjoy translating business needs into clear digital solutions that feel simple, useful, and reliable for real users.",
      color: "gold"
    },
    {
      id: "section-2",
      title: "Growth mindset",
      content: "I stay curious, keep learning, and improve every project with practical feedback, technical discipline, and teamwork.",
      color: "black"
    }
  ],
  projects: [
    {
      title: "E-Learning Platform",
      year: "2025",
      category: "Web App",
      description:
        "A responsive online learning system for university students, focused on course delivery, user login, and educational content access.",
      points: [
        "Implemented secure user login and account access",
        "Built course management and learning content flow",
        "Used React.js, Node.js, and MongoDB"
      ]
    },
    {
      title: "Hospital Management System",
      year: "2025",
      category: "Healthcare System",
      description:
        "A healthcare-focused system project that involved data collection, requirements gathering, analysis, and planning for software needs in hospital operations.",
      points: [
        "Collected and entered patient and hospital records accurately",
        "Gathered stakeholder requirements and documented needs",
        "Applied data analysis to support system development decisions"
      ]
    },
    {
      title: "The Brokers ECommerce",
      year: "2024",
      category: "E-Commerce",
      description:
        "A marketplace platform designed to connect house and car sellers with prospective buyers, with features that support browsing, search, and communication.",
      points: [
        "Built user authentication and product listing features",
        "Implemented search filters and contact form workflows",
        "Used HTML, CSS, JavaScript, PHP, and MySQL"
      ]
    },
    {
      title: "Personal Portfolio Website",
      year: "2024",
      category: "Portfolio",
      description:
        "A personal portfolio website created to showcase resume details, technical skills, and project work with a modern UI.",
      points: [
        "Designed and built a responsive portfolio experience",
        "Structured content for strong personal branding",
        "Used HTML, CSS, and JavaScript"
      ]
    }
  ]
};

const STORAGE_KEY = "birktiPortfolioAdminData";

function readPortfolioData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioDefaults));
    return portfolioDefaults;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...portfolioDefaults,
      ...parsed,
      projects: parsed.projects || portfolioDefaults.projects,
      customSections: parsed.customSections || portfolioDefaults.customSections
    };
  } catch (error) {
    return portfolioDefaults;
  }
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) {
    el.textContent = value || "";
  }
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el) {
    el.innerHTML = value || "";
  }
}

function renderAboutPage(data) {
  setText(".page-hero h1", data.aboutHeading);
  const storyCards = document.querySelectorAll(".story-card");
  if (storyCards.length >= 1) {
    const card = storyCards[0];
    const paragraphs = card.querySelectorAll("p");
    if (paragraphs[0]) paragraphs[0].textContent = data.storyOne || "";
    if (paragraphs[1]) paragraphs[1].textContent = data.storyTwo || "";
  }

  const motivationCard = document.querySelector(".story-card.accent-card .check-list");
  if (motivationCard) {
    const items = (data.drivesList || "").split("\n").map((line) => line.trim()).filter(Boolean);
    motivationCard.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }
}

function renderHomePage(data) {
  setText(".hero-copy .eyebrow", data.professionalTitle || "Software Engineer");
  setText(".hero-copy h1", data.heroTitle);
  setText(".hero-copy .lead", data.heroLead);
  setText(".profile-panel h2", data.portfolioName);
  setText(".quote", data.quote);
  setText(".info-box div:nth-child(1) strong", "Web Development & ERP Systems");
  setText(".info-box div:nth-child(2) strong", data.location);

  const profileImage = data.profileImage || 'image/photo_2026-10-07_11-04-52.jpg';
  const avatarImage = document.querySelector('.avatar img');
  if (avatarImage) {
    avatarImage.src = profileImage;
    avatarImage.alt = `${data.portfolioName || 'Biruktawit Adugna Desalegn'} portrait`;
  }
}

function renderProjectPage(data) {
  const grid = document.querySelector(".project-grid");
  if (!grid) return;

  const projects = Array.isArray(data.projects) && data.projects.length ? data.projects : portfolioDefaults.projects;
  const cards = projects.map((project) => `
    <article class="project-card">
      <div class="project-meta">
        <span>${project.year || "2026"}</span>
        <span>${project.category || "Project"}</span>
      </div>
      <h3>${project.title || "Project"}</h3>
      <p>${project.description || ""}</p>
      <ul>
        ${(project.points || []).map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </article>
  `).join("");

  grid.innerHTML = cards;
}

function renderCustomSections() {
  const mount = document.getElementById("custom-sections");
  if (!mount) return;

  const data = readPortfolioData();
  const sections = Array.isArray(data.customSections) ? data.customSections : [];

  if (!sections.length) {
    mount.innerHTML = "";
    return;
  }

  const paletteMap = {
    gold: "custom-section-gold",
    black: "custom-section-dark",
    white: "custom-section-light",
    bronze: "custom-section-bronze"
  };

  mount.innerHTML = sections
    .map((section) => {
      const safeTitle = section.title || "Custom section";
      const safeContent = (section.content || "").replace(/\n/g, "<br>");
      const colorClass = paletteMap[section.color] || "custom-section-gold";

      return `
        <article class="custom-section ${colorClass}">
          <h3>${safeTitle}</h3>
          <p>${safeContent}</p>
        </article>
      `;
    })
    .join("");
}

function renderContactPage(data) {
  const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
  if (emailLink) {
    emailLink.href = `mailto:${data.email}`;
    emailLink.textContent = data.email;
  }

  const phoneLink = document.querySelector('.contact-item a[href^="tel:"]');
  if (phoneLink) {
    phoneLink.href = `tel:${(data.phone || "").replace(/\s+/g, "")}`;
    phoneLink.textContent = data.phone || "";
  }

  const locationText = document.querySelector('.contact-item:nth-of-type(3) p');
  if (locationText) {
    locationText.textContent = data.address || "Addis Ababa, Ethiopia";
  }

  const availabilityText = document.querySelector('.contact-item:last-of-type p');
  if (availabilityText) {
    availabilityText.textContent = data.availability || "";
  }

  const footerEmail = document.querySelector('.footer-column a[href^="mailto:"]');
  if (footerEmail) {
    footerEmail.href = `mailto:${data.email}`;
  }

  const footerPhone = document.querySelector('.footer-column a[href^="tel:"]');
  if (footerPhone) {
    footerPhone.href = `tel:${(data.phone || "").replace(/\s+/g, "")}`;
  }

  const telegram = document.querySelector('.footer-column a[aria-label="Telegram"]');
  if (telegram) telegram.href = data.telegram || "https://t.me/birkti";

  const whatsapp = document.querySelector('.footer-column a[aria-label="WhatsApp"]');
  if (whatsapp) whatsapp.href = data.whatsapp || "https://wa.me/251912345678";

  const instagram = document.querySelector('.footer-column a[aria-label="Instagram"]');
  if (instagram) instagram.href = data.instagram || "https://instagram.com/birkti";

  const addressText = document.querySelector('.footer-column:last-of-type p');
  if (addressText) addressText.textContent = data.address || "Addis Ababa, Ethiopia";
}

function renderGlobalFooter(data) {
  const footerEmail = document.querySelector('.footer-column a[href^="mailto:"]');
  if (footerEmail) footerEmail.href = `mailto:${data.email}`;

  const footerPhone = document.querySelector('.footer-column a[href^="tel:"]');
  if (footerPhone) footerPhone.href = `tel:${(data.phone || "").replace(/\s+/g, "")}`;
}

function renderPortfolioPage() {
  const data = readPortfolioData();

  if (document.querySelector(".hero-copy")) {
    renderHomePage(data);
  }

  if (document.querySelector(".story-card") || document.querySelector(".page-hero h1")?.textContent?.includes("A software engineer")) {
    renderAboutPage(data);
  }

  if (document.querySelector(".project-grid")) {
    renderProjectPage(data);
  }

  renderCustomSections();

  if (document.querySelector("#contactForm") || document.querySelector(".contact-card")) {
    renderContactPage(data);
  }

  renderGlobalFooter(data);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolioPage();

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      const originalText = button.textContent;
      button.textContent = "Message Sent";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 2000);
    });
  }
});
