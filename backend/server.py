from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)  # corregido "__name__"
CORS(app)

# Ruta para jugadores promedio por mes
@app.route('/api/gain', methods=['GET'])
def get_avg_players():
    df = pd.read_csv('./data/gain.csv')
    data = df[['Gain','Date','Game_Name']].to_dict(orient='records')
    return jsonify(data)

@app.route('/api/jugadores_anios', methods=['GET'])
def get_peak_players_anios():
    df = pd.read_csv('./data/jugadores_anios.csv')
    # Asegurate que las columnas sean: 'date', 'peakPlayers'
    data = df[['AvgPlayers','Date','Game_Name']].to_dict(orient='records')
    return jsonify(data)

@app.route('/api/jugadores_mes', methods=['GET'])
def get_peak_players_mes():
    df = pd.read_csv('./data/jugadores_mes.csv')
    # Asegurate que las columnas sean: 'date', 'peakPlayers'
    data = df[['PeakPlayers','Date','Game_Name']].to_dict(orient='records')
    return jsonify(data)

@app.route('/api/top_promedio', methods=['GET'])
def get_top_promedio():
    df = pd.read_csv('./data/top_promedio.csv')
    # Asegurate que las columnas sean: 'date', 'peakPlayers'
    data = df[['AvgPlayers','Game_Name']].to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':  # corregido también
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)