let Dockerode = require('dockerode')
//let DockerodeCompose = require('dockerode-compose')
let DockerodeCompose = require('../libs/dockerode-compose/compose')
let containerId = ""

let opts = {
    name: 'freqtrade',
    Image: 'freqtradeorg/freqtrade',
    Env: [],
    Volumes: { '/freqtrade/user_data': {} },
    HostConfig: {
        Binds: ['/root/trader_bot/web/freqtrade/user_data:/freqtrade/user_data']
      },
    ExposedPorts: { '8080/tcp': {} },
    Cmd: 'trade --logfile /root/trader_bot/web/freqtrade/user_data/logs/freqtrade.log --db-url sqlite:////root/trader_bot/web/freqtrade/user_data/tradesv3.sqlite --config /root/trader_bot/web/freqtrade/user_data/config.json --strategy SampleStrategy\n'
  }
  

module.exports = {

    startBot: async function (req, res) {
        
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
        let createOptions =  {
            name: 'ctrl', 
            Hostname: 'ctrl', 
            //Volumes: { '/freqtrade/user_data': {} }, 
            Image: 'controller',
            ExposedPorts: { '8080/tcp': {} }, 
            HostConfig: { 
                NetworkMode: 'freqtradenet', 
                //Binds: ['/root/trader_bot/web/freqtrade/user_data:/freqtrade/user_data']
                PortBindings: {
                    "8080/tcp": [{
                        "HostPort": "8080"
                    }],
                },
            },

        }

        

        /*
        let docker = new Dockerode()
        try {
            const image = docker.getImage('controller')
            let result  = await image.inspect()
            console.log(result)
            res.status(200).json({})
        } catch (e) {
            res.status(500).json({})
        }
        */
        
        let docker = new Dockerode()
        let container = null
        try{
            container = await docker.createContainer(createOptions)
            containerId = container.id
            console.log(containerId)
            await container.start()
            let result  = await container.inspect()
            console.log(result)
            res.status(200).json({id: containerId})
        } catch(e) {
            console.log(e)
            res.status(500).json({})
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