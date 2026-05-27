// toolbar.js
import { DraggableNode } from './draggableNode';

const NODE_GROUPS = [
  {
    label: 'Core',
    nodes: [
      { type: 'customInput',  label: 'Input',      color: '#059669' },
      { type: 'customOutput', label: 'Output',     color: '#0EA5E9' },
      { type: 'llm',          label: 'LLM',        color: '#7C3AED' },
      { type: 'text',         label: 'Text',       color: '#D97706' },
    ],
  },
  {
    label: 'Logic',
    nodes: [
      { type: 'filter',     label: 'Filter',     color: '#DC2626' },
      { type: 'math',       label: 'Math',       color: '#7C3AED' },
      { type: 'classifier', label: 'Classifier', color: '#EA580C' },
    ],
  },
  {
    label: 'Utility',
    nodes: [
      { type: 'api',  label: 'API Request', color: '#0891B2' },
      { type: 'note', label: 'Note',        color: '#4B5563' },
    ],
  },
];

export const PipelineToolbar = () => (
  <div style={{
    padding: '12px 20px',
    background: '#12131f',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  }}>
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {NODE_GROUPS.map(group => (
        <div key={group.label}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
          }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {group.nodes.map(n => (
              <DraggableNode key={n.type} type={n.type} label={n.label} color={n.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
