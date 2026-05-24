import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700&family=SF+Pro+Text:wght@300;400;500;600&display=swap');

  :root {
    /* Colors - Apple Design System */
    --primary: #0066cc;
    --primary-focus: #0071e3;
    --primary-on-dark: #2997ff;
    --ink: #1d1d1f;
    --body: #1d1d1f;
    --body-on-dark: #ffffff;
    --body-muted: #cccccc;
    --ink-muted-80: #333333;
    --ink-muted-48: #7a7a7a;
    --divider-soft: #f0f0f0;
    --hairline: #e0e0e0;
    --canvas: #ffffff;
    --canvas-parchment: #f5f5f7;
    --surface-pearl: #fafafc;
    --surface-tile-1: #272729;
    --surface-tile-2: #2a2a2c;
    --surface-tile-3: #252527;
    --surface-black: #000000;
    --surface-chip-translucent: #d2d2d7;
    --on-primary: #ffffff;
    --on-dark: #ffffff;
    
    /* Typography Font Families */
    --font-display: 'SF Pro Display', system-ui, -apple-system, sans-serif;
    --font-text: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    
    /* Spacing */
    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 17px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-section: 80px;
    
    /* Radius */
    --radius-none: 0px;
    --radius-xs: 5px;
    --radius-sm: 8px;
    --radius-md: 11px;
    --radius-lg: 18px;
    --radius-pill: 9999px;
    --radius-full: 9999px;
  }

  html, body {
    height: 100%;
  }

  body {
    background: var(--canvas);
    color: var(--body);
    font-family: var(--font-text);
    font-size: 17px;
    line-height: 1.47;
    letter-spacing: -0.374px;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::selection {
    background: var(--primary);
    color: var(--on-primary);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--canvas);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--surface-chip-translucent);
    border-radius: 4px;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.8);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const colors = {
  primary: 'var(--primary)',
  primaryFocus: 'var(--primary-focus)',
  primaryOnDark: 'var(--primary-on-dark)',
  ink: 'var(--ink)',
  body: 'var(--body)',
  bodyOnDark: 'var(--body-on-dark)',
  bodyMuted: 'var(--body-muted)',
  inkMuted80: 'var(--ink-muted-80)',
  inkMuted48: 'var(--ink-muted-48)',
  dividerSoft: 'var(--divider-soft)',
  hairline: 'var(--hairline)',
  canvas: 'var(--canvas)',
  canvasParchment: 'var(--canvas-parchment)',
  surfacePearl: 'var(--surface-pearl)',
  surfaceTile1: 'var(--surface-tile-1)',
  surfaceTile2: 'var(--surface-tile-2)',
  surfaceTile3: 'var(--surface-tile-3)',
  surfaceBlack: 'var(--surface-black)',
  surfaceChipTranslucent: 'var(--surface-chip-translucent)',
  onPrimary: 'var(--on-primary)',
  onDark: 'var(--on-dark)',
}

export const fonts = {
  display: 'var(--font-display)',
  text: 'var(--font-text)',
}

export const radius = {
  none: 'var(--radius-none)',
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  pill: 'var(--radius-pill)',
  full: 'var(--radius-full)',
}

export const spacing = {
  xxs: 'var(--spacing-xxs)',
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  xxl: 'var(--spacing-xxl)',
  section: 'var(--spacing-section)',
}

// Typography Styles
export const typography = {
  heroDisplay: `
    font-family: ${fonts.display};
    font-size: 56px;
    font-weight: 600;
    line-height: 1.07;
    letter-spacing: -0.28px;
  `,
  displayLg: `
    font-family: ${fonts.display};
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0;
  `,
  displayMd: `
    font-family: ${fonts.text};
    font-size: 34px;
    font-weight: 600;
    line-height: 1.47;
    letter-spacing: -0.374px;
  `,
  lead: `
    font-family: ${fonts.display};
    font-size: 28px;
    font-weight: 400;
    line-height: 1.14;
    letter-spacing: 0.196px;
  `,
  leadAiry: `
    font-family: ${fonts.text};
    font-size: 24px;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: 0;
  `,
  tagline: `
    font-family: ${fonts.display};
    font-size: 21px;
    font-weight: 600;
    line-height: 1.19;
    letter-spacing: 0.231px;
  `,
  bodyStrong: `
    font-family: ${fonts.text};
    font-size: 17px;
    font-weight: 600;
    line-height: 1.24;
    letter-spacing: -0.374px;
  `,
  body: `
    font-family: ${fonts.text};
    font-size: 17px;
    font-weight: 400;
    line-height: 1.47;
    letter-spacing: -0.374px;
  `,
  denseLink: `
    font-family: ${fonts.text};
    font-size: 17px;
    font-weight: 400;
    line-height: 2.41;
    letter-spacing: 0;
  `,
  caption: `
    font-family: ${fonts.text};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: -0.224px;
  `,
  captionStrong: `
    font-family: ${fonts.text};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.29;
    letter-spacing: -0.224px;
  `,
  buttonLarge: `
    font-family: ${fonts.text};
    font-size: 18px;
    font-weight: 300;
    line-height: 1.0;
    letter-spacing: 0;
  `,
  buttonUtility: `
    font-family: ${fonts.text};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.29;
    letter-spacing: -0.224px;
  `,
  finePrint: `
    font-family: ${fonts.text};
    font-size: 12px;
    font-weight: 400;
    line-height: 1.0;
    letter-spacing: -0.12px;
  `,
  microLegal: `
    font-family: ${fonts.text};
    font-size: 10px;
    font-weight: 400;
    line-height: 1.3;
    letter-spacing: -0.08px;
  `,
  navLink: `
    font-family: ${fonts.text};
    font-size: 12px;
    font-weight: 400;
    line-height: 1.0;
    letter-spacing: -0.12px;
  `,
}
