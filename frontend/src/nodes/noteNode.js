// noteNode.js — sticky note for pipeline annotations
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Note"
    icon="🗒️"
    color="#4B5563"
    fields={[
      {
        name: 'content',
        label: 'Annotation',
        type: 'textarea',
        defaultValue: data?.content || '',
        placeholder: 'Add a comment or note...',
        rows: 4,
      },
    ]}
    handles={[]}
  />
);
