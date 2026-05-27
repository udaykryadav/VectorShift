// llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="LLM"
    icon="🤖"
    color="#7C3AED"
    fields={[]}
    handles={[
      { id: 'system',   type: 'target', position: 'left',  label: 'System',   style: { top: '33%' } },
      { id: 'prompt',   type: 'target', position: 'left',  label: 'Prompt',   style: { top: '67%' } },
      { id: 'response', type: 'source', position: 'right', label: 'Response' },
    ]}
  />
);
