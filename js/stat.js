'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var PADDING = 30;
var TEXT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var WHITE = '#ffffff';
var BLACK = '#000000';
var SHADOW = 'rgba(0, 0, 0, 0.7)';
var RED = 'rgba(255, 0, 0, 1)';
var SL_CHANNELS_MAX = 90;
var SATURATION_MIN = 20;
var BRIGHTNESS_MIN = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i <= arr.length - 1; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomSaturationAndLightness = function (sMin, bMin, max) {
  var saturation = Math.random() * (max - sMin) + sMin;
  var brightness = Math.random() * (max - bMin) + bMin;
  return 'hsl(240, ' + saturation + '%, ' + brightness + '%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = BLACK;
  ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + TEXT_GAP);

  var maxTime = getMaxElement(times);

  var scaleBarHeight = function (index) {
    return (times[index] * BAR_HEIGHT) / maxTime;
  };

  var getBarX = function (index) {
    return CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index;
  };

  var getBarY = function (index) {
    return (CLOUD_HEIGHT - PADDING - ((times[index] * BAR_HEIGHT) / maxTime));
  };

  var getScoreX = function (index) {
    return CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index;
  };

  var getScoreY = function (index) {
    return getBarY(index) - GAP;
  };

  var getNamesX = function (index) {
    return CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * index;
  };

  for (var i = 0; i <= names.length - 1; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = RED;
    } else {
      ctx.fillStyle = getRandomSaturationAndLightness(SATURATION_MIN, BRIGHTNESS_MIN, SL_CHANNELS_MAX);
    }

    ctx.fillRect(getBarX(i), getBarY(i), BAR_WIDTH, scaleBarHeight(i));
    ctx.fillStyle = BLACK;
    ctx.fillText(Math.round(times[i]), getScoreX(i), getScoreY(i));
    ctx.fillText(names[i], getNamesX(i), CLOUD_HEIGHT - GAP);
  }
};
