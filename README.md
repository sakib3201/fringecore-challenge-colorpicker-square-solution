# fringecore-challenge-colorpicker-square-solution by Sakib Ahamed Shahon

**Jump to section :**

* [How to run](#how-to-run).
* [Thoughts behind the solution](#solution)
* [Possible Improvements](#improvements)

<a id="how-to-run"></a>

## How to run

To run the solution simply clone the repo. Change your directory to it And run the below commands:

```console
npm install
npm run dev
```
<a id="solution"></a>

## Thoughts behind the solution

My first thought was to break this challenge into small manageable chunks. The partials section of the challenge helped a lot in this regard. I broke the problem into the below steps.

1. Get value for saturation with relation to x co-ordinate.
2. Get lightness (how light or dark the color will be) with relation to y co-ordinate.
3. Establish a relation to the rgb values with hue to make the color dynamic.

For _step-1_, since the saturation was increasing with `x` co-ordinate values I established the relation `x / width` so at the leftmost or at origin the saturation will be zero and at `x = width` or at leftmost point along the value will be 1.

Similarly for _step-2_, by establishing the relation of lightness of color I used the relation `1 - y / height` as it would indicate how far the point is along the y axis from origin.

In both cases I divided the values by width for x axis and height for y axis to get the lightness and saturation relative to the size of the color square. (To make sure the width and height is dynamic for any sized squares).

For _step-3_, since the hue value would be used for setting the color dynamically and is within the range of 0 to 1, I decided to go with the **HSL to RGB conversion equation** to set the value red , green and blue color ratio. The  The reason I calculated ration first instead of a hard value between 0 to 255 is because a relative scale keeps the implementation cleaner and more flexible. I considered the rgb values into 6 segments inside the if-else ladder to map all possible color combination to a pixel in square for each hue value. At this stage I also set the value for opacity for that small reduction in opacity in the top left corner in the example picture in challenge description.

Finally before returning the color values to appropriate channels I multiplied the value by 255 to get the appropriate rgb values.

<a id="improvements"></a>

## Possible improvements

The implementation can be made cleaner if we put the task of assigning rgb values from saturation , lightness and hue into a separate function . We can also reduce code duplication by assigning the values of red , green and blue values through a loop or combination creating function instead of the if else ladder. As throughout the ladder we simply added all possible combination for different ranges of values of the hue.

We could also drastically reduce the amount of code written if we used the Math library in js and made a pure mathmatecal implementation of HSL to RGB conversion like below:

```js
const HSLToRGB = (hue, saturation, lightness) => {
  const k = n => (n + hue / 30) % 12; // n is the nth segment of hue values
  const a = saturation * Math.min(lightness, 1 - lightness); 
  const f = n =>  lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

HSLToRGB(13, 100, 11); // [56.1, 12.155, 0] -> The returend RGB values
```

This approach however reduces the readability of code to a certain extent and needs an extra library. That's why I decided to not use it.