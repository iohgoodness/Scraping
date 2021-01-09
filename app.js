

// imports
var cheerio = require('cheerio');
var request = require('request');
var moment = require('moment');

const fs = require('fs');

// URL
const URL = 'https://www.roblox.com/games/5665787539/Relics-Gods-Of-Glory-BETA';
const WEBSITE_DATA_DELAY = 60;
const LOOP = true;

// Return Date
function getDate() {
    return moment().format('l');
}

// Return Time
function getTime() {
    return moment().format('HH:mm:ss');
}

// Promise response data
function GetStats(placeUrl) {
    let webdata = null;
    return new Promise((resolve, reject) => {
        request(placeUrl, (err, response, body) => {
            if (err) reject(err)
            else {
                let $ = cheerio.load(body)
                let classdata = $('.game-stat .text-lead');

                webdata = {
                    'Date' : '',
                    'Time' : '',
                    'Players' : '',
                    'Favorites' : '',
                    'Visits' : '',
                    'Created' : '',
                    'Updated' : '',
                    'Genre' : '',
                    'MaxPlayers' : '',
                }

                classdata.each(function(i, e) {
                    let obj = $(this)
                    let x = obj.attr('title');
                    let data = null;
                    
                    if (x) {
                        data = x;
                    } else {
                        data = obj.text();
                    }

                    webdata['Date'] = getDate();
                    webdata['Time'] = getTime();

                    switch (i) {
                        case 0:
                            webdata['Players'] = data;
                            break;
                        case 1:
                            webdata['Favorites'] = data;
                            break;
                        case 2:
                            webdata['Visits'] = data;
                            break;
                        case 3:
                            webdata['Created'] = data;
                            break;
                        case 4:
                            webdata['Updated'] = data;
                            break;
                        case 5:
                            webdata['MaxPlayers'] = data;
                            break;
                        case 6:
                            webdata['Genre'] = data;
                    }
                });

                console.log(webdata);
                csvline = webdata['Date']
                + ',' + webdata['Time']
                + ',' + webdata['Players']
                + ',' + webdata['Favorites']
                + ',' + webdata['Visits']
                + ',' + webdata['Created'] 
                + ',' + webdata['Updated']
                + ',' + webdata['Genre']
                + ',' + webdata['MaxPlayers']
                + '\n';

                fs.appendFile('output.csv', csvline, function (err) {
                    if (err) throw err;
                });

            }
        })
    })
}

function WebsiteData() {
    GetStats(URL);
    if (LOOP) {
        setTimeout(WebsiteData, WEBSITE_DATA_DELAY * 1000);
    };
}

WebsiteData();