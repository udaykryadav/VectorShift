// textNode.js
// Part 3: Auto-resizing text node with dynamic {{variable}} handles
// ---------------------------------------------------------------

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

// Matches {{ validJSVariableName }} with optional whitespace
const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  const regex = new RegExp(VAR_REGEX.source, 'g');
  let match;
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
};

// Estimate node width based on the longest line of text
const calcWidth = (text) => {
  const lines  = text.split('\n');
  const maxLen = Math.max(...lines.map(l => l.length), 15);
  // ~7.2px per char at 12px Inter, plus padding
  return Math.max(220, Math.min(520, maxLen * 7.2 + 60));
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const variables = extractVariables(text);
  const textareaRef = useRef(null);

  // Auto-resize textarea height on every text change
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const nodeWidth = calcWidth(text);

  return (
    <div className="base-node" style={{ width: nodeWidth }}>

      {/* ── Dynamic variable handles (left) ── */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: variables.length === 1
              ? '50%'
              : `${((i + 1) / (variables.length + 1)) * 100}%`,
          }}
        />
      ))}

      {/* ── Header ── */}
      <div className="node-header" style={{ background: '#B45309' }}>
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
      </div>

      {/* ── Variable port labels ── */}
      {variables.length > 0 && (
        <div className="node-ports">
          <div className="ports-left">
            {variables.map(v => (
              <span key={v} className="port-label">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
          <div className="ports-right">
            <span className="port-label">output</span>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Content</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type text or use {{variable}}"
            style={{
              resize: 'none',
              overflow: 'hidden',
              minHeight: '68px',
            }}
          />
        </div>

        {/* Variable chip hints */}
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map(v => (
              <span key={v} style={{
                padding: '2px 8px',
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.35)',
                borderRadius: '4px',
                fontSize: '10px',
                color: '#a5b4fc',
                fontFamily: 'monospace',
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Source handle (right) ── */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
