interface ProgressIndicatorProps {
  total: number
  completed: number
  label?: string
}

export function ProgressIndicator({ total, completed, label = "Progreso Total" }: ProgressIndicatorProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{
            width: `${total === 0 ? 0 : (completed / total) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
