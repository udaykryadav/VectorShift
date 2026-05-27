// apiNode.js — configures an HTTP API call
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="API Request"
    icon="🌐"
    color="#0891B2"
    fields={[
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: data?.method || 'GET',
        options: [
          { value: 'GET',    label: 'GET'    },
          { value: 'POST',   label: 'POST'   },
          { value: 'PUT',    label: 'PUT'    },
          { value: 'PATCH',  label: 'PATCH'  },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      {
        name: 'url',
        label: 'Endpoint URL',
        type: 'text',
        defaultValue: data?.url || '',
        placeholder: 'https://api.example.com/data',
      },
    ]}
    handles={[
      { id: 'body',     type: 'target', position: 'left',  label: 'Body'     },
      { id: 'response', type: 'source', position: 'right', label: 'Response' },
    ]}
  />
);
