/** @type {import('tailwindcss').Config} */
export const content = [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this path based on your project structure
];
export const theme = {
    extend: {},
};
// eslint-disable-next-line no-undef
export const plugins = [require("daisyui")];
  