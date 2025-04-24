import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bgImage from './img/bg.jpg'
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { motion } from 'framer-motion'

export default function DinoCharts() {
  // Definimos los estados para cada cosa
  const [alimentacionData, setAlimentacionData] = useState([])
  const [longitudData, setLongitudData] = useState([])
  const [paisesData, setPaisesData] = useState([])

  // Definimos una lista de colores para las graficas
  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF',
    '#7ED6DF', '#E056FD', '#F6E58D', '#EA2027', '#1B9CFC'
  ]

  useEffect(() => {
    const BASE_URL = 'https://data-visualization-xxvc.onrender.com/'

    // Carga los datos de alimentación
    axios.get(${BASE_URL}/api/dinosaurios/alimentacion)
      .then(res => setAlimentacionData(
        res.data.map(item => ({ name: item.Tipo_alimentacion, value: Number(item.cantidad_en_Argentina) }))
      ))
      .catch(err => console.error("Error en alimentación", err))

    // Carga los datos de longitud
    axios.get(${BASE_URL}/api/dinosaurios/longitud)
      .then(res => setLongitudData(
        res.data.map(item => ({ name: item.Especie_nombre, value: Number(item.Longitud) }))
      ))
      .catch(err => console.error("Error en longitud", err))

    // Carga los datos de países
    axios.get(${BASE_URL}/api/dinosaurios/paises)
      .then(res => setPaisesData(
        res.data.map(item => ({ name: item.lived_in, value: Number(item.cantidad_de_especies) }))
      ))
      .catch(err => console.error("Error en países", err))
  }, [])