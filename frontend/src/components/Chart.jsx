import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend,
  LineChart, Line
} from 'recharts';

export default function Charts() {
  const [gainData, setGainData] = useState([]);
  const [jugadoresAniosData, setJugadoresAniosData] = useState([]);
  const [jugadoresMesData, setJugadoresMesData] = useState([]);
  const [topPromedioData, setTopPromedioData] = useState([]);
  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF',
    '#7ED6DF', '#E056FD', '#F6E58D', '#EA2027', '#1B9CFC'
  ];

  useEffect(() => {
    const BASE = 'https://big-data-n4mu.onrender.com';

    // 1) Gain por año
    axios.get(`${BASE}/api/gain`)
      .then(res => {
        let raw = res.data;
        if (typeof raw === 'string') raw = raw.replace(/NaN/g, 'null');
        let arr;
        try { arr = JSON.parse(raw); } catch { arr = []; }
        const tidyGain = Array.isArray(arr)
          ? arr.map(item => ({ year: item.Date.slice(0,4), gain: parseFloat(item.Gain)||0 }))
          : [];
        const grouped = tidyGain.reduce((acc, { year, gain }) => {
          acc[year] = (acc[year]||0) + gain;
          return acc;
        }, {});
        const data = Object.entries(grouped)
          .map(([year, totalGain]) => ({ year, totalGain }))
          .sort((a,b)=>a.year.localeCompare(b.year));
        setGainData(data);
      })
      .catch(() => setGainData([]));

    // 2) Jugadores por años
    axios.get(`${BASE}/api/jugadores_anios`)
      .then(res => {
        const arr = Array.isArray(res.data)? res.data : [];
        setJugadoresAniosData(
          arr.map(item => ({ name: item.Date, value: item.Avg_players }))
        );
      })
      .catch(() => setJugadoresAniosData([]));

  // Jugadores por Mes
  axios.get(`${BASE}/api/jugadores_mes`)
    .then(res => {
      const tidy = res.data.map(item => ({
        month: item.Date.slice(0, 7), // Formatear la fecha como 'YYYY-MM'
        value: item.Peak_Players // Usar el campo correcto para el valor
      }));

      // Agrupar por mes y sumar los valores
      const jugadoresPorMes = tidy.reduce((acc, { month, value }) => {
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += value;
        return acc;
      }, {});

      // Convertir el objeto en un array para el gráfico
      const dataParaGrafico = Object.entries(jugadoresPorMes).map(([month, value]) => ({
        month,
        value
      }));

      setJugadoresMesData(dataParaGrafico);
    })
    .catch(err => console.error('Error en jugadores_mes', err));

  // Top Promedio
  axios.get(`${BASE}/api/top_promedio`)
    .then(res => {
      const arr = Array.isArray(res.data) ? res.data : [];
      const tidy = arr
        .map(item => ({
          name: item.Game_Name, // Nombre del juego
          value: item.Avg_players // Promedio de jugadores
        }))
        .sort((a, b) => b.value - a.value) // Ordenar por promedio de jugadores (descendente)
        .slice(0, 10); // Tomar solo los 10 primeros

      setTopPromedioData(tidy);
    })
    .catch(err => console.error('Error en top_promedio', err));
}, []);

  return (
    <div className="pt-10 pb-16 px-4 space-y-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800">Gráficos de Datos</h2>

      {/* Gain por Año */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold text-gray-700">Gain por Año</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {gainData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gainData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalGain" fill="#89CFF0" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando Gain por Año…</p>
          )}
        </div>
      </section>

      {/* Jugadores por Años */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold text-gray-700">Jugadores por Años</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {jugadoresAniosData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jugadoresAniosData} margin={{ top:5,right:20,left:10,bottom:5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando Jugadores por Años…</p>
          )}
        </div>
      </section>

      {/* Jugadores por Mes (Bar Chart) */}
<section className="max-w-4xl mx-auto space-y-4">
  <h3 className="text-2xl font-semibold text-gray-700">Jugadores por Mes</h3>
  <div className="bg-white rounded-lg shadow-md p-6">
    {jugadoresMesData.length ? (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={jugadoresMesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-gray-500">Cargando Jugadores por Mes…</p>
    )}
  </div>
</section>

{/* Top Promedio (Pie Chart) */}
<section className="max-w-4xl mx-auto space-y-4">
  <h3 className="text-2xl font-semibold text-gray-700">Top Promedio</h3>
  <div className="bg-white rounded-lg shadow-md p-6">
    {topPromedioData.length ? (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={topPromedioData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {topPromedioData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-gray-500">Cargando Top Promedio…</p>
    )}
  </div>
</section>
    </div>
  );
}