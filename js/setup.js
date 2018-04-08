'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var WIZARD_FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_WIZARD_QUANTITY = 4;

// функция, создающая случайного волшебника с генерацией параметров по массиву
var createRandomWizard = function (firstName, lastName, coatColors, eyesColors) {
  var wizard = {};
  wizard.name = firstName[Math.round(Math.random() * (firstName.length - 1))] + ' ' + lastName[Math.round(Math.random() * (firstName.length - 1))];
  wizard.coatColor = coatColors[Math.round(Math.random() * coatColors.length)];
  wizard.eyesColor = eyesColors[Math.round(Math.random() * eyesColors.length)];
  return wizard;
};

// генерация массива с волшебниками
var similarWizards = [];
for (var i = 0; i < SIMILAR_WIZARD_QUANTITY; i++) {
  similarWizards[i] = createRandomWizard(WIZARD_FIRST_NAME, WIZARD_LAST_NAME, COAT_COLORS, EYES_COLORS);
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
