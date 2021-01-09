

# linux subsystem
# sudo apt-get install python3-pip
# sudo python3 -m pip install wheel
# sudo python3 -m pip install pandas

# windows
# pip install pandas

import pandas as pd
import numpy as np
import pandas as pd
import datetime

class DataRead():
    def __init__(self, filename='output.csv'):
        self.df = pd.read_csv(filename)

    # Includes the data at end of ranges: [x, y]
    def GetDataBetweenDates(self, startDate, endDate):
        return self.df[(self.df['Date'] >= startDate) & (self.df['Date'] <= endDate)]
    # Does NOT include the data and end of range: (x, y)
    def GetDataBetweenDatesNotInclude(self, startDate, endDate):
        return self.df[(self.df['Date'] > startDate) & (self.df['Date'] < endDate)]

dr = DataRead()

x = dr.GetDataBetweenDatesNotInclude('01/09/21', '01/11/21')

print(x)
