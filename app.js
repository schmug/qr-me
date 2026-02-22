// ============================================================
// QR Me — app.js
// ============================================================

// --- Field Registry -----------------------------------------------------------

const FIELD_REGISTRY = {
  // Core fields
  firstName:  { label: 'First Name',         category: 'personal',     inputType: 'text',     placeholder: 'John',                vcardProp: null },
  lastName:   { label: 'Last Name',          category: 'personal',     inputType: 'text',     placeholder: 'Doe',                 vcardProp: null },
  prefix:     { label: 'Prefix / Title',     category: 'personal',     inputType: 'text',     placeholder: 'Mr., Dr., etc.',      vcardProp: null },
  email:      { label: 'Email',              category: 'contact',      inputType: 'email',    placeholder: 'john@example.com',    vcardProp: 'EMAIL;TYPE=INTERNET' },
  phone:      { label: 'Phone (Cell)',       category: 'contact',      inputType: 'tel',      placeholder: '+1 555-123-4567',     vcardProp: 'TEL;TYPE=CELL' },
  workPhone:  { label: 'Phone (Work)',       category: 'contact',      inputType: 'tel',      placeholder: '+1 555-987-6543',     vcardProp: 'TEL;TYPE=WORK' },
  website:    { label: 'Website',            category: 'contact',      inputType: 'url',      placeholder: 'https://example.com', vcardProp: 'URL' },
  org:        { label: 'Organization',       category: 'organization', inputType: 'text',     placeholder: 'Acme Corp',           vcardProp: 'ORG' },
  title:      { label: 'Job Title',          category: 'organization', inputType: 'text',     placeholder: 'Software Engineer',   vcardProp: 'TITLE' },
  street:     { label: 'Street',             category: 'address',      inputType: 'text',     placeholder: '123 Main St',         vcardProp: null },
  city:       { label: 'City',               category: 'address',      inputType: 'text',     placeholder: 'Raleigh',             vcardProp: null },
  state:      { label: 'State',              category: 'address',      inputType: 'text',     placeholder: 'NC',                  vcardProp: null },
  zip:        { label: 'Zip Code',           category: 'address',      inputType: 'text',     placeholder: '27601',               vcardProp: null },
  country:    { label: 'Country',            category: 'address',      inputType: 'text',     placeholder: 'USA',                 vcardProp: null },
  note:       { label: 'Note',               category: 'additional',   inputType: 'textarea', placeholder: 'Any additional info...', vcardProp: 'NOTE' },

  // Extended: Social
  linkedin:   { label: 'LinkedIn',           category: 'social',       inputType: 'url',      placeholder: 'https://linkedin.com/in/...',  vcardProp: 'X-SOCIALPROFILE;TYPE=linkedin' },
  twitter:    { label: 'Twitter / X',        category: 'social',       inputType: 'url',      placeholder: 'https://x.com/...',             vcardProp: 'X-SOCIALPROFILE;TYPE=twitter' },
  github:     { label: 'GitHub',             category: 'social',       inputType: 'url',      placeholder: 'https://github.com/...',        vcardProp: 'X-SOCIALPROFILE;TYPE=github' },
  instagram:  { label: 'Instagram',          category: 'social',       inputType: 'url',      placeholder: 'https://instagram.com/...',     vcardProp: 'X-SOCIALPROFILE;TYPE=instagram' },

  // Extended: Identity
  pronouns:   { label: 'Pronouns',           category: 'identity',     inputType: 'text',     placeholder: 'they/them',           vcardProp: 'X-PRONOUNS' },
  nickname:   { label: 'Nickname',           category: 'identity',     inputType: 'text',     placeholder: 'Johnny',              vcardProp: 'NICKNAME' },
  birthday:   { label: 'Birthday',           category: 'identity',     inputType: 'date',     placeholder: '',                    vcardProp: 'BDAY' },
  photoUrl:   { label: 'Photo URL',          category: 'identity',     inputType: 'url',      placeholder: 'https://...',         vcardProp: 'PHOTO;VALUE=URI' },

  // Extended: Additional contact
  homePhone:  { label: 'Phone (Home)',       category: 'contact',      inputType: 'tel',      placeholder: '+1 555-000-0000',     vcardProp: 'TEL;TYPE=HOME' },
  otherPhone: { label: 'Phone (Other)',      category: 'contact',      inputType: 'tel',      placeholder: '+1 555-000-0000',     vcardProp: 'TEL;TYPE=VOICE' },
  fax:        { label: 'Fax',               category: 'contact',      inputType: 'tel',      placeholder: '+1 555-000-0000',     vcardProp: 'TEL;TYPE=FAX' },
  workEmail:  { label: 'Email (Work)',       category: 'contact',      inputType: 'email',    placeholder: 'john@work.com',       vcardProp: 'EMAIL;TYPE=WORK' },
  otherEmail: { label: 'Email (Other)',      category: 'contact',      inputType: 'email',    placeholder: 'john@other.com',      vcardProp: 'EMAIL;TYPE=INTERNET' },

  // Extended: Home address
  homeStreet:  { label: 'Street',            category: 'home-address', inputType: 'text',     placeholder: '456 Oak Ave',         vcardProp: null },
  homeCity:    { label: 'City',              category: 'home-address', inputType: 'text',     placeholder: 'Durham',              vcardProp: null },
  homeState:   { label: 'State',             category: 'home-address', inputType: 'text',     placeholder: 'NC',                  vcardProp: null },
  homeZip:     { label: 'Zip Code',          category: 'home-address', inputType: 'text',     placeholder: '27701',               vcardProp: null },
  homeCountry: { label: 'Country',           category: 'home-address', inputType: 'text',     placeholder: 'USA',                 vcardProp: null },
};

