// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const resp = await fetch('http://localhost:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });
      const data = await resp.json();

      // ── User-friendly alert ──────────────────────────────────────────────
      const { num_nodes, num_edges, is_dag } = data;
      if (num_nodes !== undefined) {
        const dagLabel = is_dag ? '✅ Yes — this pipeline is a valid DAG.' : '❌ No — this pipeline contains a cycle.';
        alert(
          `📊 Pipeline Analysis\n` +
          `────────────────────\n` +
          `🔵 Nodes   : ${num_nodes}\n` +
          `🔗 Edges   : ${num_edges}\n` +
          `🔄 Is DAG  : ${dagLabel}`
        );
      }
      // ────────────────────────────────────────────────────────────────────

      setResult({ ok: true, data });
    } catch {
      setResult({ ok: false, message: 'Could not reach backend.' });
    } finally {
      setLoading(false);
    }
  };

  const resultText = () => {
    if (!result) return null;
    if (!result.ok) return result.message;
    const { num_nodes, num_edges, is_dag } = result.data;
    if (num_nodes !== undefined) {
      return `Nodes: ${num_nodes}  ·  Edges: ${num_edges}  ·  DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`;
    }
    return JSON.stringify(result.data);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '10px 24px',
      background: 'rgba(13, 14, 26, 0.97)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
      flexShrink: 0,
    }}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '9px 28px',
          background: loading
            ? 'rgba(99,102,241,0.4)'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.3px',
          transition: 'transform 0.15s, box-shadow 0.15s',
          boxShadow: loading ? 'none' : '0 4px 18px rgba(99,102,241,0.4)',
        }}
        onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.5)'; }}}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 18px rgba(99,102,241,0.4)'; }}
      >
        {loading ? '⏳ Analyzing…' : '⚡ Submit Pipeline'}
      </button>

      {result && (
        <div style={{
          padding: '7px 16px',
          background: result.ok
            ? 'rgba(99,102,241,0.1)'
            : 'rgba(239,68,68,0.1)',
          border: `1px solid ${result.ok ? 'rgba(99,102,241,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: '8px',
          fontSize: '12px',
          color: result.ok ? '#a5b4fc' : '#f87171',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.2px',
          animation: 'fadeIn 0.2s ease',
        }}>
          {resultText()}
        </div>
      )}
    </div>
  );
};
