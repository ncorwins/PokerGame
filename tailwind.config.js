/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"], // Update the paths to match your project structure
    theme: {
        extend: {}, // Add your Tailwind customizations here
    },
    plugins: [require("daisyui"), require("framer-motion")], // Include DaisyUI as a plugin
    daisyui: {
        themes: ["black"],
    },
};