from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
app.debug = True  # Debug mode enabled

API_KEY = "77cb6b72d40592aa16e6b039745480b5"  # Replace with your actual API key


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")

    base_url = (
        f"http://api.openweathermap.org/data/2.5/weather?appid={API_KEY}&q={city}"
    )
    response = requests.get(base_url)
    weather_data = response.json()

    return jsonify(weather_data)


if __name__ == "__main__":
    app.run()
