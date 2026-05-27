// BaseNode.js
// Core abstraction for all pipeline nodes.
// Accepts config props so new nodes can be created with zero boilerplate.

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({
  id,
  title,
  color = '#7C3AED',
  icon = '',
  fields = [],
  handles = [],
  children,
}) => {
  // Build initial state from field configs
  const [fieldValues, setFieldValues] = useState(() => {
    const init = {};
    fields.forEach(f => {
      init[f.name] = f.defaultValue !== undefined ? f.defaultValue : '';
    });
    return init;
  });

  const handleChange = (name, value) => {
    setFieldValues(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <select
              className="node-input"
              value={fieldValues[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
            >
              {(field.options || []).map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <textarea
              className="node-textarea"
              value={fieldValues[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              rows={field.rows || 3}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <input
              type="number"
              className="node-input"
              value={fieldValues[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          </div>
        );

      default: // 'text'
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <input
              type="text"
              className="node-input"
              value={fieldValues[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          </div>
        );
    }
  };

  const leftHandles  = handles.filter(h => h.position === 'left');
  const rightHandles = handles.filter(h => h.position === 'right');
  const hasPortLabels = [...leftHandles, ...rightHandles].some(h => h.label);

  return (
    <div className="base-node">
      {/* ── Left Handles ── */}
      {leftHandles.map((h, i) => (
        <Handle
          key={h.id}
          type={h.type || 'target'}
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={
            h.style ||
            (leftHandles.length > 1
              ? { top: `${((i + 1) / (leftHandles.length + 1)) * 100}%` }
              : {})
          }
        />
      ))}

      {/* ── Header ── */}
      <div className="node-header" style={{ background: color }}>
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
      </div>

      {/* ── Port Labels ── */}
      {hasPortLabels && (
        <div className="node-ports">
          <div className="ports-left">
            {leftHandles.map(h => h.label
              ? <span key={h.id} className="port-label">{h.label}</span>
              : null
            )}
          </div>
          <div className="ports-right">
            {rightHandles.map(h => h.label
              ? <span key={h.id} className="port-label">{h.label}</span>
              : null
            )}
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="node-body">
        {fields.map(renderField)}
        {children}
      </div>

      {/* ── Right Handles ── */}
      {rightHandles.map((h, i) => (
        <Handle
          key={h.id}
          type={h.type || 'source'}
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={
            h.style ||
            (rightHandles.length > 1
              ? { top: `${((i + 1) / (rightHandles.length + 1)) * 100}%` }
              : {})
          }
        />
      ))}
    </div>
  );
};
