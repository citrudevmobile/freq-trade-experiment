let Dockerode = require('dockerode')
//let DockerodeCompose = require('dockerode-compose')
let DockerodeCompose = require('../libs/dockerode-compose/compose')


module.exports = {

    startCtrlBot: async function (req, res) {
        
        let ctrlCreateOptions =  {
            name: 'ctrl', 
            Hostname: 'ctrl', 
            Image: 'ctrl',
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
                    res.status(200).json({id: containerId, name: ctrlCreateOptions.name})
                } catch(e) {
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('Error occured while creating bot network...')
                console.log(e)
                res.status(500).json({message: 'Internal server error'})
            }
    },


    startTradeBot: async function (req, res) {
        
        let ctrlCreateOptions =  {
            name: req.body.name, 
            Hostname: req.body.name, 
            Image: 'tradebot',
            ExposedPorts: { '8080/tcp': {} }, 
            HostConfig: { 
                NetworkMode: 'freqtrade_network', 
                Binds: [`${process.cwd()}/controllers/temptradebot:/usr/src/app`], 
            },
        }

        let docker = new Dockerode()
        let container = null

            try {
                let networkName = ctrlCreateOptions.HostConfig.NetworkMode
                let networks = await docker.listNetworks()
                let network = networks.filter( network => network.Name == networkName )
                if (!(network.length > 0)) {
                    await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                } 
                try {
                    container = await docker.createContainer(ctrlCreateOptions)
                    containerId = container.id
                    await container.start()
                    res.status(200).json({id: containerId, name: req.body.name})
                } catch(e) {
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('Error occured while creating bot network...')
                console.log(e)
                res.status(500).json({message: 'Internal server error'})
            }
    },

    stopCtrlBot: async function (req, res) {
        let docker = new Dockerode()
        try {
            let containers = await docker.listContainers()
            let containers = containers.filter( container => container.Names.includes(`/ctrl`) )
            console.log(containers)
            if (containers.length > 0) {
                container = docker.getContainer(containers[0].Id)
                container.remove({
                    force: true
                }, function(err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({message: `container ${containerName} has been shut down`})
                })
            } else {
                res.status(200).json({ message: `container ${containerName} not found. Already shut down` })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
    },

    stopTradeBot: async function (req, res) {
        let docker = new Dockerode()
        try {
            let containers = await docker.listContainers()
            let containers = containers.filter( container => container.Names.includes(`/${req.body.name}`) )
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
            console.log(e)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}



  /*
        
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

    */
  
         /*
        let docker = new Dockerode();
        let botNetwork = null
        let container = null

        try {
            let networkName = 'freqtradenet'
            let networks = await docker.listNetworks()
            let network = networks.filter( network => network.Name == networkName )
            if (network.length > 0) {
                botNetwork = await docker.getNetwork(network[0].Id)
            } else {
                botNetwork = await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
            }
            try {
                await docker.pull(opts.Image)
                container = await docker.createContainer(opts)
                containerId = container.id
                
                try {
                    await botNetwork.connect({Container: container.id})
                    try {
                        container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                            stream.pipe(process.stdout)
                        })
                        await container.start()
                        res.status(200).json({id: container.id})
                    } catch (e) {
                        console.log('error starting container...')
                        console.log(e)
                        res.status(500).json({})
                    }
                    
                } catch (e) {
                    console.log('error connecting container to bot network...')
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('failed to create container...')
                console.log(e)
                res.status(500).json({})
            }
        } catch (e) {
            console.log('create network error...')
            console.log(e)
            res.status(500).json({})
        }
        */