// --- Profile Colors ------------------------------------------------------------

const PROFILE_COLORS = [
  '#3b4856', '#2b5c8a', '#4a4e9a', '#6b4c8a', '#8a3c5c',
  '#8a4a2b', '#4a6a3b', '#2b6b6b', '#4a5568', '#2d3250'
];

function darkenColor(hex, factor) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * (1 - factor));
  const dg = Math.round(g * (1 - factor));
  const db = Math.round(b * (1 - factor));
  return '#' + [dr, dg, db].map(c => c.toString(16).padStart(2, '0')).join('');
}

function applyProfileColor(hex) {
  document.documentElement.style.setProperty('--profile-color', hex);
  document.documentElement.style.setProperty('--profile-bg', darkenColor(hex, 0.65));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', darkenColor(hex, 0.4));
}

function buildColorPicker(selectedColor) {
  const picker = document.getElementById('colorPicker');
  if (!picker) return;
  picker.replaceChildren();

  PROFILE_COLORS.forEach(color => {
    const swatch = document.createElement('button');
    swatch.className = 'color-swatch' + (color === selectedColor ? ' selected' : '');
    swatch.style.background = color;
    swatch.dataset.color = color;
    swatch.setAttribute('aria-label', color);
    swatch.addEventListener('click', () => selectColor(color));
    picker.appendChild(swatch);
  });
}

function selectColor(color) {
  applyProfileColor(color);
  if (activeProfile) {
    activeProfile.profileColor = color;
    saveProfile(activeProfile);
  }
  document.querySelectorAll('.color-swatch').forEach(s => {
    s.classList.toggle('selected', s.dataset.color === color);
  });
}

const CATEGORY_LABELS = {
  personal: 'Personal',
  contact: 'Contact',
  organization: 'Organization',
  address: 'Work Address',
  additional: 'Additional',
  social: 'Social',
  identity: 'Identity',
  'home-address': 'Home Address',
};

// Fields that should be paired side-by-side
const ROW_PAIRS = {
  firstName: 'lastName',
  city: 'state',
  zip: 'country',
  homeCity: 'homeState',
  homeZip: 'homeCountry',
};

// The original 15 fields (used for migration and "full" preset)
const CORE_FIELD_IDS = [
  'firstName', 'lastName', 'prefix', 'email', 'phone', 'workPhone', 'website',
  'org', 'title', 'street', 'city', 'state', 'zip', 'country', 'note',
];

// --- Presets -------------------------------------------------------------------

const PRESETS = {
  personal: {
    label: 'Personal',
    fields: ['firstName', 'lastName', 'phone', 'email'],
  },
  work: {
    label: 'Work',
    fields: ['firstName', 'lastName', 'prefix', 'email', 'workPhone', 'website', 'org', 'title', 'street', 'city', 'state', 'zip', 'country'],
  },
  networking: {
    label: 'Networking',
    fields: ['firstName', 'lastName', 'email', 'phone', 'org', 'title', 'website', 'linkedin', 'twitter', 'github'],
  },
  full: {
    label: 'Full',
    fields: CORE_FIELD_IDS.slice(),
  },
};

// --- IndexedDB -----------------------------------------------------------------

const DB_NAME = 'qrme';
const DB_VERSION = 2;

let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      const tx = event.target.transaction;

      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('app-state')) {
        db.createObjectStore('app-state');
      }

      // Migrate v1 data
      if (db.objectStoreNames.contains('formdata')) {
        const oldStore = tx.objectStore('formdata');
        const getReq = oldStore.get('vcard-data');
        getReq.onsuccess = () => {
          if (getReq.result) {
            const oldData = getReq.result;
            const profileId = crypto.randomUUID();
            const nonEmpty = CORE_FIELD_IDS.filter(k => oldData[k]?.trim());
            tx.objectStore('profiles').put({
              id: profileId,
              name: 'Default',
              preset: 'full',
              fields: oldData,
              selectedFields: nonEmpty,
              fieldOrder: CORE_FIELD_IDS.slice(),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            });
            tx.objectStore('app-state').put(profileId, 'activeProfileId');
            tx.objectStore('app-state').put(profileId, 'lastUsedProfileId');
          }
          db.deleteObjectStore('formdata');
        };
      }
    };

    req.onsuccess = () => {
      _db = req.result;
      resolve(_db);
    };
    req.onerror = () => reject(req.error);
  });
}

