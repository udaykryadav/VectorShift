// mathNode.js — performs math operations on two inputs
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Math"
    icon="➕"
    color="#7C3AED"
    fields={[
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        defaultValue: data?.operator || 'add',
        options: [
          { value: 'add',      label: 'Add  (A + B)'      },
          { value: 'subtract', label: 'Subtract  (A − B)' },
          { value: 'multiply', label: 'Multiply  (A × B)' },
          { value: 'divide',   label: 'Divide  (A ÷ B)'   },
          { value: 'modulo',   label: 'Modulo  (A % B)'   },
          { value: 'power',    label: 'Power  (A ^ B)'    },
        ],
      },
    ]}
    handles={[
      { id: 'a',      type: 'target', position: 'left',  label: 'A',      style: { top: '35%' } },
      { id: 'b',      type: 'target', position: 'left',  label: 'B',      style: { top: '65%' } },
      { id: 'result', type: 'source', position: 'right', label: 'Result' },
    ]}
  />
);
