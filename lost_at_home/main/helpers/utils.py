"""Utilities file to hold all helper functions"""
import logging
import matplotlib.pyplot as plt
import os
import pandas as pd
import random
import seaborn as sns

from functools import reduce
from lost_at_home.main.helpers.constants import CSV_DATA_HEADERS, CSV_FILENAME_MAP, DATASETS_PATH, TMP_PATH
from pandas.plotting import register_matplotlib_converters

def create_minigame_info(filename, exclude):
    """
    Returns a dictionary with relevant info about the minigame

    :param: filename (str) dataset chosen
    :return: (dict)
        answer: (str)
        choices: (list of str)
        image_path: (str)
        question: (str)
    """
    return {
        'answer': CSV_FILENAME_MAP[filename],
        'choices': generate_minigame_choices(filename, exclude),
        'img_path': os.path.join(TMP_PATH, 'img.png'),
        'question': 'Which location is the mystery data recorded for?'
    }

def convert_csv_to_dataframe(filename, filters=None, sortBy=None):
    """
    Converts a CSV dataset into a pandas dataframe

    :param: filename(str) file name of the csv file
    :param: filters (list of str) columns to extract from csv
    :param: sortBy (dict) { 'column': <column>, 'ascending': True/False }
    :return: (dataframe) pandas dataframe
    """
    df = None

    if (filename not in os.listdir(DATASETS_PATH)):
        logging.error(f"{filename} not found!")
        return df

    df = pd.read_csv(os.path.join(DATASETS_PATH, filename))
    
    if (filters):
        if (not set(filters).issubset(list(df))):
            logging.error(f"{filters} headers not found in CSV!")
        else:
            df = df[filters].copy()
    
    if (sortBy):
        if (not set(filters).issubset(list(df))):
            logging.error(f"{sortBy} headers not found in CSV!")
        else:
            df = df.sort_values(sortBy['column'], ascending=sortBy['ascending'], inplace=False)
    
    df['Location'] = CSV_FILENAME_MAP[filename]

    return df.reset_index(drop=True)

def generate_minigame_choices(filename, exclude):
    answer = CSV_FILENAME_MAP[filename]
    choices = [CSV_FILENAME_MAP[x] for x in os.listdir(DATASETS_PATH) if x not in exclude]
    choices2 = random.sample(choices, k = 3)
    choices2.append(answer)
    return choices2

def generate_plot_figure(dataframes, filename):
    """
    Generates a figure of a plot

    :param: dataframes (dict of dataframe) pandas dataframes to extract data from
    :param: filename (str) dataset to not display legend for
    :return: (Figure)
    """
    datasets = [dataframes[x] for x in dataframes]
    df = reduce(lambda left, right: pd.merge(left, right, on=[CSV_DATA_HEADERS['measuredAt'], CSV_DATA_HEADERS['maximumTemp'], 'Location' ], how='outer'), datasets)
 
    register_matplotlib_converters()
    df[CSV_DATA_HEADERS['measuredAt']] = pd.to_datetime(df[CSV_DATA_HEADERS['measuredAt']])
    df['Location'].replace([CSV_FILENAME_MAP[filename]], 'Unknown', inplace=True)

    sns.set()

    ax = sns.scatterplot(
        x=CSV_DATA_HEADERS['measuredAt'],
        y=CSV_DATA_HEADERS['maximumTemp'],
        hue='Location',
        data=df
    )
    ax.set_xlim(735000, None)   # Hard coded for now

    return ax.get_figure()

def get_sns_xlim(datetime):
    epoch = datetime.datetime.utcfromtimestamp(0)
    return (datetime - epoch).total_seconds() * 1000.0