async function getAppState(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('app-state', 'readonly');
    const req = tx.objectStore('app-state').get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function setAppState(key, val) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('app-state', 'readwrite');
    tx.objectStore('app-state').put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getAllProfiles() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('profiles', 'readonly');
    const req = tx.objectStore('profiles').getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getProfile(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('profiles', 'readonly');
    const req = tx.objectStore('profiles').get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveProfile(profile) {
  profile.updatedAt = Date.now();
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('profiles', 'readwrite');
    tx.objectStore('profiles').put(profile);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteProfile(id) {
  const profiles = await getAllProfiles();
  if (profiles.length <= 1) return false;
  const db = await openDB();
  const activeId = await getAppState('activeProfileId');
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['profiles', 'app-state'], 'readwrite');
    tx.objectStore('profiles').delete(id);
    if (activeId === id) {
      const remaining = profiles.filter(p => p.id !== id);
      tx.objectStore('app-state').put(remaining[0].id, 'activeProfileId');
    }
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function createProfile(name, presetKey) {
  const id = crypto.randomUUID();
  const preset = PRESETS[presetKey] || PRESETS.full;
  const profile = {
    id,
    name,
    preset: presetKey,
    fields: {},
    selectedFields: [],
    fieldOrder: preset.fields.slice(),
    profileColor: PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await saveProfile(profile);
  return profile;
}

// --- Active Profile State ------------------------------------------------------

let activeProfile = null;

async function loadActiveProfile() {
  let activeId = await getAppState('activeProfileId');
  if (activeId) {
    activeProfile = await getProfile(activeId);
  }

  // If no active profile yet (fresh install or failed migration), create default
  if (!activeProfile) {
    const profiles = await getAllProfiles();
    if (profiles.length > 0) {
      activeProfile = profiles[0];
    } else {
      // Check localStorage for v1 data to migrate
      let oldData = null;
      try {
        oldData = JSON.parse(localStorage.getItem('vcard-data'));
      } catch {}

      activeProfile = await createProfile('Default', 'full');
      if (oldData) {
        activeProfile.fields = oldData;
        activeProfile.selectedFields = CORE_FIELD_IDS.filter(k => oldData[k]?.trim());
        await saveProfile(activeProfile);
      }
    }
    await setAppState('activeProfileId', activeProfile.id);
    await setAppState('lastUsedProfileId', activeProfile.id);
  }

  return activeProfile;
}

// --- Dynamic Form Rendering ----------------------------------------------------

function renderForm(profile) {
  const container = document.getElementById('formContainer');
  container.textContent = '';

  // Color picker card (always first)
  const colorCard = document.createElement('div');
  colorCard.className = 'card';
  const colorTitle = document.createElement('div');
  colorTitle.className = 'card-title';
  colorTitle.textContent = 'Theme';
  colorCard.appendChild(colorTitle);
  const colorPickerEl = document.createElement('div');
  colorPickerEl.className = 'color-picker';
  colorPickerEl.id = 'colorPicker';
  colorCard.appendChild(colorPickerEl);
  container.appendChild(colorCard);

  // Build color swatches
  buildColorPicker(profile.profileColor);

  // Group fields by category (preserving fieldOrder)
  const categories = {};
  profile.fieldOrder.forEach(fieldId => {
    const def = FIELD_REGISTRY[fieldId];
    if (!def) return;
    if (!categories[def.category]) categories[def.category] = [];
    categories[def.category].push({ id: fieldId, ...def });
  });

  // Category order for consistent display
  const categoryOrder = ['personal', 'contact', 'organization', 'address', 'home-address', 'social', 'identity', 'additional'];

  for (const cat of categoryOrder) {
    const catFields = categories[cat];
    if (!catFields || catFields.length === 0) continue;

    const card = document.createElement('div');
    card.className = 'card';

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = CATEGORY_LABELS[cat] || cat;
    card.appendChild(titleEl);

    const rendered = new Set();

    for (let i = 0; i < catFields.length; i++) {
      const f = catFields[i];
      if (rendered.has(f.id)) continue;

      const pairedId = ROW_PAIRS[f.id];
      const pairedField = pairedId ? catFields.find(cf => cf.id === pairedId) : null;

      if (pairedField && !rendered.has(pairedField.id)) {
        const row = document.createElement('div');
        row.className = 'row';
        row.appendChild(buildFieldElement(f, profile));
        row.appendChild(buildFieldElement(pairedField, profile));
        card.appendChild(row);
        rendered.add(f.id);
        rendered.add(pairedField.id);
      } else {
        card.appendChild(buildFieldElement(f, profile));
        rendered.add(f.id);
      }
    }

    container.appendChild(card);
  }

  // "Add Field" button
  const addBtn = document.createElement('button');
  addBtn.className = 'btn';
  addBtn.style.cssText = 'width:100%;margin-top:0.5rem;margin-bottom:0.5rem;';
  addBtn.textContent = '+ Add Field';
  addBtn.onclick = showFieldPicker;
  container.appendChild(addBtn);
}

function buildFieldElement(fieldDef, profile) {
  const div = document.createElement('div');
  div.className = 'field';

  const isExtended = !CORE_FIELD_IDS.includes(fieldDef.id);

  const label = document.createElement('label');
  label.textContent = fieldDef.label;

  if (isExtended) {
    const removeBtn = document.createElement('span');
    removeBtn.className = 'field-remove';
    removeBtn.textContent = '\u00d7';
    removeBtn.title = 'Remove field';
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeFieldFromProfile(fieldDef.id);
    });
    label.appendChild(removeBtn);
  }

  div.appendChild(label);

  const input = fieldDef.inputType === 'textarea'
    ? document.createElement('textarea')
    : document.createElement('input');

  if (fieldDef.inputType !== 'textarea') input.type = fieldDef.inputType;
  input.id = fieldDef.id;
  input.placeholder = fieldDef.placeholder;
  input.value = profile.fields[fieldDef.id] || '';
  div.appendChild(input);

  return div;
}

// --- Field Picker --------------------------------------------------------------

function showFieldPicker() {
  const usedFields = new Set(activeProfile.fieldOrder);
  const available = Object.entries(FIELD_REGISTRY).filter(([id]) => !usedFields.has(id));

  if (available.length === 0) {
    showToast('All fields already added');
    return;
  }

  // Group by category
  const groups = {};
  available.forEach(([id, def]) => {
    if (!groups[def.category]) groups[def.category] = [];
    groups[def.category].push({ id, ...def });
  });

  const overlay = document.createElement('div');
  overlay.className = 'field-picker-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const picker = document.createElement('div');
  picker.className = 'field-picker';

  const header = document.createElement('div');
  header.className = 'field-picker-header';

  const headerTitle = document.createElement('h3');
  headerTitle.textContent = 'Add Field';
  header.appendChild(headerTitle);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'field-picker-close';
  closeBtn.textContent = '\u00d7';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  picker.appendChild(header);

  const categoryOrder = ['contact', 'social', 'identity', 'organization', 'address', 'home-address', 'additional'];

  for (const cat of categoryOrder) {
    const items = groups[cat];
    if (!items || items.length === 0) continue;

    const catLabel = document.createElement('div');
    catLabel.className = 'field-picker-category';
    catLabel.textContent = CATEGORY_LABELS[cat] || cat;
    picker.appendChild(catLabel);

    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'field-picker-item';
      btn.textContent = item.label;
      btn.onclick = () => {
        addFieldToProfile(item.id);
        overlay.remove();
      };
      picker.appendChild(btn);
    });
  }

  overlay.appendChild(picker);
  document.body.appendChild(overlay);
}

