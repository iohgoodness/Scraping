
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
                
                classdata.each(function(i, e) {
                    let obj = $(this)
                    let x = obj.attr('title');
                    if (x) {
                        console.log(x);
                    } else {
                        console.log(obj.text());
                    }
                });
            }
        })
    }) 
}

fetchNumPlayersInGame(url).then(function(result) {
    console.log(result);
})