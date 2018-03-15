var networkStat = {
    "trtl": [
       ["auspool.turtleco.in", "https://auspool.turtleco.in/api/"],
       ["etnchina.io/trtl", "https://turtle-coin.com/api/etnchina.io"],
        ["ny.minetrtl.us", "https://turtle-coin.com/api/ny.minetrtl.us"],
       ["slowandsteady.fun", "https://turtle-coin.com/api/slowandsteady.fun"],
       //["trtl.mine2gether.com", "https://trtl.mine2gether.com/api"],
        ["trtl.ninja", "https://trtl.ninja/api"],
        ["trtl.flashpool.club", "https://api.trtl.flashpool.club"],
        ["trtl.blockchainera.net", "https://turtle-coin.com/api/trtl.blockchainera.net"],
        ["trtl.unipool.pro", "https://pool.turtlecoin.fr:8117"],
        ["trtlpool.ninja", "https://turtle-coin.com/api/trtlpool.ninja"],
        ["eu.turtlepool.space", "https://eu.turtlepool.space/api"],
        ["us.turtlepool.space", "https://us.turtlepool.space/api"],
        ["hk.turtlepool.space", "https://hk.turtlepool.space/api"],
        ["turtlecoinpool.ml", "https://turtlecoinpool.ml:8443"],
        ["turtle.mining.garden", "https://turtle.mining.garden:8117"],
        ["turtle.coolmining.club", "https://turtle.coolmining.club"],
        ["turtlepower.challengecoin.io", "https://turtle-coin.com/api/turtlepower.challengecoin.io"],
        ["turtle.atpool.party", "https://turtle-coin.com/api/turtle.atpool.party"],
        ["z-pool.com", "https://z-pool.com/api"],
        

    ]
};
const https = require('https');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
var symbol = "trtl";
client.on('ready', () => {
    console.log('Ready!');
});
client.on('message', message => {
    
    if (message.content.startsWith(`${prefix}ping`)) {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    } else if (message.content === `${prefix}list`) {
      //message.channel.send(`There are these pools beiong monitored: ${networkStat[1]}`)
      for(var i in networkStat){
      pool = networkStat[i];
      message.channel.send(pool);
      }




    } else if (message.content === `${prefix}check`) {
        for(var i in networkStat){
        pool = networkStat[i].toString();
        NETWORK_STAT_MAP = new Map(networkStat[symbol.toLowerCase()]);


        NETWORK_STAT_MAP.forEach((url, host, map) => {
            console.log(url);
            https.get(url + '/stats', (resp) => {
            let data = '';
             
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
             
            // The whole response has been received. Parse the Height.
            resp.on('end', () => {
                try {
                    json = data;
                    message.channel.send(`${url}/stats Block height ${json.network.height}`)
                }
                catch(err) {
                    json = JSON.parse(data);
                    message.channel.send(`${url}/stats ; ${json.network.height}`)
                    console.log(err + '\n' + url);
                }
            });
             
            }).on("error", (err) => {
              console.log("Error: " + err.message + url);
            });
        });
    }}
});

client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
