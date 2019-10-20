import os

UTILS_FILE_PATH = os.path.dirname(os.path.abspath(__file__))
DATASETS_PATH = os.path.join(UTILS_FILE_PATH, '../../static/assets/datasets')
TMP_PATH = os.path.join(UTILS_FILE_PATH, '../../static/assets/tmp')

CSV_DATA_HEADERS = {
    'schoolName': 'School Name',
    'siteName': 'Site Name',
    'userID': 'Userid',
    'latitude': 'Latitude',
    'longitude': 'Longitude',
    'elevation': 'Elevation',
    'measuredAt': 'Measured At',
    'solarMeasuredAt': 'Solar Measured At',
    'solarNoonAt': 'Solar Noon At',
    'currentTemp': 'Current Temp',
    'minimumTemp': 'Minimum Temp',
    'maximumTemp': 'Maximum Temp'
}

CSV_FILENAME_MAP = {
    'california.csv': 'California (US)',
    'finland.csv': 'Finland',
    'florida_us.csv': 'Florida (US)',
    'france.csv': 'France',
    'illinois_us.csv': 'Illinois (US)',
    'massachusetts_us.csv': 'Massachusetts (US)',
    'ohio_us.csv': 'Ohio (US)',
    'oregon_us.csv': 'Oregon (US)',
    'saudi_arabia.csv': 'Saudi Arabia',
    'spain.csv': 'Saudi Arabia',
    'texas_us.csv': 'Texas (US)',
    'virginia_us.csv': 'Virginia (US)'
}