function addFieldToProfile(fieldId) {
  if (!activeProfile.fieldOrder.includes(fieldId)) {
    activeProfile.fieldOrder.push(fieldId);
    activeProfile.updatedAt = Date.now();
    saveProfile(activeProfile);
    renderForm(activeProfile);
  }
}

function removeFieldFromProfile(fieldId) {
  activeProfile.fieldOrder = activeProfile.fieldOrder.filter(id => id !== fieldId);
  delete activeProfile.fields[fieldId];
  activeProfile.selectedFields = activeProfile.selectedFields.filter(id => id !== fieldId);
  activeProfile.updatedAt = Date.now();
  saveProfile(activeProfile);
  renderForm(activeProfile);
}

// --- Profile Switcher ----------------------------------------------------------

async function renderProfileBar() {
  const bar = document.getElementById('profileBar');
  const profiles = await getAllProfiles();

  bar.style.display = 'flex';
  bar.textContent = '';

  profiles.forEach(p => {
    const pill = document.createElement('button');
    pill.className = 'profile-pill' + (p.id === activeProfile.id ? ' active' : '');
    pill.textContent = p.name;
    pill.onclick = () => switchProfile(p.id);
    pill.oncontextmenu = (e) => {
      e.preventDefault();
      showProfileMenu(p.id, e);
    };

    // Long-press for mobile
    let pressTimer = null;
    pill.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const coords = { clientX: touch.clientX, clientY: touch.clientY };
      pressTimer = setTimeout(() => {
        showProfileMenu(p.id, coords);
      }, 500);
    }, { passive: true });
    pill.addEventListener('touchend', () => clearTimeout(pressTimer));
    pill.addEventListener('touchmove', () => clearTimeout(pressTimer));

    bar.appendChild(pill);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'profile-pill profile-pill-add';
  addBtn.textContent = '+';
  addBtn.onclick = showNewProfileDialog;
  bar.appendChild(addBtn);
}

async function switchProfile(profileId) {
  if (activeProfile && profileId === activeProfile.id) return;

  // Save current form data first
  await saveCurrentFormData();

  activeProfile = await getProfile(profileId);
  await setAppState('activeProfileId', profileId);
  await setAppState('lastUsedProfileId', profileId);

  if (activeProfile.profileColor) applyProfileColor(activeProfile.profileColor);
  renderForm(activeProfile);
  await renderProfileBar();
  switchTab(0);
}

function showProfileMenu(profileId, event) {
  // Remove any existing menus
  document.querySelectorAll('.profile-menu-overlay').forEach(el => el.remove());

  const overlay = document.createElement('div');
  overlay.className = 'profile-menu-overlay';
  overlay.addEventListener('click', () => overlay.remove());

  const menu = document.createElement('div');
  menu.className = 'profile-menu';

  // Position near the click/touch
  const x = event.touches ? event.touches[0].clientX : event.clientX;
  const y = event.touches ? event.touches[0].clientY : event.clientY;
  menu.style.left = Math.min(x, window.innerWidth - 160) + 'px';
  menu.style.top = y + 'px';

  const renameBtn = document.createElement('button');
  renameBtn.className = 'profile-menu-item';
  renameBtn.textContent = 'Rename';
  renameBtn.onclick = async () => {
    overlay.remove();
    const profile = await getProfile(profileId);
    const name = prompt('Profile name:', profile.name);
    if (name && name.trim()) {
      profile.name = name.trim();
      await saveProfile(profile);
      if (activeProfile.id === profileId) activeProfile.name = name.trim();
      await renderProfileBar();
    }
  };
  menu.appendChild(renameBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'profile-menu-item danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = async () => {
    overlay.remove();
    const profiles = await getAllProfiles();
    if (profiles.length <= 1) {
      showToast('Cannot delete the only profile');
      return;
    }
    if (confirm('Delete this profile? This cannot be undone.')) {
      const wasActive = activeProfile.id === profileId;
      await deleteProfile(profileId);
      if (wasActive) {
        const remaining = await getAllProfiles();
        await switchProfile(remaining[0].id);
      } else {
        await renderProfileBar();
      }
    }
  };
  menu.appendChild(deleteBtn);

  overlay.appendChild(menu);
  document.body.appendChild(overlay);
}

