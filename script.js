import { engKeys, rusKeys } from './keys-list.js';

const Keyboard = {

  init() {
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
    this.description.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: левыe alt + shift';

    let engKeyCodes = Object.keys(engKeys);
    let rusKeyCodes = Object.keys(rusKeys);
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(0, 14), rusKeyCodes.slice(0, 14)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(14, 29), rusKeyCodes.slice(14, 29)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(29, 42), rusKeyCodes.slice(29, 42)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(42, 55), rusKeyCodes.slice(42, 55)));
    this.keyboard.appendChild(this.createRowKeys(engKeyCodes.slice(55, engKeyCodes.length), rusKeyCodes.slice(55, rusKeyCodes.length)));

    document.body.appendChild(this.centralizer);
  },

  createRowKeys(engArr, rusArr) {
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

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});