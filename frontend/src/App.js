import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0d0e1a',
      overflow: 'hidden',
    }}>

      {/* ── App Header ── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '52px',
        background: 'rgba(13, 14, 26, 0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        flexShrink: 0,
        zIndex: 100,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 30, height: 30,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px',
            boxShadow: '0 0 16px rgba(99,102,241,0.5)',
          }}>⚡</div>
          <span style={{
            fontSize: '15px',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #818cf8, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.3px',
            fontFamily: 'Inter, sans-serif',
          }}>
            VectorShift
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.18)',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
          }}>
            / Pipeline Builder
          </span>
        </div>

        {/* Status badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '20px',
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 6px #10b981',
          }} />
          <span style={{
            fontSize: '11px',
            color: '#10b981',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          }}>
            Live
          </span>
        </div>
      </header>

      {/* ── Toolbar ── */}
      <PipelineToolbar />

      {/* ── Canvas ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <PipelineUI />
      </div>

      {/* ── Submit Bar ── */}
      <SubmitButton />
    </div>
  );
}

export default App;
