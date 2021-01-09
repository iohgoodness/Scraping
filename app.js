
/*

iohgoodness

created: 01/07/2021
last updated: 01/09/2021


TO-DO:
1 - use command line args [0]==username, [1]==password
2 - make request with args to roblox, getcookie for .ROBLOXSECURITY (token for account)
3 - using token, make 2nd request, with token ONLY -> on game-passes page for total sales
4 - scraping sales will save to csv like other public data

*/

// imports
var cheerio = require('cheerio'); // html parser
var request = require('request'); // request module
var moment = require('moment');   // date and time
const fs = require('fs');         // file storage

// CONSTANTS
const URL = 'https://www.roblox.com/games/5665787539/Relics-Gods-Of-Glory-BETA'; // uri with public data
const GAMEPASSES_URL = 'https://www.roblox.com/develop/groups/7312028?Page=game-passes'; // uri with gamepass
const WEBSITE_DATA_DELAY = 45; // rate (in SECONDS) at which data saves to .csv
const VERBOSE = false; // output extra informatino

// Return Date
function getDate() {
    return moment().format('l');
}

// Return Time
function getTime() {
    return moment().format('HH:mm:ss');
}

// Promise response data
function GetStats() {
    let webdata = null;
    return new Promise((resolve, reject) => {
        let cookie = request.cookie('');
        request({
            uri : URL,
            headers : {
                'Cookie' : cookie // NOT YET IMPLEMENTED
            }
        }, (err, response, body) => {
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

                if (VERBOSE) {
                    console.log(webdata);
                }

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

// Scraping data from the gamepasses page
function GetGamepassStats() {
    let webdata = null;
    return new Promise((resolve, reject) => {
        let cookie = request.cookie('');
        request({
            uri : GAMEPASSES_URL,
            headers : {
                'Cookie' : cookie // something as to how sending a cookie would look
            }
        }, (err, response, body) => {
            if (err) reject(err)
            else {
                let $ = cheerio.load(body)

                let classdata = $('.totals-label');
            }
        })
    })
}


// Loop for the public website data
function WebsiteData() {
    GetStats();
    setTimeout(WebsiteData, WEBSITE_DATA_DELAY * 1000);
}

// Loop for the private gamepass data
function GamepassData() {
    // NOT YET FUNCTIONAL
    //GetGamepassStats();
    //setTimeout(GamepassData, WEBSITE_DATA_DELAY * 1000);
}

//# Start looping
function Init() {
    GamepassData();
    WebsiteData();
}

// Grab potential command line args
let args = process.argv.slice(2);
let creds = [];
if (args.length == 2) {
    creds.push(args[0]);
    creds.push(args[1]);
}

// IF username and password passed into command line args, THEN run
if (creds[0] && creds[1]) {
    Init();
};