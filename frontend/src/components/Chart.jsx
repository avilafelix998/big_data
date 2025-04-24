
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
    const BASE_URL = 'https://big-data-n4mu.onrender.com';

    // Cargar datos de gain
    axios.get(`${BASE_URL}/api/gain`)
      .then(res => setGainData(res.data))
      .catch(err => console.error("Error en gain", err));

    // Cargar datos de jugadores por años
    axios.get(`${BASE_URL}/api/jugadores_anios`)
      .then(res => setJugadoresAniosData(res.data))
      .catch(err => console.error("Error en jugadores_anios", err));

    // Cargar datos de jugadores por mes
    // axios.get(`${BASE_URL}/api/jugadores_mes`)
    // .then(res => setJugadoresMesData(res.data))
    //   .catch(err => console.error("Error en jugadores_mes", err));

    // Cargar datos de top promedio
    axios.get(`${BASE_URL}/api/top_promedio`)
    .then(res => {
      setTopPromedioData(res.data);
    })
      .catch(err => console.error("Error en top_promedio", err));
  }, []);

  return (
    <div className="pt-10 pb-16 px-4 space-y-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800">Gráficos de Datos</h2>
  
      {/* Gráfico de Gain */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700">Gain</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {gainData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Array.isArray(gainData) ? gainData : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando datos de Gain...</p>
          )}
        </div>
      </section>
  
      {/* Gráfico de Jugadores por Años */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700">Jugadores por Años</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {jugadoresAniosData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jugadoresAniosData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando datos de Jugadores por Años...</p>
          )}
        </div>
      </section>
  
      {/* Gráfico de Jugadores por Mes */}
      {/* <section className="max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700">Jugadores por Mes</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {jugadoresMesData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jugadoresMesData}
                  dataKey="value"
                  nameKey="month"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {jugadoresMesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando datos de Jugadores por Mes...</p>
          )}
        </div>
      </section> */}
  
      {/* Gráfico de Top Promedio */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700">Top Promedio</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          {topPromedioData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Array.isArray(topPromedioData) ? topPromedioData : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d">
                  {topPromedioData.map((_, idx) => (
                    <Cell key={`cell-top-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Cargando datos de Top Promedio...</p>
          )}
        </div>
      </section>
    </div>
  );
}