"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, AlertCircle } from "lucide-react"
import type { DataSource } from "@/hooks/useCensusData"

interface SearchResult {
  codigo: string
  direccion: string
  estado: "No Iniciado" | "En Progreso" | "Finalizado"
  fechaActualizacion: string
}

// Datos de ejemplo para la búsqueda en Ohio
const mockResultsOhio: SearchResult[] = [
  {
    codigo: "OH001",
    direccion: "Av. Principal 123, Columbus",
    estado: "Finalizado",
    fechaActualizacion: "2023-05-15",
  },
  {
    codigo: "OH002",
    direccion: "Jr. Los Pinos 456, Cleveland",
    estado: "En Progreso",
    fechaActualizacion: "2023-05-14",
  },
  {
    codigo: "OH003",
    direccion: "Calle Las Flores 789, Cincinnati",
    estado: "No Iniciado",
    fechaActualizacion: "2023-05-13",
  },
]

// Datos de ejemplo para la búsqueda en Virginia
const mockResultsVirginia: SearchResult[] = [
  {
    codigo: "VA001",
    direccion: "Main St 123, Richmond",
    estado: "Finalizado",
    fechaActualizacion: "2023-05-15",
  },
  {
    codigo: "VA002",
    direccion: "Oak Ave 456, Norfolk",
    estado: "En Progreso",
    fechaActualizacion: "2023-05-14",
  },
  {
    codigo: "VA003",
    direccion: "Pine Blvd 789, Alexandria",
    estado: "No Iniciado",
    fechaActualizacion: "2023-05-13",
  },
]

interface SearchFormProps {
  source?: DataSource
}

export function SearchForm({ source = "ohio" }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searched, setSearched] = useState(false)

  // Seleccionar los datos de ejemplo según la fuente
  const mockResults = source === "ohio" ? mockResultsOhio : mockResultsVirginia

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    setIsSearching(true)
    setSearched(true)

    // Simular búsqueda con un pequeño retraso
    setTimeout(() => {
      const filteredResults = mockResults.filter(
        (result) =>
          result.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setResults(filteredResults)
      setIsSearching(false)
    }, 800)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Finalizado":
        return <div className="text-green-500">Finalizado</div>
      case "En Progreso":
        return <div className="text-blue-500">En Progreso</div>
      case "No Iniciado":
        return <div className="text-orange-500">No Iniciado</div>
      default:
        return <div className="text-gray-500">{status}</div>
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Búsqueda de Viviendas</CardTitle>
          <CardDescription>
            Buscar por código o dirección de vivienda en {source === "ohio" ? "Ohio" : "Virginia"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder={`Ingrese código o dirección en ${source === "ohio" ? "Ohio" : "Virginia"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar
            </Button>
          </form>

          {searched && (
            <div>
              {isSearching ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Resultados ({results.length})</h3>
                  <div className="divide-y">
                    {results.map((result) => (
                      <div key={result.codigo} className="py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              <Home className="h-4 w-4" />
                              Código: {result.codigo}
                            </h4>
                            <p className="text-sm text-muted-foreground">{result.direccion}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Actualizado: {result.fechaActualizacion}
                            </p>
                          </div>
                          <div className="font-medium">{getStatusIcon(result.estado)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No se encontraron resultados</h3>
                  <p className="text-muted-foreground">
                    Intente con otro código o dirección de {source === "ohio" ? "Ohio" : "Virginia"}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
