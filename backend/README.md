# Análisis de Datos de Jugadores

Este proyecto analiza datos de jugadores de videojuegos utilizando Python y bibliotecas como `pandas` y `matplotlib`.

## Requisitos

- Python 3.x
- Bibliotecas necesarias: `pandas`, `matplotlib`

## Archivos necesarios

El archivo `Valve_Player_Data.csv` es necesario para ejecutar el análisis. Colócalo en la carpeta `data/`.

Si no tienes el archivo, puedes descargarlo desde [https://www.kaggle.com/datasets/jackogozaly/steam-player-data] o generarlo siguiendo las instrucciones.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Instala las dependencias:
   ```bash
   pip install pandas matplotlib
   ```
3. Asegúrate de que el archivo `Valve_Player_Data.csv` esté en la carpeta `data/`.

## Ejecución

Abre el archivo `analisis.ipynb` en Jupyter Notebook o cualquier entorno compatible y ejecuta las celdas.

## Notas

- Si el archivo `Valve_Player_Data.csv` no está disponible, el código no funcionará correctamente.
- Asegúrate de que la estructura de carpetas sea la siguiente:
  ```
  big-data/
  ├── data/
  │   └── Valve_Player_Data.csv
  ├── analisis.ipynb
  ├── .gitignore
  └── README.md
  ```