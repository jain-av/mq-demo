import {
  createCard,
  createTextField,
  createToggle,
  createButton,
} from '../design-system/components.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function renderSettings(root) {
  const state = {
    name: '',
    email: '',
    emailNotifications: false,
    darkMode: false,
  };

  function isNameValid() {
    return state.name.trim() !== '';
  }

  function isEmailValid() {
    const value = state.email.trim();
    return value !== '' && EMAIL_PATTERN.test(value);
  }

  function updateSaveState() {
    saveButton.disabled = !(isNameValid() && isEmailValid());
  }

  function validateEmailFormat() {
    const value = emailField.input.value.trim();
    if (value === '') {
      // createTextField's own required-empty validation already applied.
      return;
    }

    const invalid = !EMAIL_PATTERN.test(value);
    emailField.classList.toggle('ds-text-field--invalid', invalid);
    if (invalid) {
      emailField.input.setAttribute('aria-invalid', 'true');
      emailField.message.textContent = 'Enter a valid email address.';
    } else {
      emailField.input.removeAttribute('aria-invalid');
      emailField.message.textContent = '';
    }
  }

  const nameField = createTextField({
    label: 'Name',
    name: 'name',
    required: true,
    onChange: (value) => {
      state.name = value;
      updateSaveState();
    },
  });

  const emailField = createTextField({
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    onChange: (value) => {
      state.email = value;
      validateEmailFormat();
      updateSaveState();
    },
  });

  const emailNotificationsToggle = createToggle({
    label: 'Email notifications',
    checked: state.emailNotifications,
    onChange: (value) => {
      state.emailNotifications = value;
    },
  });

  const darkModeToggle = createToggle({
    label: 'Dark mode',
    checked: state.darkMode,
    onChange: (value) => {
      state.darkMode = value;
    },
  });

  const saveButton = createButton({
    label: 'Save',
    variant: 'primary',
  });

  const profileCard = createCard({
    title: 'Profile',
    children: [nameField, emailField],
  });

  const preferencesCard = createCard({
    title: 'Preferences',
    children: [emailNotificationsToggle, darkModeToggle],
  });

  root.appendChild(profileCard);
  root.appendChild(preferencesCard);
  root.appendChild(saveButton);

  updateSaveState();

  return { state, nameField, emailField, emailNotificationsToggle, darkModeToggle, saveButton };
}

if (typeof document !== 'undefined' && typeof document.getElementById === 'function') {
  const root = document.getElementById('settings-root');
  if (root) {
    renderSettings(root);
  }
}
