import json
import logging
import os
import random

from flask import Blueprint, render_template
from lost_at_home.main.helpers.constants import (CSV_DATA_HEADERS,
                                                 DATASETS_PATH, TMP_PATH)
from lost_at_home.main.helpers.utils import (convert_csv_to_dataframe,
                                             create_minigame_info,
                                             generate_plot_figure)

# Define blueprint
main = Blueprint('main', __name__)

@main.route('/')
def home():
    """Return the SPA for 1UP-NASA-EARTH"""
    logging.info('Entering route: HOME')

    logging.info('Rendering template: main.html')
    return render_template('main.html')

@main.route('/api/minigame', methods=['GET'])
def api_minigame():
    """Returns a minigame"""
    logging.info('Entering route: API_MINIGAME')

    # Select three random dataset
    datasets = random.sample(os.listdir(DATASETS_PATH), k=3)
    filename = datasets[0]
    logging.info(f"Using datasets: ${datasets}")

    # Generate dataframes
    dataframes = {
        x: convert_csv_to_dataframe(
            x,
            filters=[CSV_DATA_HEADERS['measuredAt'], CSV_DATA_HEADERS['maximumTemp']],
            sortBy={'column': CSV_DATA_HEADERS['measuredAt'], 'ascending': True}
        )
        for x in datasets
    }
    logging.info(f"Generated dataframes")

    # Generate plot image and save to tmp folder
    figure = generate_plot_figure(dataframes, filename)
    figure.savefig(os.path.join(TMP_PATH, 'img.png'))

    # Create object to pass to template
    return json.dumps(create_minigame_info(filename, datasets))
