
#  Scraping with chromedriver? 



import datetime
import os
import json

from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep

GAME_ID = '5665787539'
URL = 'https://www.roblox.com/games/' + GAME_ID + '/'

INTERVAL_SECONDS = 15

def push_new_player_count(players):
    dirToSearch = os.getcwd()
    d = datetime.datetime.now()
    newline = d.strftime('%x,%X,') + (str(players)).replace(',', '') + '\n'
    with open(dirToSearch + '\\Data\\12345.csv','a') as f:
        f.write(newline)

def get_website_data(url):
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        prefs = {"profile.managed_default_content_settings.images": 2}
        options.add_experimental_option("prefs", prefs)
        browser = webdriver.Chrome(executable_path='C:\\chromedriver.exe', options=options)

        browser.get(url)
        html = browser.page_source
        soup = BeautifulSoup(html, 'lxml')

        while True:
            if (int(((datetime.datetime.now()).strftime('%X')).split(':')[2]) % INTERVAL_SECONDS == 0):
                break
            sleep(0.1)
        
        players = (soup.find('p', {'class': 'text-lead font-caption-body wait-for-i18n-format-render'})).text
        
        push_new_player_count(players)
        
        browser.quit()
    except Exception as e:
        print('Exception in SavePlayers.py:', e)
        sleep(0.5)
        #pass
    else:
        pass

while True:
    get_website_data(URL)

