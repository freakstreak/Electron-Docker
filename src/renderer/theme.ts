import { extendTheme } from '@chakra-ui/react';

const tokens = {
  colors: {
    page: {
      bg: '#F5F5F5',
    },
    primary: {
      '50': '#F6FAF9',
      '100': '#BDF9F4',
      '200': '#93F6ED',
      '300': '#69F2E6',
      '400': '#3FEEDF',
      '500': '#0D9488',
      '600': '#10BCAC',
      '700': '#0F766E',
      '800': '#085E56',
      '900': '#115E59',
    },
    neutral: {
      regular: '#404040',
      medium: '#AEAEAE',
      light: '#F6FAF9',
    },
    text: {
      regular: '#222020',
    },
    danger: {
      button: '#CD0404',
    },
  },
};

const theme = extendTheme({
  colors: {
    ...tokens.colors,
  },
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Open Sans', sans-serif",
    mono: "'Open Sans', sans-serif",
  },
  components: {
    Text: {
      color: tokens.colors.text.regular,
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        fontSize: 4,
        fontWeight: 700,
        padding: '12px 24px',
        colorScheme: 'primary',
        borderRadius: '8px',
        lineHeight: '27px',
        variant: 'primary',
      },
      variants: {
        primary: {
          background: tokens.colors.primary['500'],
          border: `1px solid ${tokens.colors.primary['500']}`,
          color: 'white',
          _hover: {
            background: tokens.colors.primary['700'],
            border: `1px solid ${tokens.colors.primary['700']}`,
          },
        },
        secondary: {
          background: 'white',
          border: `1px solid ${tokens.colors.primary['500']}`,
          color: tokens.colors.primary['500'],
          _hover: {
            background: tokens.colors.primary['50'],
            border: `1px solid ${tokens.colors.primary['700']}`,
          },
        },
        tertiary: {
          background: 'white',
          color: tokens.colors.text.regular,
          border: `1px solid ${tokens.colors.neutral.medium}`,
          textTranform: 'unset',
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