function showNewProfileDialog() {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  let selectedPreset = 'personal';

  // Build dialog content with DOM methods
  const heading = document.createElement('h3');
  heading.textContent = 'New Profile';
  dialog.appendChild(heading);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'newProfileName';
  nameInput.placeholder = 'Profile name';
  dialog.appendChild(nameInput);

  const templateLabel = document.createElement('div');
  templateLabel.className = 'card-title';
  templateLabel.style.marginBottom = '0.5rem';
  templateLabel.textContent = 'Template';
  dialog.appendChild(templateLabel);

  const presetGrid = document.createElement('div');
  presetGrid.className = 'preset-grid';

  const presetButtons = [];
  Object.entries(PRESETS).forEach(([key, p]) => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn' + (key === selectedPreset ? ' selected' : '');
    btn.dataset.preset = key;
    btn.textContent = p.label;
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPreset = key;
    });
    presetGrid.appendChild(btn);
    presetButtons.push(btn);
  });
  dialog.appendChild(presetGrid);

  const actions = document.createElement('div');
  actions.className = 'dialog-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = () => overlay.remove();
  actions.appendChild(cancelBtn);

  const createBtn = document.createElement('button');
  createBtn.className = 'btn btn-primary';
  createBtn.textContent = 'Create';
  createBtn.onclick = async () => {
    const name = nameInput.value.trim() || PRESETS[selectedPreset].label;
    const profile = await createProfile(name, selectedPreset);
    overlay.remove();
    await switchProfile(profile.id);
  };
  actions.appendChild(createBtn);

  dialog.appendChild(actions);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Focus the name input
  setTimeout(() => nameInput.focus(), 100);
}

// --- Tab Navigation ------------------------------------------------------------

let currentTab = 0;

async function switchTab(idx) {
  currentTab = idx;
  document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.querySelectorAll('.panel').forEach((p, i) => p.classList.toggle('active', i === idx));
  if (idx === 1) {
    await saveCurrentFormData();
    buildShareList();
  }
  if (idx === 2) {
    await saveCurrentFormData();
    generateQR();
  }
}

// --- Select Fields (Panel 1) ---------------------------------------------------

function buildShareList() {
  const list = document.getElementById('shareList');
  list.textContent = '';

  activeProfile.fieldOrder.forEach(fieldId => {
    const def = FIELD_REGISTRY[fieldId];
    if (!def) return;

    const val = (activeProfile.fields[fieldId] || '').trim();
    const item = document.createElement('label');
    item.className = 'share-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.dataset.field = fieldId;
    cb.checked = val.length > 0 && activeProfile.selectedFields.includes(fieldId);
    cb.disabled = val.length === 0;
    cb.addEventListener('change', () => {
      updateSelectedFields();
      updateFieldCount();
    });

    const labelDiv = document.createElement('div');
    labelDiv.className = 'share-label';

    const keyDiv = document.createElement('div');
    keyDiv.className = 'key';
    keyDiv.textContent = def.label;
    labelDiv.appendChild(keyDiv);

    const valDiv = document.createElement('div');
    valDiv.className = 'val';
    if (val) {
      valDiv.textContent = val;
    } else {
      const emptySpan = document.createElement('span');
      emptySpan.className = 'empty';
      emptySpan.textContent = 'not entered';
      valDiv.appendChild(emptySpan);
    }
    labelDiv.appendChild(valDiv);

    item.appendChild(cb);
    item.appendChild(labelDiv);
    list.appendChild(item);
  });

  updateFieldCount();
}

function updateSelectedFields() {
  const selected = [];
  document.querySelectorAll('#shareList input[type="checkbox"]:checked').forEach(cb => {
    selected.push(cb.dataset.field);
  });
  activeProfile.selectedFields = selected;
  saveProfile(activeProfile);
}

function updateFieldCount() {
  const checked = document.querySelectorAll('#shareList input[type="checkbox"]:checked').length;
  const total = document.querySelectorAll('#shareList input[type="checkbox"]:not(:disabled)').length;
  const el = document.getElementById('fieldCount');
  el.textContent = '';
  const strong = document.createElement('strong');
  strong.textContent = checked;
  el.appendChild(strong);
  el.appendChild(document.createTextNode(` of ${total} fields selected`));
}

function selectAll() {
  document.querySelectorAll('#shareList input[type="checkbox"]:not(:disabled)').forEach(cb => cb.checked = true);
  updateSelectedFields();
  updateFieldCount();
}

