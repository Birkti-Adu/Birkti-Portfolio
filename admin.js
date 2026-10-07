const defaultData = {
  portfolioName: 'Biruktawit Adugna Desalegn',
  professionalTitle: 'Software Engineer',
  heroTitle: 'Building responsive digital systems that solve real-world problems.',
  heroLead: 'I am Biruktawit Adugna Desalegn, a BSc Software Engineering graduate with a strong foundation in web development, ERP systems, and system design. I enjoy creating practical, user-friendly solutions that are both functional and impactful.',
  quote: '“I turn requirements into simple, reliable digital experiences.”',
  profileImage: 'image/photo_2026-10-07_11-04-52.jpg',
  location: 'Addis Ababa, Ethiopia',
  aboutHeading: 'A software engineer focused on practical solutions, user needs, and continuous growth.',
  storyOne: 'I am Biruktawit Adugna Desalegn, a motivated and detail-oriented Software Engineering graduate from Ethiopia. My academic and project work has built a strong foundation in web development, data management, system design, and responsive user experience.',
  storyTwo: 'I am passionate about creating digital solutions that are useful, clean, and easy to use. Through my projects and current role as an IT Officer at HDAMA, I have developed practical experience in website management, ERP support, user administration, and system operations. I enjoy solving real problems and improving how people interact with technology.',
  drivesList: 'Turning ideas and requirements into reliable digital solutions\nBuilding user-friendly systems that support real-world tasks\nCombining technical skill with responsibility, teamwork, and continuous learning',
  email: 'adubirkti9487@gmail.com',
  phone: '+251 941 341 367',
  telegram: 'https://t.me/birkti',
  whatsapp: 'https://wa.me/251912345678',
  instagram: 'https://instagram.com/birkti',
  address: 'Addis Ababa, Ethiopia',
  availability: 'Open for software engineering roles, internships, and freelance work',
  customSections: [
    {
      id: 'custom-1',
      title: 'Problem solving',
      content: 'I enjoy translating business needs into clear digital solutions that feel simple, useful, and reliable for real users.',
      color: 'gold'
    },
    {
      id: 'custom-2',
      title: 'Growth mindset',
      content: 'I stay curious, keep learning, and improve every project with practical feedback, technical discipline, and teamwork.',
      color: 'black'
    }
  ],
  projects: [
    {
      title: 'E-Learning Platform',
      year: '2025',
      category: 'Web App',
      description: 'A responsive online learning system for university students, focused on course delivery, user login, and educational content access.',
      points: ['Implemented secure user login and account access', 'Built course management and learning content flow', 'Used React.js, Node.js, and MongoDB']
    },
    {
      title: 'Hospital Management System',
      year: '2025',
      category: 'Healthcare System',
      description: 'A healthcare-focused system project that involved data collection, requirements gathering, analysis, and planning for software needs in hospital operations.',
      points: ['Collected and entered patient and hospital records accurately', 'Gathered stakeholder requirements and documented needs', 'Applied data analysis to support system development decisions']
    }
  ]
};

const STORAGE_KEY = 'birktiPortfolioAdminData';

