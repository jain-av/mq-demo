/*
 * Core reusable design-system components.
 * Each factory builds and returns a plain DOM element (or small element
 * tree) styled via the classes defined in components.css.
 */

export function createButton({ label, variant = 'primary', onClick } = {}) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `ds-button ds-button--${variant}`;
  button.textContent = label;

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

export function createTextField({
  label,
  name,
  value = '',
  type = 'text',
  required = false,
  onChange,
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'ds-text-field';

  const fieldId = `ds-field-${name}`;

  const labelEl = document.createElement('label');
  labelEl.className = 'ds-text-field__label';
  labelEl.textContent = label;
  labelEl.setAttribute('for', fieldId);

  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = fieldId;
  input.value = value;
  input.className = 'ds-text-field__input';
  if (required) {
    input.required = true;
  }

  const message = document.createElement('div');
  message.className = 'ds-text-field__message';
  message.setAttribute('role', 'alert');

  function validate() {
    const isEmpty = input.value.trim() === '';
    const invalid = required && isEmpty;

    wrapper.classList.toggle('ds-text-field--invalid', invalid);
    if (invalid) {
      input.setAttribute('aria-invalid', 'true');
      message.textContent = `${label} is required.`;
    } else {
      input.removeAttribute('aria-invalid');
      message.textContent = '';
    }

    return !invalid;
  }

  input.addEventListener('input', () => {
    validate();
    if (onChange) {
      onChange(input.value);
    }
  });

  validate();

  wrapper.appendChild(labelEl);
  wrapper.appendChild(input);
  wrapper.appendChild(message);

  wrapper.input = input;
  wrapper.message = message;
  wrapper.validate = validate;

  return wrapper;
}

export function createToggle({ label, checked = false, onChange } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'ds-toggle';

  const labelEl = document.createElement('span');
  labelEl.className = 'ds-toggle__label';
  labelEl.textContent = label;

  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'ds-toggle__control';
  control.setAttribute('role', 'switch');
  control.setAttribute('aria-checked', String(checked));
  control.classList.toggle('ds-toggle__control--checked', checked);

  let state = checked;

  function setState(next) {
    state = next;
    control.setAttribute('aria-checked', String(state));
    control.classList.toggle('ds-toggle__control--checked', state);
    if (onChange) {
      onChange(state);
    }
  }

  control.addEventListener('click', () => setState(!state));
  control.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      if (event.preventDefault) {
        event.preventDefault();
      }
      setState(!state);
    }
  });

  wrapper.appendChild(labelEl);
  wrapper.appendChild(control);

  wrapper.control = control;

  return wrapper;
}

export function createCard({ title, children } = {}) {
  const card = document.createElement('div');
  card.className = 'ds-card';

  if (title) {
    const heading = document.createElement('h3');
    heading.className = 'ds-card__title';
    heading.textContent = title;
    card.appendChild(heading);
  }

  const body = document.createElement('div');
  body.className = 'ds-card__body';

  const items = Array.isArray(children) ? children : children ? [children] : [];
  items.forEach((child) => body.appendChild(child));

  card.appendChild(body);
  card.body = body;

  return card;
}
