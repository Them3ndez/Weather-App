import requests
from pprint import pprint

API_Key = "77cb6b72d40592aa16e6b039745480b5"

City = input("Enter a city: ")

base_url = (
    "http://api.openweathermap.org/data/2.5/weather?appid=" + API_Key + "&q=" + City
)

weather_data = requests.get(base_url).json()

pprint(weather_data)
