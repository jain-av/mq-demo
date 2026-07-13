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

const { renderSettings } = await import('./settings.js');

function setInputValue(field, value) {
  field.input.value = value;
  field.input.dispatchEvent({ type: 'input' });
}

test('Save button starts disabled', () => {
  const root = new FakeElement('div');
  const { saveButton } = renderSettings(root);

  assert.equal(saveButton.disabled, true);
});

test('Save button becomes enabled once name and a valid email are provided', () => {
  const root = new FakeElement('div');
  const { nameField, emailField, saveButton } = renderSettings(root);

  setInputValue(nameField, 'Ada Lovelace');
  setInputValue(emailField, 'ada@example.com');

  assert.equal(saveButton.disabled, false);
});

test('Save button becomes disabled again if the email is cleared', () => {
  const root = new FakeElement('div');
  const { nameField, emailField, saveButton } = renderSettings(root);

  setInputValue(nameField, 'Ada Lovelace');
  setInputValue(emailField, 'ada@example.com');
  assert.equal(saveButton.disabled, false);

  setInputValue(emailField, '');

  assert.equal(saveButton.disabled, true);
});