function selectNone() {
  document.querySelectorAll('#shareList input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateSelectedFields();
  updateFieldCount();
}

// --- vCard Builder -------------------------------------------------------------

function escapeVCardValue(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function getSelectedFieldValues() {
  const selected = {};
  activeProfile.selectedFields.forEach(fieldId => {
    const val = (activeProfile.fields[fieldId] || '').trim();
    if (val) selected[fieldId] = val;
  });
  return selected;
}

function buildVCard(sel) {
  let v = 'BEGIN:VCARD\nVERSION:3.0\n';

  // Name fields (special handling)
  const ln = escapeVCardValue(sel.lastName || '');
  const fn = escapeVCardValue(sel.firstName || '');
  const pfx = escapeVCardValue(sel.prefix || '');
  if (fn || ln) {
    v += `N:${ln};${fn};;${pfx};\n`;
    v += `FN:${[pfx, fn, ln].filter(Boolean).join(' ')}\n`;
  }

  // Work address (composite)
  const addrFields = ['street', 'city', 'state', 'zip', 'country'];
  if (addrFields.some(f => sel[f])) {
    const parts = addrFields.map(f => escapeVCardValue(sel[f] || ''));
    v += `ADR;TYPE=WORK:;;${parts[0]};${parts[1]};${parts[2]};${parts[3]};${parts[4]}\n`;
  }

  // Home address (composite)
  const homeAddrFields = ['homeStreet', 'homeCity', 'homeState', 'homeZip', 'homeCountry'];
  if (homeAddrFields.some(f => sel[f])) {
    const parts = homeAddrFields.map(f => escapeVCardValue(sel[f] || ''));
    v += `ADR;TYPE=HOME:;;${parts[0]};${parts[1]};${parts[2]};${parts[3]};${parts[4]}\n`;
  }

  // All other fields — use vcardProp from registry
  const specialFields = new Set([
    'firstName', 'lastName', 'prefix',
    ...addrFields, ...homeAddrFields,
  ]);

  for (const [fieldId, value] of Object.entries(sel)) {
    if (specialFields.has(fieldId)) continue;
    const def = FIELD_REGISTRY[fieldId];
    if (!def || !def.vcardProp || !value) continue;
    v += `${def.vcardProp}:${escapeVCardValue(value)}\n`;
  }

  v += 'END:VCARD';
  return v;
}

// --- QR Code Generation --------------------------------------------------------

let qr = null;

function generateQR() {
  const sel = getSelectedFieldValues();
  const vcard = buildVCard(sel);
  const checkedCount = Object.keys(sel).length;

  document.getElementById('vcardPreview').textContent = vcard;

  const qrFieldCountEl = document.getElementById('qrFieldCount');
  qrFieldCountEl.textContent = '';
  if (checkedCount > 0) {
    const strong = document.createElement('strong');
    strong.textContent = checkedCount;
    qrFieldCountEl.appendChild(strong);
    qrFieldCountEl.appendChild(document.createTextNode(` field${checkedCount !== 1 ? 's' : ''} encoded`));
  }

  const qrContainer = document.getElementById('qrCode');
  const emptyEl = document.getElementById('qrEmpty');
  const actionsEl = document.getElementById('qrActions');

  if (checkedCount === 0) {
    qrContainer.textContent = '';
    emptyEl.style.display = 'flex';
    actionsEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  actionsEl.style.display = 'flex';
  qrContainer.textContent = '';

  try {
    qr = new QRCode(qrContainer, {
      text: vcard,
      width: 200,
      height: 200,
      colorDark: '#111111',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  } catch (e) {
    const errDiv = document.createElement('div');
    errDiv.style.cssText = 'padding:1rem;color:var(--red);font-size:0.85rem;text-align:center;';
    errDiv.textContent = 'Too much data for QR code. Try removing some fields or shortening values.';
    qrContainer.appendChild(errDiv);
    actionsEl.style.display = 'none';
  }
}

function downloadQR() {
  const canvas = document.querySelector('#qrCode canvas');
  if (!canvas) return;
  const padding = 40;
  const padded = document.createElement('canvas');
  padded.width = canvas.width + padding * 2;
  padded.height = canvas.height + padding * 2;
  const ctx = padded.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, padded.width, padded.height);
  ctx.drawImage(canvas, padding, padding);
  const link = document.createElement('a');
  link.download = `${activeProfile.name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
  link.href = padded.toDataURL('image/png');
  link.click();
}

function copyVCard() {
  const text = document.getElementById('vcardPreview').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('[data-action="copy-vcard"]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '\u2713 Copied!';
      setTimeout(() => btn.textContent = orig, 1500);
    }
  });
}

// --- URL-Encoded Sharing -------------------------------------------------------

// URL hash format: "1.<base64url>" = compressed, "0.<base64url>" = uncompressed
async function compressToHash(vcardString) {
  if (typeof CompressionStream !== 'undefined') {
    try {
      const encoder = new TextEncoder();
      const stream = new Blob([encoder.encode(vcardString)])
        .stream()
        .pipeThrough(new CompressionStream('deflate-raw'));
      const compressed = await new Response(stream).arrayBuffer();
      const bytes = new Uint8Array(compressed);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return '1.' + encoded;
    } catch {}
  }
  // Fallback: uncompressed base64url
  const encoded = btoa(unescape(encodeURIComponent(vcardString)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return '0.' + encoded;
}

async function decompressFromHash(hashData) {
  const dotIdx = hashData.indexOf('.');
  const isCompressed = dotIdx > -1 ? hashData.substring(0, dotIdx) === '1' : false;
  const base64url = dotIdx > -1 ? hashData.substring(dotIdx + 1) : hashData;

  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);

  if (isCompressed) {
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const stream = new Blob([bytes])
      .stream()
      .pipeThrough(new DecompressionStream('deflate-raw'));
    return await new Response(stream).text();
  }

  return decodeURIComponent(escape(binary));
}

async function shareAsUrl() {
  const sel = getSelectedFieldValues();
  if (Object.keys(sel).length === 0) {
    showToast('No fields selected to share');
    return;
  }
  const vcard = buildVCard(sel);

  try {
    const hash = await compressToHash(vcard);
    const url = `${window.location.origin}${window.location.pathname}#v=${hash}`;

    if (url.length > 2000) {
      showToast('URL too long. Try selecting fewer fields.');
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: `${activeProfile.name} - Contact`, url });
    } else {
      await navigator.clipboard.writeText(url);
      showToast('Share link copied!');
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      showToast('Could not share link');
    }
  }
}

// --- Share Landing View --------------------------------------------------------

function parseVCard(vcardString) {
  const result = { phones: [], emails: [], urls: [], socials: [] };
  const lines = vcardString.replace(/\r/g, '').split('\n');

  for (const line of lines) {
    if (line.startsWith('FN:')) result.fullName = unescapeVCard(line.substring(3));
    else if (line.startsWith('ORG:')) result.org = unescapeVCard(line.substring(4));
    else if (line.startsWith('TITLE:')) result.title = unescapeVCard(line.substring(6));
    else if (line.startsWith('NOTE:')) result.note = unescapeVCard(line.substring(5));
    else if (line.startsWith('NICKNAME:')) result.nickname = unescapeVCard(line.substring(9));
    else if (line.startsWith('BDAY:')) result.birthday = line.substring(5);
    else if (line.startsWith('X-PRONOUNS:')) result.pronouns = unescapeVCard(line.substring(11));
    else if (line.startsWith('EMAIL')) {
      const val = line.split(':').slice(1).join(':');
      const type = line.includes('TYPE=WORK') ? 'Work' : 'Personal';
      result.emails.push({ value: val, type });
    }
    else if (line.startsWith('TEL')) {
      const val = line.split(':').slice(1).join(':');
      let type = 'Phone';
      if (line.includes('TYPE=CELL')) type = 'Cell';
      else if (line.includes('TYPE=WORK')) type = 'Work';
      else if (line.includes('TYPE=HOME')) type = 'Home';
      else if (line.includes('TYPE=FAX')) type = 'Fax';
      result.phones.push({ value: val, type });
    }
    else if (line.startsWith('URL:')) {
      result.urls.push(line.substring(4));
    }
    else if (line.startsWith('X-SOCIALPROFILE')) {
      const val = line.split(':').slice(1).join(':');
      let type = 'Social';
      if (line.includes('TYPE=linkedin')) type = 'LinkedIn';
      else if (line.includes('TYPE=twitter')) type = 'Twitter';
      else if (line.includes('TYPE=github')) type = 'GitHub';
      else if (line.includes('TYPE=instagram')) type = 'Instagram';
      result.socials.push({ value: val, type });
    }
    else if (line.startsWith('ADR')) {
      const parts = line.split(':').slice(1).join(':').split(';');
      const type = line.includes('TYPE=HOME') ? 'Home' : 'Work';
      const addr = [parts[2], parts[3], parts[4], parts[5], parts[6]].filter(Boolean).join(', ');
      if (addr) {
        if (!result.addresses) result.addresses = [];
        result.addresses.push({ value: addr, type });
      }
    }
  }

  return result;
}

function unescapeVCard(str) {
  return str.replace(/\\n/g, '\n').replace(/\\;/g, ';').replace(/\\,/g, ',').replace(/\\\\/g, '\\');
}

async function renderShareView(hashData) {
  const shareView = document.getElementById('shareView');
  const mainContainer = document.querySelector('.container');
  const quickShowEl = document.getElementById('quickShow');

  try {
    const vcard = await decompressFromHash(hashData);
    if (!vcard.startsWith('BEGIN:VCARD')) throw new Error('Invalid vCard');

    const parsed = parseVCard(vcard);

    mainContainer.style.display = 'none';
    if (quickShowEl) quickShowEl.style.display = 'none';
    shareView.style.display = 'block';

    // Build share view with DOM methods
    shareView.textContent = '';

    const viewWrapper = document.createElement('div');
    viewWrapper.className = 'share-view';

    const card = document.createElement('div');
    card.className = 'share-card';

    const nameEl = document.createElement('h1');
    nameEl.textContent = parsed.fullName || 'Contact';
    card.appendChild(nameEl);

    if (parsed.title || parsed.org) {
      const titleEl = document.createElement('div');
      titleEl.className = 'share-title';
      let titleText = parsed.title || '';
      if (parsed.title && parsed.org) titleText += ' at ';
      if (parsed.org) titleText += parsed.org;
      titleEl.textContent = titleText;
      card.appendChild(titleEl);
    }

    const fieldsContainer = document.createElement('div');
    fieldsContainer.className = 'share-fields';

    function addShareField(label, value, href) {
      const field = document.createElement('div');
      field.className = 'share-field';

      const labelEl = document.createElement('span');
      labelEl.className = 'share-field-label';
      labelEl.textContent = label;
      field.appendChild(labelEl);

      const valueEl = document.createElement('span');
      valueEl.className = 'share-field-value';
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = value;
        if (href.startsWith('http')) link.target = '_blank';
        valueEl.appendChild(link);
      } else {
        valueEl.textContent = value;
      }
      field.appendChild(valueEl);

      fieldsContainer.appendChild(field);
    }

    parsed.phones.forEach(p => addShareField(p.type, p.value, `tel:${p.value}`));
    parsed.emails.forEach(e => addShareField(`${e.type} Email`, e.value, `mailto:${e.value}`));
    parsed.urls.forEach(u => addShareField('Website', u, u));
    parsed.socials.forEach(s => addShareField(s.type, s.value, s.value));
    if (parsed.org && !parsed.title) addShareField('Org', parsed.org);
    if (parsed.addresses) parsed.addresses.forEach(a => addShareField(`${a.type} Addr`, a.value));
    if (parsed.pronouns) addShareField('Pronouns', parsed.pronouns);
    if (parsed.birthday) addShareField('Birthday', parsed.birthday);
    if (parsed.note) addShareField('Note', parsed.note);

    card.appendChild(fieldsContainer);

    // Actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'share-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-primary';
    downloadBtn.textContent = 'Add to Contacts';
    downloadBtn.onclick = () => {
      const filename = (parsed.fullName || 'contact').toLowerCase().replace(/\s+/g, '-') + '.vcf';
      downloadVcf(vcard, filename);
    };
    actionsDiv.appendChild(downloadBtn);

    const createOwnBtn = document.createElement('button');
    createOwnBtn.className = 'btn';
    createOwnBtn.textContent = 'Create Your Own';
    createOwnBtn.onclick = () => {
      window.location.hash = '';
      window.location.reload();
    };
    actionsDiv.appendChild(createOwnBtn);

    card.appendChild(actionsDiv);

    // QR code
    const qrDiv = document.createElement('div');
    qrDiv.className = 'share-qr';
    const qrBox = document.createElement('div');
    qrBox.className = 'share-qr-box';
    qrBox.id = 'shareQRCode';
    qrDiv.appendChild(qrBox);
    card.appendChild(qrDiv);

    viewWrapper.appendChild(card);
    shareView.appendChild(viewWrapper);

    // Render QR
    try {
      new QRCode(document.getElementById('shareQRCode'), {
        text: vcard,
        width: 160,
        height: 160,
        colorDark: '#111111',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch {}

  } catch (e) {
    mainContainer.style.display = 'none';
    if (quickShowEl) quickShowEl.style.display = 'none';
    shareView.style.display = 'block';
    shareView.textContent = '';

    const errorWrapper = document.createElement('div');
    errorWrapper.className = 'share-view';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'share-error';

    const errorP = document.createElement('p');
    errorP.textContent = 'Invalid or expired contact link.';
    errorDiv.appendChild(errorP);

    const createLink = document.createElement('a');
    createLink.href = window.location.origin + window.location.pathname;
    createLink.textContent = 'Create your own QR contact card \u2192';
    errorDiv.appendChild(createLink);

    errorWrapper.appendChild(errorDiv);
    shareView.appendChild(errorWrapper);
  }
}

function downloadVcf(vcardString, filename) {
  const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'contact.vcf';
  a.click();
  URL.revokeObjectURL(url);
}

// --- Quick-Show Mode -----------------------------------------------------------

let wakeLock = null;
let quickShowProfiles = [];
let quickShowIndex = 0;

async function openQuickShow(profileId) {
  quickShowProfiles = await getAllProfiles();
  quickShowIndex = quickShowProfiles.findIndex(p => p.id === profileId);
  if (quickShowIndex < 0) quickShowIndex = 0;

  renderQuickShowQR(quickShowProfiles[quickShowIndex]);
  document.getElementById('quickShow').style.display = 'flex';

  // Request wake lock
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      document.addEventListener('visibilitychange', reacquireWakeLock);
    }
  } catch {}
}

function closeQuickShow() {
  document.getElementById('quickShow').style.display = 'none';
  document.getElementById('quickShowQR').textContent = '';

  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    document.removeEventListener('visibilitychange', reacquireWakeLock);
  }
}

