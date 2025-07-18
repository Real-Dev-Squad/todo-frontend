import { TLabel } from '@/api/tasks/tasks.types'
import { hexToRgba } from '@/lib/utils'
import React from 'react'

type TodoLabelsTableProps = {
  labels: TLabel[]
}

export const TodoLabelsList: React.FC<TodoLabelsTableProps> = ({ labels }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label.id}
          className="inline-block rounded-xl px-3 py-1 text-xs font-medium"
          style={{
            color: label.color,
            backgroundColor: hexToRgba(label.color, 0.3),
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}
