'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARD_QUANTITY = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var FIREBALL__COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// функция для расчета случайного индекса элемента массива
var calculateRandomIndex = function (arr) {
  return Math.round(Math.random() * (arr.length - 1));
};

// функция, создающая случайного волшебника с генерацией параметров по массиву, исключено повторение параметров
var createRandomWizard = function (firstName, lastName, coatColors, eyesColors) {
  var wizard = {};
  var randomIndexFirstName = calculateRandomIndex(firstName);
  var randomIndexLastName = calculateRandomIndex(lastName);
  wizard.name = firstName[randomIndexFirstName] + ' ' + lastName[randomIndexLastName];
  firstName.splice(randomIndexFirstName, 1);
  lastName.splice(randomIndexLastName, 1);

  var randomIndexCoatColor = calculateRandomIndex(coatColors);
  wizard.coatColor = coatColors[randomIndexCoatColor];
  coatColors.splice(randomIndexCoatColor, 1);

  var randomIndexEyesColor = calculateRandomIndex(eyesColors);
  wizard.eyesColor = eyesColors[randomIndexEyesColor];
  eyesColors.splice(randomIndexEyesColor, 1);
  return wizard;
};

// генерация массива с волшебниками
var similarWizards = [];
var firstNameCopy = WIZARD_FIRST_NAMES.slice();
var lastNameCopy = WIZARD_LAST_NAMES.slice();
var coatColorsCopy = COAT_COLORS.slice();
var eyesColorCopy = EYES_COLORS.slice();
for (var i = 0; i < SIMILAR_WIZARD_QUANTITY; i++) {
  similarWizards[i] = createRandomWizard(firstNameCopy, lastNameCopy, coatColorsCopy, eyesColorCopy);
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция отрисовки случайного волшебника
var renderWizard = function (index) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizards[index].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizards[index].eyesColor;
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizards[index].name;
  return wizardElement;
};

// создание фрагмента и отрисовка в нем всех волшебников
var fragment = document.createDocumentFragment();
for (i = 0; i < SIMILAR_WIZARD_QUANTITY; i++) {
  fragment.appendChild(renderWizard(i));
}

// добавление фрагмента на страницу
similarListElement.appendChild(fragment);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

// ОПИСАНИЕ ПОЛЬЗОВАТЕЛЬСКИХ СОБЫТИЙ

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var inputUserName = setup.querySelector('.setup-user-name');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('[name=eyes-color]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setup.querySelector('[name=fireball-color]');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('[name=coat-color]');
var playerWizard = setup.querySelector('.setup-player');

var onEscStopPropagation = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// var colorEyesChange = function (arr) {
//   var newColorIndex = calculateRandomIndex(arr);
//   wizardEyes.style.fill = arr[newColorIndex];
//   wizardEyesInput.value = arr[newColorIndex];
// };
//
// var colorCoatChange = function (arr) {
//   var newColorIndex = calculateRandomIndex(arr);
//   wizardCoat.style.fill = arr[newColorIndex];
//   wizardCoatInput.value = arr[newColorIndex];
// };
//
// var colorFireballChange = function (arr) {
//   var newColorIndex = calculateRandomIndex(arr);
//   wizardFireball.style.backgroundColor = arr[newColorIndex];
//   wizardFireballInput.value = arr[newColorIndex];
// };
//
// var onClickEyesColorChange = function () {
//   colorEyesChange(EYES_COLORS);
// };
//
// var onClickCoatColorChange = function () {
//   colorCoatChange(COAT_COLORS);
// };
//
// var onClickFireballColorChange = function () {
//   colorFireballChange(FIREBALL__COLORS);
// };


var colorizeFillOrBack = function (elem, color) {
  if (elem.tagName === 'use') {
    elem.style.fill = color;
  } else {
    elem.style.backgroundColor = color;
  }
};

var onClickColorChange = function (evt) {
  var target = evt.target;
  if (target.tagName === 'use') {
    var newColor = EYES_COLORS[calculateRandomIndex(EYES_COLORS)];
    colorizeFillOrBack(wizardEyes, newColor);
    wizardEyesInput.value = newColor;
  } else if (target.tagName === 'use') {
    newColor = COAT_COLORS[calculateRandomIndex(COAT_COLORS)];
    colorizeFillOrBack(wizardCoat, newColor);
    wizardCoatInput.value = newColor;
  } else if (target.tagName === 'DIV') {
    newColor = FIREBALL__COLORS[calculateRandomIndex(FIREBALL__COLORS)];
    colorizeFillOrBack(wizardFireball, newColor);
    wizardFireballInput.value = newColor;
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  inputUserName.addEventListener('keydown', onEscStopPropagation);
  // playerWizard.addEventListener('click', onClickColorChange);

  wizardEyes.addEventListener('click', onClickColorChange);
  wizardCoat.addEventListener('click', onClickColorChange);
  wizardFireball.addEventListener('click', onClickColorChange);

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
