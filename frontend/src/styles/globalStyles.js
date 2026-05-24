import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg: #ccccd3;
    --bg2: #91dd87;
    --bg3: #0b3a13;
    --border: #2a2a3a;
    --accent: #11ad19;
    --accent2: #702af1;
    --danger: #ff4757;
    --success: #2ed573;
    --warn: #ffa502;
    --text: #111113;
    --text-muted: #313133;
    --text-dim: #28282b;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
    --radius: 24px;
    --radius-lg: 24px;
  }

  html, body {
    height: 100%;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::selection {
    background: var(--accent);
    color: #000;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
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
  bg: 'var(--bg)',
  bg2: 'var(--bg2)',
  bg3: 'var(--bg3)',
  border: 'var(--border)',
  accent: 'var(--accent)',
  accent2: 'var(--accent2)',
  danger: 'var(--danger)',
  success: 'var(--success)',
  warn: 'var(--warn)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  textDim: 'var(--text-dim)',
}

export const fonts = {
  display: "var(--font-display)",
  mono: "var(--font-mono)",
}

export const radius = {
  sm: 'var(--radius)',
  lg: 'var(--radius-lg)',
}
