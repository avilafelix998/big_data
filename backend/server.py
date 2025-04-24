from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)  # corregido "__name__"
CORS(app)

# Ruta para jugadores promedio por mes
@app.route('/api/jugadores/promedio', methods=['GET'])
def get_avg_players():
    df = pd.read_csv('./data/jugadores_mes.csv')
    # Asegurate que las columnas sean: 'date', 'avgPlayers'
    data = df[['date', 'avgPlayers']].to_dict(orient='records')
    return jsonify(data)

# Ruta para pico de jugadores por mes
@app.route('/api/jugadores/pico', methods=['GET'])
def get_peak_players():
    df = pd.read_csv('./data/jugadores_mes.csv')
    # Asegurate que las columnas sean: 'date', 'peakPlayers'
    data = df[['date', 'peakPlayers']].to_dict(orient='records')
    return jsonify(data)

if __name__ == '__main__':  # corregido también
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
