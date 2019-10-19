"""Utilities file to hold all helper functions"""
import logging
import os
import pandas as pd

UTILS_FILE_PATH = os.path.dirname(os.path.abspath(__file__))
DATASETS_PATH = os.path.join(UTILS_FILE_PATH, '../static/assets/datasets')

def convert_csv_to_dataframe(filename):
    """
    Converts a CSV dataset into a pandas dataframe

    :param: (str) file name of the csv file
    :return: (dataframe) pandas dataframe
    """
    if (filename not in os.listdir(DATASETS_PATH)):
        logging.error(f"{filename} not found!")
        return None

    return pd.read_csv(filename)
