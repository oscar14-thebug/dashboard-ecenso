"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Clock, CheckCircle, AlertCircle, Menu, UserCheck } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { useCensusData } from "@/hooks/useCensusData"
import { MetricCard } from "@/components/ui/metric-card"
import { StatusChart } from "@/components/ui/status-chart"
import { MotivosChart } from "@/components/ui/motivos-chart"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { data, error } = useCensusData()

  // Datos para el gráfico de estados
  const estadosChartData = data
    ? [
        { name: data.descripcionEstados[1], value: data.resumenEstados.noIniciaron, color: "#f97316" },
        { name: data.descripcionEstados[2], value: data.resumenEstados.enProgreso, color: "#3b82f6" },
        { name: data.descripcionEstados[3], value: data.resumenEstados.autocensadas, color: "#22c55e" },
        { name: data.descripcionEstados[4], value: data.resumenEstados.presencial, color: "#a855f7" },
      ]
    : []

  // Datos para el gráfico de motivos
  const motivosChartData = data
    ? [
        { name: data.descripcionMotivos[1], value: data.motivosEntrega[1], color: "#ec4899" },
        { name: data.descripcionMotivos[2], value: data.motivosEntrega[2], color: "#f43f5e" },
        { name: data.descripcionMotivos[3], value: data.motivosEntrega[3], color: "#06b6d4" },
        { name: data.descripcionMotivos[4], value: data.motivosEntrega[4], color: "#14b8a6" },
      ]
    : []

  // Calcular porcentajes para mostrar en la descripción
  const getPercentage = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) + "%" : "0%"
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar inSheet={true} />
          </SheetContent>
        </Sheet>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Censo en Línea de los Censos Nacionales 2025: XIII de Población, VII de Vivienda y IV de Comunidades Indígenas
        </h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {!data ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <MetricCard
              title="Total Viviendas Habilitadas"
              value={data.total}
              description="Viviendas habilitadas para el Censo en Línea"
              icon={<Home className="h-4 w-4" />}
              iconColor="text-muted-foreground"
            />

            <MetricCard
              title="No Iniciaron"
              value={data.resumenEstados.noIniciaron}
              description={`${getPercentage(data.resumenEstados.noIniciaron, data.total)} - ${data.descripcionEstados[1]}`}
              icon={<AlertCircle className="h-4 w-4" />}
              iconColor="text-orange-500"
            />

            <MetricCard
              title="En Progreso"
              value={data.resumenEstados.enProgreso}
              description={`${getPercentage(data.resumenEstados.enProgreso, data.total)} - ${data.descripcionEstados[2]}`}
              icon={<Clock className="h-4 w-4" />}
              iconColor="text-blue-500"
            />

            <MetricCard
              title="Autocensadas"
              value={data.resumenEstados.autocensadas}
              description={`${getPercentage(data.resumenEstados.autocensadas, data.total)} - ${data.descripcionEstados[3]}`}
              icon={<CheckCircle className="h-4 w-4" />}
              iconColor="text-green-500"
            />

            <MetricCard
              title="Censo Presencial"
              value={data.resumenEstados.presencial}
              description={`${getPercentage(data.resumenEstados.presencial, data.total)} - ${data.descripcionEstados[4]}`}
              icon={<UserCheck className="h-4 w-4" />}
              iconColor="text-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado del Censo</CardTitle>
                <CardDescription>Distribución de viviendas según su estado actual en el censo</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <StatusChart data={estadosChartData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Motivos de Entrega de CUV</CardTitle>
                <CardDescription>
                  Distribución de viviendas según el motivo de entrega del Código Único de Vivienda
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <MotivosChart data={motivosChartData} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progreso del Censo en Línea</CardTitle>
              <CardDescription>Porcentaje de avance general (Autocensadas + Censo Presencial)</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressIndicator
                total={data.total}
                completed={data.resumenEstados.autocensadas + data.resumenEstados.presencial}
                label={`Progreso: ${getPercentage(data.resumenEstados.autocensadas + data.resumenEstados.presencial, data.total)}`}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
