'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var WHITE = '#ffffff';
var BLACK = '#000000';
var RED = 'rgba(255, 0, 0, 1)';


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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = BLACK;
  ctx.fillText('Ура, вы победили!', CLOUD_X + 3 * GAP, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 3 * GAP, CLOUD_Y + 5 * GAP);
  var maxTime = getMaxElement(times);

  for (var i = 0; i <= names.length - 1; i++) {
    var barY = (CLOUD_HEIGHT - 3 * GAP - ((times[i] * BAR_HEIGHT) / maxTime));
    var scoreY = barY - GAP;
    if (names[i] === 'Вы') {
      ctx.fillStyle = RED;
    } else {
      var r = Math.round(Math.random() * 255);
      var g = r;
      ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + '255)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, barY, BAR_WIDTH, (times[i] * BAR_HEIGHT) / maxTime);
    ctx.fillStyle = BLACK;
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, scoreY);
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);
  }
};
