'use client'

import { Label } from '@/api/labels/labels.types'
import { LabelMultiSelect } from './multi-labels-select'

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
    <LabelMultiSelect
      labels={labelData}
      selectedLabels={selectedLabels}
      onSelectionChange={handleSelectionChange}
      placeholder="Select labels for this task..."
    />
  )
}
