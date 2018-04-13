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

// описание пользовательских событий
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
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

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var inputUserName = setup.querySelector('.setup-user-name');

inputUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = document.querySelector('[name=eyes-color]');

var onClickEyesColorChange = function () {
  var newColorIndex = calculateRandomIndex(EYES_COLORS);
  wizardEyes.style.fill = EYES_COLORS[newColorIndex];
  wizardEyesInput.value = EYES_COLORS[newColorIndex];
};

wizardEyes.addEventListener('click', onClickEyesColorChange);

var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.querySelector('[name=fireball-color]');

var onClickFireballColorChange = function () {
  var newColorIndex = calculateRandomIndex(FIREBALL__COLORS);
  wizardFireball.style.backgroundColor = FIREBALL__COLORS[newColorIndex];
  wizardFireballInput.value = FIREBALL__COLORS[newColorIndex];
};

wizardFireball.addEventListener('click', onClickFireballColorChange);
