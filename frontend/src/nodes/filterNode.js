// filterNode.js — filters data based on a condition
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Filter"
    icon="🔍"
    color="#DC2626"
    fields={[
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: data?.condition || 'contains',
        options: [
          { value: 'contains',    label: 'Contains'     },
          { value: 'equals',      label: 'Equals'       },
          { value: 'startsWith',  label: 'Starts With'  },
          { value: 'endsWith',    label: 'Ends With'    },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan',    label: 'Less Than'    },
        ],
      },
      {
        name: 'value',
        label: 'Match Value',
        type: 'text',
        defaultValue: data?.value || '',
        placeholder: 'e.g. hello',
      },
    ]}
    handles={[
      { id: 'data',     type: 'target', position: 'left',  label: 'Data'     },
      { id: 'filtered', type: 'source', position: 'right', label: 'Filtered' },
    ]}
  />
);
