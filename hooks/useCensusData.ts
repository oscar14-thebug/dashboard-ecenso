"use client"

import { useState, useEffect } from "react"

export type DataSource = "ohio" | "virginia"

export interface CensusData {
  // Datos de estados del censo
  total: number
  resumenEstados: {
    noIniciaron: number
    enProgreso: number
    autocensadas: number
    presencial: number
  }
  descripcionEstados: {
    1: string
    2: string
    3: string
    4: string
  }

  // Datos de motivos de entrega de CUV
  motivosEntrega: {
    1: number
    2: number
    3: number
    4: number
  }
  descripcionMotivos: {
    1: string
    2: string
    3: string
    4: string
  }
}
//test
export function useCensusData() {
  const [data, setData] = useState<CensusData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Datos de ejemplo fijos
    const mockData: CensusData = {
      total: 130,
      resumenEstados: {
        noIniciaron: 111,
        enProgreso: 5,
        autocensadas: 14,
        presencial: 0,
      },
      descripcionEstados: {
        1: "No inició el e-Censo",
        2: "e-Censo en proceso",
        3: "Autocensado",
        4: "Censo presencial",
      },
      motivosEntrega: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      descripcionMotivos: {
        1: "Vivienda Ausente, se entregó Código Único de Vivienda (CUV)",
        2: "Vivienda Rechazó, se entregó Código Único de Vivienda (CUV)",
        3: "Vivienda solicitó e-Censo, se entregó Código Único de Vivienda (CUV)",
        4: "Vivienda tiene Código Único de Vivienda (CUV) de forma independientemente (No Censista)",
      },
    }

    setData(mockData)
  }, [])

  return { data, loading, error }
}
