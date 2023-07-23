export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (height * 4));
  const x = Math.floor(i / 4 - y * width);
  const channel = i % 4;

  
};
