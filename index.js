var networkStat = {
    "trtl": [
       ["auspool.turtleco.in", "https://auspool.turtleco.in/api"],
       ["etnchina.io/trtl", "https://turtle-coin.com/api/etnchina.io"],
        ["ny.minetrtl.us", "https://turtle-coin.com/api/ny.minetrtl.us"],
       ["slowandsteady.fun", "https://turtle-coin.com/api/slowandsteady.fun"],
       ["trtl.mine2gether.com", "https://trtl.mine2gether.com/api"],
        ["trtl.ninja", "https://trtl.ninja/api"],
        ["trtl.flashpool.club", "https://api.trtl.flashpool.club"],
        ["trtl.blockchainera.net", "https://turtle-coin.com/api/trtl.blockchainera.net"],
        ["trtl.unipool.pro", "https://pool.turtlecoin.fr:8117"],
        //["trtlpool.ninja", "https://turtle-coin.com/api/trtlpool.ninja"],
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
var forkcount = 0;
var list = [];




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




NETWORK_STAT_MAP = new Map(networkStat[symbol.toLowerCase()]);
client.on('ready', () => {
    console.log('Ready for anything!');
});
client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    } else if (command === 'fork') {
        message.channel.send("Listening for forks...");
        testFork();

        async function testFork() {
            while (1<2) { // Loop to listen for forks
                    console.log("RAN");
                    NETWORK_STAT_MAP.forEach((url, host, map) => { // Ping each fork and get height
                        https.get(url + '/stats', (resp) => {
                        let data = '';
                        resp.setEncoding('utf8');
                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                         
                        // The whole response has been received. Parse the Height.
                        resp.on('end', () => {
                            try {
                                json = data;
                                console.log(json.network.height);
                            }
                            catch(err) {
                                json = JSON.parse(data);
                                //console.log(json.network.height);
                                //console.log(err);
                            }
                            list.push([json.network.height, url]);
                            findDifferentHeight();

                            function findDifferentHeight() { // Find if there is a fork
                                for(var i in list) {
                                    if(list.length > 1){
                                        var first = list[i][0];
                                        var second = list[i++][0];
                                        if(Math.abs(first - second) >= 10) {
                                            let forkedmessage = "FORK at " + list[i][1] + " Uh oh @" + networkStat[i][2] + " Looks like your pool has forked!";
                                            message.channel.send(forkedmessage);
                                            forkcount++;
                                        } else {
                                            // No Fork
                                        }
                                    }
                                }
                            }

                        });

                         
                        }).on("error", (err) => {
                          console.log("Error: " + err.message + url);
                        });
                    });
                    if (forkcount < 1) {
                        // No Forks!
                    } else {
                        forkcount = 0;
                    }
                    await sleep(5000)
            }
        }


    } else if (command === 'help'){

        message.channel.send({embed: {
            color: 0x00853D,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Help Guide",
            description: "Prefix: %",
            fields: [{
                name: "Height",
                value: "List all (known) pools and their height."
              },
              {
                name: "Forks",
                value: "Test network to see if there are any forks."
              },
              {
                name: "Ping",
                value: "Test connection to bot."
              },
              {
                name: "Help",
                value: "List this help guide."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Made by Watt Erikson"
            }
          }
        });

    } else if (command === 'height') {
        for(var i in networkStat){
        pool = networkStat[i].toString();
        


        NETWORK_STAT_MAP.forEach((url, host, map) => {
            https.get(url + '/stats', (resp) => {
            let data = '';
            resp.setEncoding('utf8');
            //console.log('headers:', resp.headers);
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
             
            // The whole response has been received. Parse the Height.
            resp.on('end', () => {
                try {
                    json = data;
                    message.channel.send(`${url}/stats Block height ${json.network.height}`);
                    //console.log(json)
                }
                catch(err) {
                    json = JSON.parse(data);
                    message.channel.send(`${url}/stats ; ${json.network.height}`)
                }
            });

             
            }).on("error", (err) => {
              console.log("Error: " + err.message + url);
            });
        });
    }} else if (command === 'add') {
        let [pool, api, user] = args;
        message.channel.send(`Hello ${message.author.username}, Pool url ${pool} Api link ${api} Thanks ${user}.`);

    }
});
client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
