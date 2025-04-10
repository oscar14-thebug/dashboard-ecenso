import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface ChartItem {
  name: string
  value: number
  color: string
}

interface MotivosChartProps {
  data: ChartItem[]
}

export function MotivosChart({ data }: MotivosChartProps) {
  const filteredData = data.filter((item) => item.value > 0)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (filteredData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No hay datos para mostrar</p>
      </div>
    )
  }

  if (filteredData.length === 1) {
    const item = filteredData[0]
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-4 text-center">
          <p className="text-lg font-medium">100% {item.name}</p>
          <p className="text-muted-foreground">{item.value} viviendas</p>
        </div>
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-white font-bold text-xl">100%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => (percent > 0.05 ? `${(percent * 100).toFixed(1)}%` : "")}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                const percentage = ((value / total) * 100).toFixed(1)
                return [`${value} viviendas (${percentage}%)`, name]
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda personalizada debajo del gráfico */}
      <div className="mt-4">
        <ul className="flex flex-col gap-y-1 text-xs">
          {data.map((item, index) =>
            item.value > 0 ? (
              <li key={`legend-${index}`} className="flex items-start">
                <span
                  className="inline-block w-3 h-3 mr-1 mt-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span>
                  <strong>{item.value}</strong> ({((item.value / total) * 100).toFixed(1)}%) - {item.name}
                </span>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  )
}
