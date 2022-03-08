let Dockerode = require('dockerode')

module.exports = {

    startCtrlBot: async function (req, res) {
        // start controller bot
        let ctrlCreateOptions =  {
            name: 'ctrl', 
            Hostname: 'ctrl', 
            Image: 'ctrl',
            Env: [`BOT_NAME=ctrl`],
            ExposedPorts: { '8080/tcp': {} }, 
            HostConfig: { 
                NetworkMode: 'freqtrade_network',
                Binds: [`${process.cwd()}/controllers/controller:/usr/src/app`], 
                PortBindings: {
                    "8080/tcp": [{
                        "HostPort": "8080"
                    }],
                },
            },
        }

        let docker = new Dockerode()
        let container = null
        let containers = await docker.listContainers()
        containers = containers.filter( container => container.Names.includes(`/ctrl`) )
        if (!(containers.length > 0)) {
            try {
                let networkName = ctrlCreateOptions.HostConfig.NetworkMode
                let networks = await docker.listNetworks()
                let network = networks.filter( network => network.Name == networkName )
                if (!(network.length > 0)) {
                    await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                } 
                try {
                    container = await docker.createContainer(ctrlCreateOptions)
                   
                    await container.start()
                    res.status(200).json({id: container.id, name: ctrlCreateOptions.name})
                } catch(e) {
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('Error occured while creating bot network...')
                console.log(e)
                res.status(500).json({message: 'Internal server error'})
            }
        } else {
            res.status(200).json({id: containers[0].Id, name: ctrlCreateOptions.name})
        }
    },


    stopCtrlBot: async function (req, res) {
        // stop controller bot
        let docker = new Dockerode()
        try {
            let containers = await docker.listContainers()
            containers = containers.filter( container => container.Names.includes(`/ctrl`) )
            console.log(containers)
            if (containers.length > 0) {
                container = docker.getContainer(containers[0].Id)
                container.remove({
                    force: true
                }, function(err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({message: `container ctrl has been shut down`})
                })
            } else {
                res.status(200).json({ message: `container ctrl not found. Already shut down` })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
    },


    startTradeBot: async function (req, res) {
        //start trade bot with a specified name
        // should be create container instead

        let ctrlCreateOptions =  {
            name: req.body.name, 
            Hostname: req.body.name, 
            Image: 'freqtradeorg/freqtrade:stable',
            Env: [`BOT_NAME=${req.body.name}`],
            ExposedPorts: { '8080/tcp': {} }, 
            HostConfig: { 
                NetworkMode: 'freqtrade_network', 
            },
            Cmd: [`ls freqtrade`],
            Entrypoint: [""]
        }

        //trade --logfile /freqtrade/user_data/logs/freqtrade.log --db-url sqlite:////freqtrade/user_data/tradesv3.sqlite --config /freqtrade/user_data/config.json --strategy SampleStrategy
        let docker = new Dockerode()
        let container = null
        let containers = await docker.listContainers()
        containers = containers.filter( container => container.Names.includes(`/${req.body.name}`) )
        if (!(containers.length > 0)) { 
            try {
                let networkName = ctrlCreateOptions.HostConfig.NetworkMode
                let networks = await docker.listNetworks()
                let network = networks.filter( network => network.Name == networkName )
                if (!(network.length > 0)) {
                    await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                } 
                try {
                    container = await docker.createContainer(ctrlCreateOptions)
                    await container.attach({
                        stream: true,
                        stdout: true,
                        stderr: true
                      }, function handler(err, stream) {
                        container.modem.demuxStream(stream, process.stdout, process.stderr)
                      })
                    await container.start()
                    res.status(200).json({id: container.id, name: req.body.name})
                } catch(e) {
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('Error occured while creating bot network...')
                console.log(e)
                res.status(500).json({message: 'Internal server error'})
            }
        } else {
            res.status(200).json({id: containers[0].Id, name: ctrlCreateOptions.name})
        }   
    },

    
    stopTradeBot: async function (req, res) {
        // stop tradebot with a specified name
        let docker = new Dockerode()
        try {
            let containers = await docker.listContainers()
            containers = containers.filter( container => container.Names.includes(`/${req.body.name}`) )
            console.log(containers)
            if (containers.length > 0) {
                container = docker.getContainer(containers[0].Id)
                container.remove({
                    force: true
                }, function(err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({message: `container ${req.body.name} has been shut down`})
                })
            } else {
                res.status(200).json({ message: `container ${req.body.name} not found. Already shut down` })
            }
        } catch (e) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}