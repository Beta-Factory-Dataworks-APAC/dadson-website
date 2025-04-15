/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#00B4E1',
        'primary-navy': '#03033D',
        'primary-dark': '#101B21',
        'primary-white': '#FFFFFF',
        'secondary-light-gray': '#8B8991',
        'secondary-medium-gray': '#B3B0BE',
        'secondary-dark-gray': '#707C83',
        'secondary-very-light-gray': '#E3E3E3',
        'bg-dark': '#030709'
      },
      fontFamily: {
        'clash': ['Clash Display', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif']
      },
      borderRadius: {
        'extra-large': '120px'
      },
      backdropBlur: {
        'xs': '6px',
        'xxl': '254px'
      },
      boxShadow: {
        'primary-button': '0px 4px 34px 0px rgba(0, 180, 225, 0.15)',
        'form': '0px 4px 50px rgba(0, 0, 0, 0.03)'
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'marquee-slower': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontSize: {
        'headline': ['80px', {
          lineHeight: '1.125',
          fontWeight: '500'
        }],
        'section-header': ['42px', {
          lineHeight: '1.19',
          fontWeight: '500'
        }],
        'button': ['18px', {
          lineHeight: '1.78',
          fontWeight: '600'
        }],
        'body': ['18px', {
          lineHeight: '1.33',
          fontWeight: '500'
        }],
        'secondary': ['24px', {
          lineHeight: '1.35',
          fontWeight: '500'
        }],
        'footer': ['16px', {
          lineHeight: '1.35',
          fontWeight: '400'
        }]
      },
      backgroundColor: {
        'primary-button': 'rgba(0, 180, 225, 0.9)',
        'secondary-button': 'rgba(255, 255, 255, 0.1)',
        'active-nav': 'rgba(255, 255, 255, 0.05)',
        'inactive-nav': 'rgba(0, 0, 0, 0.05)'
      },
      borderColor: {
        'secondary-button': 'rgba(247, 247, 247, 0.1)',
        'outline-button': 'rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark-text'),
            h1: {
              fontFamily: theme('fontFamily.clash'),
              color: theme('colors.dark-text'),
              fontWeight: '500',
            },
            h2: {
              fontFamily: theme('fontFamily.clash'),
              color: theme('colors.dark-text'),
              fontWeight: '500',
            },
            h3: {
              fontFamily: theme('fontFamily.clash'),
              color: theme('colors.dark-text'),
              fontWeight: '500',
            },
            a: {
              color: theme('colors.blue'),
              '&:hover': {
                color: theme('colors.blue'),
                textDecoration: 'underline',
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.blue'),
              color: theme('colors.gray-text'),
              fontStyle: 'normal',
              fontWeight: '500',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 