import test from 'node:test';
import assert from 'node:assert/strict';

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.style = {};
    this._attributes = new Map();
    this._classNames = [];
    this._text = '';
    this._listeners = new Map();

    const self = this;
    this.classList = {
      add(...names) {
        names.forEach((name) => {
          if (!self._classNames.includes(name)) self._classNames.push(name);
        });
      },
      remove(...names) {
        self._classNames = self._classNames.filter((name) => !names.includes(name));
      },
      contains(name) {
        return self._classNames.includes(name);
      },
      toggle(name, force) {
        const shouldAdd = force === undefined ? !self._classNames.includes(name) : force;
        if (shouldAdd) {
          this.add(name);
        } else {
          this.remove(name);
        }
        return shouldAdd;
      },
    };
  }

  get className() {
    return this._classNames.join(' ');
  }

  set className(value) {
    this._classNames = String(value).split(' ').filter(Boolean);
  }

  get textContent() {
    return this._text;
  }

  set textContent(value) {
    this._text = value;
    this.children = [];
  }

  setAttribute(name, value) {
    this._attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this._attributes.has(name) ? this._attributes.get(name) : null;
  }

  removeAttribute(name) {
    this._attributes.delete(name);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  addEventListener(type, handler) {
    if (!this._listeners.has(type)) this._listeners.set(type, []);
    this._listeners.get(type).push(handler);
  }

  removeEventListener(type, handler) {
    const handlers = this._listeners.get(type);
    if (!handlers) return;
    this._listeners.set(type, handlers.filter((h) => h !== handler));
  }

  dispatchEvent(event) {
    const handlers = this._listeners.get(event.type) || [];
    handlers.forEach((handler) => handler(event));
    return true;
  }
}

globalThis.document = {
  createElement(tagName) {
    return new FakeElement(tagName);
  },
};

const { createButton, createTextField, createToggle, createCard } = await import(
  './components.js'
);

test('createButton applies the requested variant class and fires onClick', () => {
  let clicked = false;
  const button = createButton({
    label: 'Save',
    variant: 'danger',
    onClick: () => {
      clicked = true;
    },
  });

  assert.equal(button.tagName, 'BUTTON');
  assert.ok(button.classList.contains('ds-button--danger'));
  assert.equal(button.textContent, 'Save');

  button.dispatchEvent({ type: 'click' });
  assert.equal(clicked, true);
});

test('createTextField marks itself invalid and shows the validation message when required and empty', () => {
  const field = createTextField({
    label: 'Name',
    name: 'name',
    value: '',
    required: true,
  });

  assert.ok(field.classList.contains('ds-text-field--invalid'));
  assert.equal(field.input.getAttribute('aria-invalid'), 'true');
  assert.equal(field.message.textContent, 'Name is required.');

  field.input.value = 'Ada';
  field.validate();

  assert.equal(field.classList.contains('ds-text-field--invalid'), false);
  assert.equal(field.input.getAttribute('aria-invalid'), null);
  assert.equal(field.message.textContent, '');
});

test('createToggle flips aria-checked and calls onChange with the new boolean state on click', () => {
  let lastValue;
  const toggle = createToggle({
    label: 'Dark mode',
    checked: false,
    onChange: (value) => {
      lastValue = value;
    },
  });

  assert.equal(toggle.control.getAttribute('role'), 'switch');
  assert.equal(toggle.control.getAttribute('aria-checked'), 'false');

  toggle.control.dispatchEvent({ type: 'click' });

  assert.equal(toggle.control.getAttribute('aria-checked'), 'true');
  assert.equal(lastValue, true);

  toggle.control.dispatchEvent({ type: 'click' });

  assert.equal(toggle.control.getAttribute('aria-checked'), 'false');
  assert.equal(lastValue, false);
});

test('createCard renders a titled container with its children', () => {
  const child = new FakeElement('div');
  const card = createCard({ title: 'Profile', children: [child] });

  assert.ok(card.classList.contains('ds-card'));
  assert.equal(card.children[0].textContent, 'Profile');
  assert.ok(card.body.children.includes(child));
});
