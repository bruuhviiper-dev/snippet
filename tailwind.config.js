import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                accent: '#A8FF3E',
                surface: {
                    light: '#F8F9FA',
                    dark: '#161616',
                },
                background: {
                    light: '#FFFFFF',
                    dark: '#0D0D0D',
                }
            }
        },
    },

    plugins: [forms],
};
