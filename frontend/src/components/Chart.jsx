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

      // 3) JUGADORES POR MES
axios.get(`${BASE}/api/jugadores_mes`)
.then(res => {
  // Agrupar por mes y juego
  const tidy = res.data.map(item => ({
    month: item.Date,
    game: item.Game_Name, // Asegúrate de que 'Game_Name' sea el campo adecuado
    value: item.Peak_Players
  }));
  console.log(tidy);
  

  // Calcular el total de jugadores por mes
  const totalJugadoresPorMes = tidy.reduce((acc, { month, value }) => {
    acc[month] = (acc[month] || 0) + value;
    return acc;
  }, {});

  // Calcular los porcentajes por juego y mes
  const tidyConPorcentajes = tidy.map(item => {
    const total = totalJugadoresPorMes[item.month] || 0;
    const porcentaje = total > 0 ? (item.value / total) * 100 : 0;
    return { ...item, porcentaje };
  });

  // Agrupar por mes y juego
  const jugadoresPorMes = tidyConPorcentajes.reduce((acc, { month, game, porcentaje }) => {
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push({ game, value: porcentaje });
    return acc;
  }, {});

  // Tomar el primer mes para mostrar (puedes hacer esto dinámico si lo necesitas)
  const mesSeleccionado = Object.keys(jugadoresPorMes)[0];
  setJugadoresMesData(jugadoresPorMes[mesSeleccionado]);
})
.catch(err => console.error('Error en jugadores_mes', err));


    // 4) Top promedio
    axios.get(`${BASE}/api/top_promedio`)
      .then(res => {
        const arr = Array.isArray(res.data)? res.data : [];
        setTopPromedioData(
          arr.map(item => ({ name: item.Game_Name, value: item.Avg_players }))
        );
      })
      .catch(() => setTopPromedioData([]));
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

      {/* Jugadores por Mes (Porcentaje por Juego) */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold text-gray-700">Jugadores por Mes (Porcentaje)</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {jugadoresMesData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jugadoresMesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}
                >
                  {jugadoresMesData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={val => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando Jugadores por Mes…</p>
          )}
        </div>
      </section>

      {/* Top Promedio */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold text-gray-700">Top Promedio</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {topPromedioData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPromedioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize:10 }} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {topPromedioData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando Top Promedio…</p>
          )}
        </div>
      </section>
    </div>
  );
}