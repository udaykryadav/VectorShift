// inputNode.js
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Input"
    icon="📥"
    color="#059669"
    fields={[
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ]}
    handles={[
      { id: 'value', type: 'source', position: 'right' },
    ]}
  />
);
