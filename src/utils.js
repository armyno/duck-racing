// `localStorage` functions shouldn't be here, but I didn't know where to put it.

export const clearLocal = () => localStorage.clear();

export const darkenColor = (hex, dim = 0.1) => {
    const { r, g, b } = hexToRbg(hex);
    return rgbToHex(r * (1 - dim), g * (1 - dim), b * (1 - dim));
}

export const getRandomInt = (min, max) => Math.round(Math.random() * max) + min; // Returns a random integer value in given range from parameters

export const hexToRbg = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

export const readLocal = (key) => JSON.parse(localStorage.getItem(key)); // Reads the value of given key from localStorage and returns

export const rgbToHex = (r, g, b) => `#` + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

export const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m)); // Returns a Promise object,it resolves when the given timeout is over

export const writeLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value)); // Writes the given value to given key in localStorage
