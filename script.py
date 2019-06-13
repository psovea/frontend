import requests
import json

STOP_URL = "http://18.216.203.6:5000/get-stops"

r1 = requests.get(STOP_URL)
stops = r1.json()

string = ""
for stop in stops:
    string += '{"type":"Feature","properties":{"foo":"bar"},"geometry":{"type":"Point","coordinates":[%s,%s]}}' % (
        stop['lat'], stop['lon'])
print(json.loads('{"type":"FeatureCollection","features":[%s]}' % string))