async function reacquireWakeLock() {
  if (document.visibilityState === 'visible' && !wakeLock) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch {}
  }
}

function renderQuickShowQR(profile) {
  const container = document.getElementById('quickShowQR');
  container.textContent = '';
  document.getElementById('quickShowName').textContent = profile.name;

  const sel = {};
  (profile.selectedFields || []).forEach(fieldId => {
    const val = (profile.fields[fieldId] || '').trim();
    if (val) sel[fieldId] = val;
  });

  if (Object.keys(sel).length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.cssText = 'width:280px;height:280px;display:flex;align-items:center;justify-content:center;color:#999;font-size:0.85rem;';
    emptyDiv.textContent = 'No fields selected';
    container.appendChild(emptyDiv);
    return;
  }

  const vcard = buildVCard(sel);
  const qrSize = Math.min(window.innerWidth * 0.75, 320);

  try {
    new QRCode(container, {
      text: vcard,
      width: qrSize,
      height: qrSize,
      colorDark: '#111111',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  } catch {
    const errDiv = document.createElement('div');
    errDiv.style.cssText = 'padding:2rem;color:var(--red);text-align:center;';
    errDiv.textContent = 'Too much data for QR code';
    container.appendChild(errDiv);
  }
}

// Quick-show swipe handling
function initQuickShowSwipe() {
  const el = document.getElementById('quickShow');
  let touchStartX = 0;
  let touchStartY = 0;

  el.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  el.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        quickShowIndex = (quickShowIndex + 1) % quickShowProfiles.length;
      } else {
        quickShowIndex = (quickShowIndex - 1 + quickShowProfiles.length) % quickShowProfiles.length;
      }
      renderQuickShowQR(quickShowProfiles[quickShowIndex]);
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      closeQuickShow();
    }
  });
}

