import { TLabel } from '@/api/tasks/tasks.types'
import { hexToRgba } from '@/lib/utils'
import React from 'react'

type TodoLabelsTableProps = {
  labels: TLabel[]
}

// Utility function to darken text color
const darkenColor = (hex: string, factor: number = 0.3) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)

  const darken = (value: number) => Math.floor(value * (1 - factor))

  const newR = darken(r).toString(16).padStart(2, '0')
  const newG = darken(g).toString(16).padStart(2, '0')
  const newB = darken(b).toString(16).padStart(2, '0')

  return `#${newR}${newG}${newB}`
}

// Utility function to increase saturation for more vibrant colors
const saturateColor = (hex: string, factor: number = 0.3) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  // Convert RGB to HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Increase saturation
  s = Math.min(1, s * (1 + factor))

  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  // Convert back to hex
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const TodoLabelsList: React.FC<TodoLabelsTableProps> = ({ labels }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label.id}
          className="inline-block rounded-xl px-3 py-1 text-xs font-medium"
          style={{
            color: darkenColor(label.color, 0.4),
            backgroundColor: hexToRgba(saturateColor(label.color, 0.8), 0.2),
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}
