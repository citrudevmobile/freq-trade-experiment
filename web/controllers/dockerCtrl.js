let Dockerode = require('dockerode')
//let DockerodeCompose = require('dockerode-compose')
let DockerodeCompose = require('../libs/dockerode-compose/compose')
let containerId = ""

let opts = {
    name: 'freqtrade',
    Image: 'freqtradeorg/freqtrade:stable',
    Env: [],
    Volumes: { '/freqtrade/user_data': {} },
    ExposedPorts: { '8080/tcp': {} },
    Cmd: 'trade --logfile /root/trader_bot/web/freqtrade/user_data/logs/freqtrade.log --db-url sqlite:////root/trader_bot/web/freqtrade/user_data/tradesv3.sqlite --config /root/trader_bot/web/freqtrade/user_data/config.json --strategy SampleStrategy\n'
  }
  

module.exports = {

    startBot: async function (req, res) {

        let docker = new Dockerode();
        let dockerNetwork = new Dockerode();
        let botNetwork = null
        let container = null

        try {
            let networkName = 'freqtradenet'
            let networks = await docker.listNetworks()
            let network = networks.filter( network => network.Name == networkName )
            if (network.length > 0) {
                botNetwork = await docker.getNetwork(network[0].Id)
                console.log('existing bot network')
                console.log(botNetwork)
            } else {
                botNetwork = await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                console.log('created new bot network')
                console.log(botNetwork)
            }
        } catch (e) {
            console.log('create network error...')
            console.log(e)
        }


        try {
            container = await docker.createContainer(opts)
            containerId = container.id
        } catch (e) {
            console.log('failed to create container...')
            console.log(e)
        }


        try {
            await botNetwork.connect({Container: container.id})
        } catch (e) {
            console.log('error connecting container to bot network...')
            console.log(e)
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