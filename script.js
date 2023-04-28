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

      let eng = document.createElement('span');
      eng.classList.add('eng');
      eng.classList.add('hidden');
      button.appendChild(eng);

      let engCaseDown = document.createElement('span');
      engCaseDown.classList.add('caseDown');
      eng.appendChild(engCaseDown);

      let engCaseUp = document.createElement('span');
      engCaseUp.classList.add('engCaseUp');
      eng.appendChild(engCaseUp);

      if (keys[name].length <= 2) {
        engCaseDown.textContent = keys[name][0];
      } else {
        engCaseDown.textContent = keys[name];
      }
      
    });

    return rowKeys;
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});