// --- Autosave ------------------------------------------------------------------

let saveTimer = null;

function initAutosave() {
  const container = document.getElementById('formContainer');
  container.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveCurrentFormData(), 300);
  });
}

async function saveCurrentFormData() {
  if (!activeProfile) return;

  activeProfile.fieldOrder.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) activeProfile.fields[fieldId] = el.value;
  });

  await saveProfile(activeProfile);
}

// --- Utility -------------------------------------------------------------------

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, duration) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration || 2000);
}

// --- Initialization ------------------------------------------------------------

async function init() {
  // Check for share URL
  const hash = window.location.hash;
  if (hash.startsWith('#v=')) {
    await renderShareView(hash.substring(3));
    return;
  }

  // Request persistent storage
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist();
  }

  // Load active profile
  await loadActiveProfile();

  // Apply profile color (assign random if migrated profile lacks one)
  if (!activeProfile.profileColor) {
    activeProfile.profileColor = PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)];
    await saveProfile(activeProfile);
  }
  applyProfileColor(activeProfile.profileColor);

  // Render UI
  renderForm(activeProfile);
  await renderProfileBar();
  initAutosave();
  initQuickShowSwipe();

  // Wire up tab clicks
  document.querySelectorAll('.tab').forEach((tab, i) => {
    tab.addEventListener('click', () => switchTab(i));
  });

  // Wire up QR box click for quick-show
  document.getElementById('qrBox').addEventListener('click', () => {
    if (activeProfile) openQuickShow(activeProfile.id);
  });

  // Check for PWA quick-show launch
  if (new URLSearchParams(window.location.search).has('quickshow')) {
    const lastUsed = await getAppState('lastUsedProfileId');
    if (lastUsed) {
      setTimeout(() => openQuickShow(lastUsed), 200);
    }
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Make functions available globally for onclick handlers in HTML
window.switchTab = switchTab;
window.selectAll = selectAll;
window.selectNone = selectNone;
window.downloadQR = downloadQR;
window.copyVCard = copyVCard;
window.shareAsUrl = shareAsUrl;

// Start the app
init().catch(console.error);