const form = document.getElementById('portfolio-form');
const projectsList = document.getElementById('projectsList');
const customSectionsList = document.getElementById('customSectionsList');
const statusBox = document.getElementById('statusBox');
const pageMode = document.body.dataset.page || 'dashboard';

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultData,
      ...parsed,
      projects: parsed.projects || defaultData.projects,
      customSections: parsed.customSections || defaultData.customSections
    };
  } catch {
    return defaultData;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderProjects(projects) {
  if (!projectsList) return;

  projectsList.innerHTML = '';

  if (!projects.length) {
    projectsList.innerHTML = '<p>No projects yet. Add a new one to start.</p>';
    return;
  }

  projects.forEach((project, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'project-item';

    wrapper.innerHTML = `
      <div class="project-item-header">
        <h4>${project.title || 'Untitled project'}</h4>
        <button type="button" class="remove-project" data-index="${index}">Remove</button>
      </div>
      <div class="admin-grid">
        <div class="field-group">
          <label>Project title</label>
          <input type="text" data-project-index="${index}" data-field="title" value="${escapeHtml(project.title || '')}" />
        </div>
        <div class="field-group">
          <label>Year</label>
          <input type="text" data-project-index="${index}" data-field="year" value="${escapeHtml(project.year || '')}" />
        </div>
        <div class="field-group">
          <label>Category</label>
          <input type="text" data-project-index="${index}" data-field="category" value="${escapeHtml(project.category || '')}" />
        </div>
        <div class="field-group" style="grid-column: 1 / -1;">
          <label>Description</label>
          <textarea data-project-index="${index}" data-field="description">${escapeHtml(project.description || '')}</textarea>
        </div>
        <div class="field-group" style="grid-column: 1 / -1;">
          <label>Project points (one per line)</label>
          <textarea data-project-index="${index}" data-field="points">${escapeHtml((project.points || []).join('\n'))}</textarea>
        </div>
      </div>
    `;

    projectsList.appendChild(wrapper);
  });
}

function renderCustomSectionsList(sections) {
  if (!customSectionsList) return;

  customSectionsList.innerHTML = '';

  if (!sections.length) {
    customSectionsList.innerHTML = '<p>No custom sections yet. Add one below.</p>';
    return;
  }

  sections.forEach((section, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-section-item';
    wrapper.innerHTML = `
      <div class="custom-section-item-header">
        <h4>Section ${index + 1}</h4>
        <button type="button" class="remove-section" data-section-index="${index}">Delete</button>
      </div>
      <div class="field-group">
        <label>Section title</label>
        <input type="text" data-custom-section-index="${index}" data-field="title" value="${escapeHtml(section.title || '')}" />
      </div>
      <div class="field-group" style="margin-top: 0.8rem;">
        <label>Content</label>
        <textarea data-custom-section-index="${index}" data-field="content">${escapeHtml(section.content || '')}</textarea>
      </div>
      <div class="field-group" style="margin-top: 0.8rem;">
        <label>Color</label>
        <select data-custom-section-index="${index}" data-field="color">
          <option value="gold" ${section.color === 'gold' ? 'selected' : ''}>Gold</option>
          <option value="black" ${section.color === 'black' ? 'selected' : ''}>Black</option>
          <option value="white" ${section.color === 'white' ? 'selected' : ''}>White</option>
          <option value="bronze" ${section.color === 'bronze' ? 'selected' : ''}>Bronze</option>
        </select>
      </div>
      <div class="custom-section-actions">
        <button type="button" class="btn btn-primary btn-small update-custom-section" data-section-index="${index}">Edit & Update</button>
      </div>
    `;

    customSectionsList.appendChild(wrapper);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateProfileImagePreview(value) {
  const preview = document.getElementById('profileImagePreview');
  const source = value || 'image/photo_2026-10-07_11-04-52.jpg';

  if (preview) {
    preview.src = source;
    preview.style.display = 'block';
  }
}

function populateForm(data) {
  Object.entries(data).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (!el) return;

    if (Array.isArray(value)) {
      return;
    }

    el.value = value || '';
  });

  const imageField = document.getElementById('profileImage');
  if (imageField) {
    imageField.value = data.profileImage || 'image/photo_2026-10-07_11-04-52.jpg';
  }

  updateProfileImagePreview(data.profileImage || 'image/photo_2026-10-07_11-04-52.jpg');

  if (data.projects && projectsList) {
    renderProjects(data.projects);
  }

  if (data.customSections && customSectionsList) {
    renderCustomSectionsList(data.customSections);
  }
}

function collectProjectData() {
  const projects = [];
  const projectInputs = Array.from(document.querySelectorAll('[data-project-index]'));
  const groups = {};

  projectInputs.forEach((input) => {
    const index = input.dataset.projectIndex;
    const field = input.dataset.field;

    if (!groups[index]) groups[index] = {};
    groups[index][field] = input.value;
  });

  Object.keys(groups).forEach((index) => {
    const item = groups[index];
    const points = (item.points || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    projects.push({
      title: item.title || '',
      year: item.year || '',
      category: item.category || '',
      description: item.description || '',
      points
    });
  });

  return projects;
}

function collectCustomSectionsData() {
  const groups = {};
  const inputs = Array.from(document.querySelectorAll('[data-custom-section-index]'));

  inputs.forEach((input) => {
    const index = input.dataset.customSectionIndex;
    const field = input.dataset.field;
    if (!groups[index]) groups[index] = {};
    groups[index][field] = input.value;
  });

  return Object.keys(groups).map((index) => ({
    id: `custom-${index}`,
    title: groups[index].title || '',
    content: groups[index].content || '',
    color: groups[index].color || 'gold'
  }));
}

function collectFormData() {
  const data = {};

  if (!form) {
    const saved = loadData();
    data.projects = collectProjectData();
    data.customSections = collectCustomSectionsData();
    return { ...saved, ...data };
  }

  const fields = new FormData(form);
  fields.forEach((value, key) => {
    data[key] = value;
  });

  const profileImageField = document.getElementById('profileImage');
  if (profileImageField) {
    data.profileImage = profileImageField.value || 'image/photo_2026-10-07_11-04-52.jpg';
  }

  data.projects = collectProjectData();
  data.customSections = collectCustomSectionsData();
  return data;
}

function updateStatus(message, isError = false) {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.style.color = isError ? '#9c700f' : '#9c700f';
}

function applyDataToPortfolio(data) {
  const contentMap = {
    'portfolioName': '.profile-panel h2',
    'professionalTitle': '.eyebrow',
    'heroTitle': '.hero-copy h1',
    'heroLead': '.hero-copy .lead',
    'quote': '.quote',
    'location': '.info-box div:nth-child(2) strong',
    'aboutHeading': '.page-hero h1',
    'storyOne': '.story-card p:first-of-type',
    'storyTwo': '.story-card p:last-of-type',
    'drivesList': '.story-card.accent-card .check-list',
    'email': '.footer-column a[href^="mailto:"]',
    'phone': '.footer-column a[href^="tel:"]',
    'telegram': '.footer-column a[aria-label="Telegram"]',
    'whatsapp': '.footer-column a[aria-label="WhatsApp"]',
    'instagram': '.footer-column a[aria-label="Instagram"]',
    'address': '.footer-column:last-of-type p',
    'availability': '.contact-item:last-of-type p'
  };

  Object.entries(contentMap).forEach(([key, selector]) => {
    const el = document.querySelector(selector);
    if (!el) return;

    if (key === 'email') {
      el.href = `mailto:${data.email}`;
      el.setAttribute('aria-label', 'Email');
      return;
    }

    if (key === 'phone') {
      el.href = `tel:${data.phone.replace(/\s+/g, '')}`;
      el.textContent = data.phone;
      return;
    }

    if (key === 'telegram') {
      el.href = data.telegram;
      return;
    }

    if (key === 'whatsapp') {
      el.href = data.whatsapp;
      return;
    }

    if (key === 'instagram') {
      el.href = data.instagram;
      return;
    }

    if (key === 'drivesList') {
      const items = (data.drivesList || '').split('\n').map((line) => line.trim()).filter(Boolean);
      el.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
      return;
    }

    el.textContent = data[key] || '';
  });

  const heroName = document.querySelector('.profile-panel h2');
  if (heroName) heroName.textContent = data.portfolioName || 'Biruktawit Adugna Desalegn';

  const avatarImage = document.querySelector('.avatar img');
  if (avatarImage) {
    avatarImage.src = data.profileImage || 'image/photo_2026-10-07_11-04-52.jpg';
    avatarImage.alt = `${data.portfolioName || 'Biruktawit Adugna Desalegn'} portrait`;
  }

  const miniStats = document.querySelector('.mini-stats');
  if (miniStats) {
    miniStats.innerHTML = `
      <li><strong>3+</strong><span>Years in IT</span></li>
      <li><strong>5+</strong><span>Projects built</span></li>
      <li><strong>100%</strong><span>Problem-focused</span></li>
    `;
  }

  const pageTitle = document.title;
  if (pageTitle.includes('Birkti')) {
    document.title = `${data.portfolioName || 'Birkti'} | Portfolio`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!form && !projectsList && !customSectionsList && !statusBox) {
    return;
  }

  const data = loadData();
  populateForm(data);

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = collectFormData();
      saveData({ ...loadData(), ...data });
      applyDataToPortfolio({ ...loadData(), ...data });
      updateStatus('Portfolio content saved successfully.');
    });
  }

  const profileImageFile = document.getElementById('profileImageFile');
  if (profileImageFile) {
    profileImageFile.addEventListener('change', (event) => {
      const [file] = event.target.files;
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageField = document.getElementById('profileImage');
        if (imageField) {
          imageField.value = reader.result;
        }
        updateProfileImagePreview(reader.result);
        updateStatus('Image selected and ready to save.');
      };
      reader.readAsDataURL(file);
    });
  }

  const deleteProfileImageBtn = document.getElementById('deleteProfileImage');
  if (deleteProfileImageBtn) {
    deleteProfileImageBtn.addEventListener('click', () => {
      const imageField = document.getElementById('profileImage');
      if (imageField) {
        imageField.value = '';
      }
      if (profileImageFile) {
        profileImageFile.value = '';
      }
      updateProfileImagePreview('');
      updateStatus('Profile image removed. Save to update the portfolio.');
    });
  }

  const previewBtn = document.getElementById('previewBtn');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      const data = collectFormData();
      saveData({ ...loadData(), ...data });
      applyDataToPortfolio({ ...loadData(), ...data });
      window.open('index.html', '_blank');
    });
  }

  const resetBtn = document.getElementById('resetData');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      populateForm(defaultData);
      updateStatus('Admin data reset to the default portfolio content.');
    });
  }

  const addCustomSectionBtn = document.getElementById('addCustomSection');
  if (addCustomSectionBtn) {
    addCustomSectionBtn.addEventListener('click', () => {
      const current = loadData();
      const next = [...(current.customSections || []), {
        id: `custom-${Date.now()}`,
        title: 'New section',
        content: 'Add a brief paragraph here.',
        color: 'gold'
      }];
      current.customSections = next;
      saveData(current);
      populateForm(current);
      updateStatus('Custom section added.');
    });
  }

  const addProjectBtn = document.getElementById('addProject');
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      const current = loadData();
      const next = [...(current.projects || []), { title: 'New Project', year: '2026', category: 'Web Project', description: '', points: ['Add a project highlight'] }];
      current.projects = next;
      saveData(current);
      populateForm(current);
      updateStatus('New project added.');
    });
  }

  if (customSectionsList) {
    customSectionsList.addEventListener('click', (event) => {
      const updateButton = event.target.closest('.update-custom-section');
      if (updateButton) {
        const current = loadData();
        current.customSections = collectCustomSectionsData();
        saveData(current);
        updateStatus('Custom section updated.');
        return;
      }

      const removeButton = event.target.closest('.remove-section');
      if (!removeButton) return;

      const index = Number(removeButton.dataset.sectionIndex);
      const current = loadData();
      current.customSections.splice(index, 1);
      saveData(current);
      populateForm(current);
      updateStatus('Custom section removed.');
    });
  }

  if (projectsList) {
    projectsList.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.remove-project');
      if (!removeButton) return;

      const index = Number(removeButton.dataset.index);
      const current = loadData();
      current.projects.splice(index, 1);
      saveData(current);
      populateForm(current);
      updateStatus('Project removed.');
    });
  }
});
