export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;

  // Calculate saturation and lightness based on x and y positions
  const saturation = x / width;
  const lightness = 1 - y / height;

  let red, green, blue;

  // Control the rgb value by using hue to cover all possible combination of rgb values.
  if (hue <= 0.165) {
    red = lightness * (1 - saturation + saturation * hue);
    green = lightness * (1 + saturation - saturation * 2 * hue);
    blue = lightness * saturation;
  } else if (hue <= .33) {
    red = lightness * (1 - saturation + saturation * 2 * (1 - hue));
    green = lightness * (1 + saturation - saturation * (1 - hue));
    blue = lightness * saturation;
  } else if (hue <= .495) {
    red = lightness * saturation;
    green = lightness * (1 + saturation - saturation * (1 - hue));
    blue = lightness * (1 - saturation + saturation * 2 * (1 - hue));
  } else if (hue <= .66) {
    red = lightness * saturation;
    green = lightness * (1 - saturation + saturation * 2 * (1 - hue));
    blue = lightness * (1 + saturation - saturation * (1 - hue));
  } else if (hue <= .825) {
    red = lightness * (1 + saturation - saturation * (1 - hue));
    green = lightness * saturation;
    blue = lightness * (1 - saturation + saturation * 2 * (1 - hue));
  } else if (hue <= 1) {
    red = lightness * (1 - saturation + saturation * 2 * (1 - hue));
    green = lightness * saturation;
    blue = lightness * (1 + saturation - saturation * (1 - hue));
  }

  if (channel === 0) return red * 255;
  if (channel === 1) return green * 255;
  if (channel === 2) return blue * 255;
  if (channel === 3) return (x + y) % imageDataLength; // diagonally increasing opacity
};
