export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;

  // Calculate saturation based on x position
  const saturation = x / width;

  // Calculate value (lightness) based on y position
  const value = 1 - y / height;

  // Calculate RGB components directly using hue, saturation, and value
  let red, green, blue;

  if (hue <= 0.5) {
    red = value * (1 - saturation + saturation * hue);
    green = value * (1 + saturation - saturation * 2 * hue);
    blue = value * saturation;
  } else {
    red = value * (1 + saturation - saturation * (1 - hue));
    green = value * saturation;
    blue = value * (1 - saturation + saturation * 2 * (1 - hue));
  }

  if (channel === 0) return red * 255;
  if (channel === 1) return green * 255;
  if (channel === 2) return blue * 255;
  if (channel === 3) return (y+x)%(width+height); // Full opacity
};
