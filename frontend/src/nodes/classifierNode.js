// classifierNode.js — routes data to True or False output based on a condition
import { BaseNode } from './BaseNode';

export const ClassifierNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Classifier"
    icon="🔀"
    color="#EA580C"
    fields={[
      {
        name: 'condition',
        label: 'Condition Expression',
        type: 'text',
        defaultValue: data?.condition || '',
        placeholder: 'e.g. value > 100',
      },
    ]}
    handles={[
      { id: 'input', type: 'target', position: 'left',  label: 'Input' },
      { id: 'true',  type: 'source', position: 'right', label: 'True',  style: { top: '35%' } },
      { id: 'false', type: 'source', position: 'right', label: 'False', style: { top: '65%' } },
    ]}
  />
);
