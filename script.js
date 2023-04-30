import engKeys from './keys-list.js';

const keys = engKeys;

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

    let keyCodes = Object.keys(keys);
    this.keyboard.appendChild(this.createRowKeys(keyCodes.slice(0, 14)));
    this.keyboard.appendChild(this.createRowKeys(keyCodes.slice(14, 29)));
    this.keyboard.appendChild(this.createRowKeys(keyCodes.slice(29, 42)));
    this.keyboard.appendChild(this.createRowKeys(keyCodes.slice(42, 55)));
    this.keyboard.appendChild(this.createRowKeys(keyCodes.slice(55, keyCodes.length)));

    document.body.appendChild(this.centralizer);
  },

  createRowKeys(arr) {
    let rowKeys = document.createElement('div');
    rowKeys.classList.add('kb-row');

    arr.forEach((name) => {
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

      if (keys[name].length <= 2) {
        engCaseDown.textContent = keys[name][0];
        engCaseUp.textContent = keys[name][1];
        rusCaseDown.textContent = keys[name][0];
        rusCaseUp.textContent = keys[name][1];
        if (keys[name][0].match(/[a-zа-яё]/)) {
          engCaps.textContent = keys[name][1];
          engShiftCaps.textContent = keys[name][0];
          rusCaps.textContent = keys[name][1];
          rusShiftCaps.textContent = keys[name][0];
        } else {
          engCaps.textContent = keys[name][0];
          engShiftCaps.textContent = keys[name][1];
          rusCaps.textContent = keys[name][0];
          rusShiftCaps.textContent = keys[name][1];
        }
      } else {
        engCaseDown.textContent = keys[name];
        engCaseUp.textContent = keys[name];
        engCaps.textContent = keys[name];
        engShiftCaps.textContent = keys[name];
        rusCaseDown.textContent = keys[name];
        rusCaseUp.textContent = keys[name];
        rusCaps.textContent = keys[name];
        rusShiftCaps.textContent = keys[name];
      }
    });

    return rowKeys;
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});