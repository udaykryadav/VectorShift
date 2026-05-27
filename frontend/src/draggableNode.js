// draggableNode.js

export const DraggableNode = ({ type, label, color = '#1C2536' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '90px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        background: color,
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        userSelect: 'none',
      }}
      draggable
    >
      <span style={{
        color: '#fff',
        fontSize: '12px',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.2px',
      }}>
        {label}
      </span>
    </div>
  );
};