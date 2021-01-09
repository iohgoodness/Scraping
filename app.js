
var cheerio = require('cheerio');
var request = require('request');

const url = 'https://www.roblox.com/games/5665787539/Relics-Gods-Of-Glory-BETA'

function fetchNumPlayersInGame(placeUrl) {
    return new Promise((resolve, reject) => {
        request(placeUrl, (err, response, body) => {
            if (err) reject(err)
            else {
                let $ = cheerio.load(body)
                let classdata = $('.game-stat .text-lead');

                let webdata = {
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