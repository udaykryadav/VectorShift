// outputNode.js
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Output"
    icon="📤"
    color="#0EA5E9"
    fields={[
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: [
          { value: 'Text',  label: 'Text'  },
          { value: 'Image', label: 'Image' },
        ],
      },
    ]}
    handles={[
      { id: 'value', type: 'target', position: 'left' },
    ]}
  />
);
