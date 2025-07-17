'use client'

import { LabelMultiSelect } from './multi-labels-select'

type UserRef = {
  id: string
  name: string
  addedOn: string | null
  tasksAssignedCount: number | null
}

type Label = {
  id: string
  name: string
  color: string
  createdAt: string
  updatedAt: string | null
  createdBy: UserRef
  updatedBy: UserRef | null
}

type SelectLabelsProps = {
  labelData: Label[]
  value: string[] // array of label IDs
  onChange: (ids: string[]) => void
}

export function SelectLabels({ labelData, value, onChange }: SelectLabelsProps) {
  const selectedLabels = labelData.filter((label) => value?.includes(label.id))

  const handleSelectionChange = (labels: Label[]) => {
    onChange(labels.map((label) => label.id))
  }

  return (
    <div className="mx-auto space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <p className="min-w-28 text-sm">Labels</p>
          <LabelMultiSelect
            labels={labelData}
            selectedLabels={selectedLabels}
            onSelectionChange={handleSelectionChange}
            placeholder="Select labels for this task..."
          />
        </div>
      </div>
    </div>
  )
}
