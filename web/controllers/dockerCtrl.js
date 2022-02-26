let Dockerode = require('dockerode')
//let DockerodeCompose = require('dockerode-compose')
let DockerodeCompose = require('../libs/dockerode-compose/compose')
let containerId = ""

/*
let recipe  = {
    version: '3',
    services: {
      freqtrade: {
        image: 'freqtradeorg/freqtrade:stable',
        restart: 'unless-stopped',
        container_name: 'freqtradeMain',
        volumes: ['/root/trader_bot/web/freqtrade/user_data:/freqtrade/user_data'],
        ports: ['8080:8080'],
        command: 'trade --logfile /root/trader_bot/web/freqtrade/user_data/logs/freqtrade.log --db-url sqlite:////root/trader_bot/web/freqtrade/user_data/tradesv3.sqlite --config /root/trader_bot/web/freqtrade/user_data/config.json --strategy SampleStrategy\n'
      }
    }
}
*/

module.exports = {

    startBot: async function (req, res) {

        let docker = new Dockerode();
        let dockerNetwork = new Dockerode();

        try {
            let networkName = 'freqtradenet'
            let networks = await dockerNetwork.listNetworks()
            let network = networks.filter( network => network.Name == networkName)
            console.log(network[0])
            if (network) {
                let botNetwork = await dockerNetwork.getNetwork(network[0].Id)
                console.log('existing bot network')
                console.log(botNetwork)
            } else {
                let botNetwork = await dockerNetwork .createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                console.log('created new bot network')
                console.log(botNetwork)
            }
        } catch (e) {
            console.log('create network error...')
            console.log(e)
        }
        
        let compose = new DockerodeCompose(docker, `${process.cwd()}/freqtrade/docker-compose.yml`, "firstProject")
        //let compose = new DockerodeCompose(docker, recipe, 'helloworld')
       
        try {
            await compose.pull()
            let state = await compose.up()
            console.log(state)
            containerId = state["services"][0]["id"]
            console.log(containerId)
            res.status(200).json(state)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },

    stopBot: async function (req, res) {
        let docker = new Dockerode()
        try {
            container = docker.getContainer(containerId)
            container.remove({
                force: true
            }, function(err) {
                if (err) return res.status(500).json({})
                res.status(200).json({})
            })
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },

    restartBot: async function () {
        let docker = new Dockerode()
        let compose = new DockerodeCompose(docker, recipe, 'helloworld')
        try {
            let state = await compose.down({ volumes: true })
            console.log(state)
            state = await compose.up()
            console.log(state)
            res.status(200).json(state)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}