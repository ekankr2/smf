/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      spacing: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%'
      },
      screens: {
        esa: '310px',
        xxs: '340px',
        xs: '360px',
        xs2: '369px',
        smd: '375px',
        smd2: '768px',
        md2: '800px'
      },
      maxWidth: {
        '1200': '1200px'
      },
      fontFamily: {
        pretendard: ["Pretendard Variable", "Pretendard"],
        Pretendard: ["Pretendard Variable", "Pretendard"]
      },
      fontSize: {
        '10': ["0.625rem", "15px"],
        '11': ["0.688rem", "16.5px"],
        '12': ["0.75rem", "18px"],
        '14': ["0.875rem", "21px"],
        '16': ["1rem", "24px"],
        '18': ["1.125rem", "27px"],
        '21': ["1.313rem", "31.5px"],
        '22': ["1.375rem", "33px"],
        '24': ["1.5rem", "36px"],
        '25': ["1.563rem", "37.5px"],
        '26': ["1.625rem", "39px"],
        '28': ["1.75rem", "40px"],
        '30': ["1.875rem", "45px"],
        '36': ["2.25rem", "54px"],
        '38': ["2.375rem", "57px"],
        '40': ["2.5rem", "60px"],
        '50': ["3.125rem", "75px"]
      },
      fontWeight: {
        regular: '400'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      width: {
        '17.5': '4.375rem'
      },
      height: {
        '17.5': '4.375rem'
      },
      padding: {
        '15': '3.75rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem'
      },
      margin: {
        '15': '3.75rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem'
      },
      colors: {
        main: '#bf1822',
        txt: {
          '01': '#222222',
          '02': '#606060',
          '03': '#737373',
          '04': '#B7CFFF',
          '05': '#61DB92',
          '06': '#B0B0BA'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'zoom-in': {
          from: {
            transform: 'scale(1)'
          },
          to: {
            transform: 'scale(3)'
          }
        },
        animation: {
          'zoom-in': 'zoom-in 5s ease-in-out forwards'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("autoprefixer"), require("tailwindcss-animate")],
};
