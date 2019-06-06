# lat long val [[], []]
import random

# def generate_data()

minlat = 52.290331
latint = 52.462449 - 52.290331

minlon = 4.738163
lonint = 5.135141 - 4.738163

res = [[minlat + random.uniform(0, 1) * latint, minlon + random.uniform(
    0, 1) * lonint, 200 * random.uniform(0, 1)] for i in range(250)]

print(res)

# [52.462449, 4.738163]

# [52.290331, 5.135141]
