// textNode.js
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Text"
    icon="📝"
    color="#D97706"
    fields={[
      {
        name: 'text',
        label: 'Content',
        type: 'textarea',
        defaultValue: data?.text || '{{input}}',
        placeholder: 'Enter text or use {{variable}}',
        rows: 3,
      },
    ]}
    handles={[
      { id: 'output', type: 'source', position: 'right' },
    ]}
  />
);
