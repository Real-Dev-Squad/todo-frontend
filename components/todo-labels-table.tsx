import { hexToRgba } from '@/lib/utils'
import React from 'react'

type Label = {
  id: string
  name: string
  color: string
}

type TodoLabelsTableProps = {
  labels: Label[]
}

export const TodoLabelsTable: React.FC<TodoLabelsTableProps> = ({ labels }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {labels.map((label) => (
        <span
          key={label.id}
          style={{
            color: label.color,
            backgroundColor: hexToRgba(label.color, 0.3),
            borderRadius: '12px',
            padding: '4px 12px',
            fontWeight: 500,
            fontSize: '0.8em',
            display: 'inline-block',
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}
