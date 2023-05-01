import { engKeys, rusKeys } from './keys-list.js';

const Keyboard = {

  init() {
    this.caseUp = false;
    this.caps = false;
    this.shift = false;
    this.language = 'eng';
    this.keys = this.language === 'eng' ? engKeys : rusKeys;

    this.centralizer = document.createElement('div');
    this.centralizer.classList.add('centralizer');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.centralizer.appendChild(this.textarea);

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.centralizer.appendChild(this.keyboard);

    this.description = document.createElement('p');
    this.description.classList.add('description');
    this.centralizer.appendChild(this.description);
    this.description.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка используйте комбинацию: alt + shift';

    let engKeyCodes = Object.keys(engKeys);
    let rusKeyCodes = Object.keys(rusKeys);
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(0, 14), rusKeyCodes.slice(0, 14)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(14, 29), rusKeyCodes.slice(14, 29)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(29, 42), rusKeyCodes.slice(29, 42)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(42, 55), rusKeyCodes.slice(42, 55)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(55, engKeyCodes.length), rusKeyCodes.slice(55, rusKeyCodes.length)));

    document.body.appendChild(this.centralizer);
  },

  createRowKeys(engArr) {
    let rowKeys = document.createElement('div');
    rowKeys.classList.add('kb-row');

    engArr.forEach((name) => {
      let button = document.createElement('div');
      button.classList.add('kb-key');
      button.classList.add(`${name}`);
      rowKeys.appendChild(button);

      //eng keys V
      let eng = document.createElement('span');
      eng.classList.add('eng');
      button.appendChild(eng);

      let engCaseDown = document.createElement('span');
      engCaseDown.classList.add('caseDown');
      eng.appendChild(engCaseDown);

      let engCaseUp = document.createElement('span');
      engCaseUp.classList.add('caseUp');
      engCaseUp.classList.add('hidden');
      eng.appendChild(engCaseUp);

      let engCaps = document.createElement('span');
      engCaps.classList.add('caps');
      engCaps.classList.add('hidden');
      eng.appendChild(engCaps);

      let engShiftCaps = document.createElement('span');
      engShiftCaps.classList.add('shiftCaps');
      engShiftCaps.classList.add('hidden');
      eng.appendChild(engShiftCaps);

      //rus keys V
      let rus = document.createElement('span');
      rus.classList.add('rus'); 
      rus.classList.add('hidden');
      button.appendChild(rus);

      let rusCaseDown = document.createElement('span');
      rusCaseDown.classList.add('caseDown');
      rusCaseDown.classList.add('hidden');
      rus.appendChild(rusCaseDown);

      let rusCaseUp = document.createElement('span');
      rusCaseUp.classList.add('caseUp');
      rusCaseUp.classList.add('hidden');
      rus.appendChild(rusCaseUp);

      let rusCaps = document.createElement('span');
      rusCaps.classList.add('caps');
      rusCaps.classList.add('hidden');
      rus.appendChild(rusCaps);

      let rusShiftCaps = document.createElement('span');
      rusShiftCaps.classList.add('shiftCaps');
      rusShiftCaps.classList.add('hidden');
      rus.appendChild(rusShiftCaps);

      if (Array.isArray(engKeys[name])) {
        engCaseDown.textContent = engKeys[name][0];
        engCaseUp.textContent = engKeys[name][1];
        if (engKeys[name][0].match(/[a-z]/)) {
          engCaps.textContent = engKeys[name][1];
          engShiftCaps.textContent = engKeys[name][0];
        } else {
          engCaps.textContent = engKeys[name][0];
          engShiftCaps.textContent = engKeys[name][1];
        }
      } else {
        engCaseDown.textContent = engKeys[name];
        engCaseUp.textContent = engKeys[name];
        engCaps.textContent = engKeys[name];
        engShiftCaps.textContent = engKeys[name];
      }

      if (Array.isArray(rusKeys[name])) {
        rusCaseDown.textContent = rusKeys[name][0];
        rusCaseUp.textContent = rusKeys[name][1];
        if (rusKeys[name][0].match(/[а-яё]/)) {
          rusCaps.textContent = rusKeys[name][1];
          rusShiftCaps.textContent = rusKeys[name][0];
        } else {
          rusCaps.textContent = rusKeys[name][0];
          rusShiftCaps.textContent = rusKeys[name][1];
        }
      } else {
        rusCaseDown.textContent = rusKeys[name];
        rusCaseUp.textContent = rusKeys[name];
        rusCaps.textContent = rusKeys[name];
        rusShiftCaps.textContent = rusKeys[name];
      }
    });

    return rowKeys;
  },

  switchLanguage() {
    this.language = this.language === 'eng' ? 'rus' : 'eng';
    this.keys = this.language === "eng" ? engKeys : rusKeys;
    if (this.language === 'rus') {
      document.querySelectorAll('.rus').forEach((elem) => {
        elem.classList.remove('hidden');
      });
      document.querySelectorAll('.rus span').forEach((n) => {
        n.classList.add('hidden');
      });
      document.querySelectorAll('.rus .caseDown').forEach((n) => {
        n.classList.remove('hidden');
      });

      document.querySelectorAll('.eng').forEach((elem) => {
        elem.classList.add('hidden');
      });
      document.querySelectorAll('.eng span').forEach((n) => {
        n.classList.add('hidden');
      });
    } else if (this.language === 'eng') {
      document.querySelectorAll('.eng').forEach((elem) => {
        elem.classList.remove('hidden');
      });
      document.querySelectorAll('.eng span').forEach((n) => {
        n.classList.add('hidden');
      });
      document.querySelectorAll('.eng .caseDown').forEach((n) => {
        n.classList.remove('hidden');
      });

      document.querySelectorAll('.rus').forEach((elem) => {
        elem.classList.add('hidden');
      });
      document.querySelectorAll('.rus span').forEach((n) => {
        n.classList.add('hidden');
      });
    }
  },

  switchCaps() {
    if (this.caps) {
      document.querySelector('.CapsLock').classList.add('active');
      Object.keys(this.keys).forEach((code) => {
        if (Array.isArray(this.keys[code])) {
          if (this.keys[code][0].match(/[a-zа-яё]/)) {
            document.querySelectorAll(`.${this.language} span`).forEach((n) => {
              n.classList.add('hidden');
            });
            document.querySelectorAll(`.${this.language} .caps`).forEach((n) => {
              n.classList.remove('hidden');
            });
          }
        }
      });
    } else {
      document.querySelector('.CapsLock').classList.remove('active');
      Object.keys(this.keys).forEach((code) => {
        if (Array.isArray(this.keys[code])) {
          if (this.keys[code][0].match(/[a-zа-яё]/)) {
            document.querySelectorAll(`.${this.language} span`).forEach((n) => {
              n.classList.add('hidden');
            });
            document.querySelectorAll(`.${this.language} .caseDown`).forEach((n) => {
              n.classList.remove('hidden');
            });
          }
        }
      });
    }
  },

  switchShift() {
    if (this.shift) {
      document.querySelector('.ShiftLeft').classList.add('active');
      document.querySelector('.ShiftRight').classList.add('active');
      Object.keys(this.keys).forEach((code) => {
        if (Array.isArray(this.keys[code])) {
          document.querySelectorAll(`.${this.language} span`).forEach((n) => {
            n.classList.add('hidden');
          });
          document.querySelectorAll(`.${this.language} .caseUp`).forEach((n) => {
            n.classList.remove('hidden');
          });
        }
      });
    } else {
      document.querySelector('.ShiftLeft').classList.remove('active');
      document.querySelector('.ShiftRight').classList.remove('active');
      Object.keys(this.keys).forEach((code) => {
        if (Array.isArray(this.keys[code])) {
          document.querySelectorAll(`.${this.language} span`).forEach((n) => {
            n.classList.add('hidden');
          });
          document.querySelectorAll(`.${this.language} .caseDown`).forEach((n) => {
            n.classList.remove('hidden');
          });
        }
      });
    }
    if (this.caps) this.switchCaps();
  },

  clickKey(e) {
    e.stopPropagation();
    let elem = e.target.closest('.kb-key');
    let code = elem.className.split(' ')[1];
    console.log(code);
    switch (code) {
      case 'CapsLock':
        this.caps = !this.caps;
        this.switchCaps();
        break;
      case 'ShiftLeft':
        this.shift = !this.shift;
        this.switchShift();
        break;
      case 'ShiftRight':
        this.shift = !this.shift;
        this.switchShift();
        break;
      default:
        this.outputSymbol(code);
        break;
    }
  },

  outputSymbol(code) {
    let symbol = '';

    if (Array.isArray(this.keys[code])) {
      if (this.caps) {
        if (this.keys[code][0].match(/[a-zа-яё]/)) {
          symbol = this.keys[code][1];
        } else {
          symbol = this.keys[code][0];
        }
      } else if (this.shift) {
        symbol = this.keys[code][1];
      } else {
        symbol = this.keys[code][0];
      }
    };

    this.textarea.focus();

    let selStart = this.textarea.selectionStart;
    let selEnd = this.textarea.selectionEnd;

    const left = this.textarea.value.slice(0, selStart);
    const right = this.textarea.value.slice(selEnd);

    switch (code) {
      case 'Backspace':
        if (selStart !== selEnd) {
          this.textarea.value = `${left}${right}`;
          selEnd = selStart;
        } else {
          this.textarea.value = `${left.slice(0, -1)}${right}`;
          selStart -= 1;
          selEnd = selStart;
        }
        break;
      case 'Tab':
        this.textarea.value = `${left}\t${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      case 'Delete':
        if (selStart !== selEnd) {
          this.textarea.value = `${left}${right}`;
          selEnd = selStart;
        } else {
          this.textarea.value = `${left}${right.slice(1)}`;
          selEnd -= 1;
          selEnd = selStart;
        }
        break;
      case 'Enter':
        this.textarea.value = `${left}\n${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      case 'Space':
        this.textarea.value = `${left} ${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      default:
        selEnd = ++selStart;
        this.textarea.value = `${left}${symbol || ''}${right}`;
        break;
    }

    this.textarea.setSelectionRange(selStart, selEnd);
  },

};

function checkActivityClass(event) {
  document.querySelector(`.${event.code}`).classList.add('active');
}

function uncheckActivityClass(event) {
  document.querySelector(`.${event.code}`).classList.remove('active');
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (Object.keys(engKeys).includes(event.code)) {
    if (event.code === 'CapsLock') {
      Keyboard.caps = !Keyboard.caps;
      Keyboard.switchCaps();
      return;
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (Keyboard.shift) return;
      Keyboard.shift = true;
      Keyboard.switchShift();
    }

    checkActivityClass(event);
    Keyboard.outputSymbol(event.code);
  }
});

window.addEventListener('keyup', (event) => {
  if (Object.keys(engKeys).includes(event.code)) {
    event.preventDefault();
    if (event.code === 'CapsLock') {
      return;
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      Keyboard.shift = false;
      Keyboard.switchShift();
      if (event.altKey) {
        Keyboard.switchLanguage();
        return;
      }
    }

    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      if (event.shiftKey) {
        Keyboard.switchLanguage();
        return;
      }
    }

    uncheckActivityClass(event);
  }
});

window.addEventListener('click', (event) => {
  Keyboard.clickKey(event);
});
