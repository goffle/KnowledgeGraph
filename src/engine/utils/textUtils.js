export function createTextSprite(message, position, parameters) {
  if (parameters === undefined) parameters = {};
  const fontface = parameters.hasOwnProperty('fontface') ? parameters['fontface'] : 'Arial';
  const fontsize = parameters.hasOwnProperty('fontsize') ? parameters['fontsize'] : 70;
  const borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters['borderThickness'] : 4;
  const borderColor = parameters.hasOwnProperty('borderColor') ? parameters['borderColor'] : { r: 255, g: 0, b: 0, a: 1.0 };
  const backgroundColor = parameters.hasOwnProperty('backgroundColor') ? parameters['backgroundColor'] : { r: 255, g: 255, b: 255, a: 1.0 };
  const textColor = parameters.hasOwnProperty('textColor') ? parameters['textColor'] : { r: 0, g: 0, b: 0, a: 1.0 };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = 'Bold ' + fontsize + 'px ' + fontface;

  const metrics = context.measureText(message);
  const textWidth = metrics.width;

  context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' + backgroundColor.b + ',' + backgroundColor.a + ')';
  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + borderColor.a + ')';

  context.lineWidth = borderThickness;

  const width = (textWidth + borderThickness * 2) * 1.1;
  const height = fontsize * 1.4 + borderThickness * 2;

  roundRect(context, borderThickness / 2, borderThickness / 2, width, height, 8);

  context.fillStyle = 'rgba(' + textColor.r + ', ' + textColor.g + ', ' + textColor.b + ', 1.0)';
  context.fillText(message, borderThickness * 2, fontsize + borderThickness);

  let texture = new THREE.Texture(canvas);

  texture.minFilter = THREE.LinearFilter; // NearestFilter;
  texture.needsUpdate = true;

  let spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  let sprite = new THREE.Sprite(spriteMaterial);

  sprite.position.set(position.x + 5, 1, position.z + 4);
  sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);

  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
