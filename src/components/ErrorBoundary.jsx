import { Component } from 'react';

/* ── ERROR BOUNDARY ──
   Catches any runtime error thrown during render anywhere in the tree
   below it and shows a real fallback UI instead of an unstyled blank
   white page (which is what React leaves behind by default when a
   component throws — exactly what happened during development when
   HudDialogue was accidentally removed). In production this means a
   visitor sees a graceful "something went wrong" screen with a reload
   button instead of a dead page, and the actual error still logs to
   the console for debugging. */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Arcanum site crashed:', error, info?.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '20px', background: '#150f0a', color: '#f2e8d8',
          fontFamily: "'Inter', sans-serif", textAlign: 'center', padding: '24px',
        }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#b5804a', textTransform: 'uppercase' }}>Arcanum</div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300 }}>Something went wrong.</h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(242,232,216,0.6)', maxWidth: '420px', lineHeight: 1.6 }}>
            This page hit an unexpected error. Reloading usually fixes it — if it keeps happening, please let us know.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '8px', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#f2e8d8', border: '1px solid rgba(181,128,74,0.4)', background: 'transparent',
              padding: '14px 32px', cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
