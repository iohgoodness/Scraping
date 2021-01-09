import pandas as pd # pip install pandas
import numpy as np
import pandas as pd
import datetime

df = pd.read_csv('Book1.csv')

def getDataBetweenDates(df, start, end):
    return df[(df['date'] >= start) & (df['date'] <= end)]

def getDataBetweenTimes(df, start, end):
    return df[(df['time'] >= start) & (df['time'] <= end)]

def getHighestValueOfDF(df):
    return df['players'].max()

def getLowestValueOfDF(df):
    return df['players'].min()

def getMinAndMaxOfDFWithDate(df, date):
    x = getDataBetweenDates(df, '01/04/2021', '01/05/2021')
    return getLowestValueOfDF(x), getHighestValueOfDF(x)


#data = getDataBetweenDates(df, '01/04/2021', '01/05/2021')
##data = df['01/04/2021']
#print(data)
#print(getLowestValueOfDF(data))
