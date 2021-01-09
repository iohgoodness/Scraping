
var cheerio = require('cheerio');
var request = require('request');

const url = 'https://www.roblox.com/games/5665787539/Relics-Gods-Of-Glory-BETA'

function getDate() {
    let date_ob = new Date();
    
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return month +'/'+ date +'/'+ year;
}

function getTime() {
    let date_ob = new Date();

    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    return hours.toString() +':'+ minutes.toString() +':'+ seconds.toString();
}

function fetchNumPlayersInGame(placeUrl) {
    return new Promise((resolve, reject) => {
        request(placeUrl, (err, response, body) => {
            if (err) reject(err)
            else {
                let $ = cheerio.load(body)
                let classdata = $('.game-stat .text-lead');

                let webdata = {
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
            }
        })
    }) 
}

fetchNumPlayersInGame(url).then(function(result) {
    console.log(result);
})