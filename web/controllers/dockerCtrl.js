let Dockerode = require('dockerode')
let DockerodeCompose = require('dockerode-compose')


module.exports = {

    startBot: async function (req, res) {
        let docker = new Dockerode({host: '127.0.0.1', port: 3000});
        let compose = new DockerodeCompose(docker, `${process.cwd()}/freqtrade/docker-compose.yml`, 'helloworld')
        try {
            await compose.pull()
            let state = await compose.up()
            console.log(state)
            res.status(200).json(state)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },

    stopBot: async function (req, res) {
        let docker = new Dockerode({host: '127.0.0.1', port: 3000})
        let compose = new DockerodeCompose(docker, `${process.cwd()}/freqtrade/docker-compose.yml`, 'helloworld')
        try {
            let state = await compose.down({ volumes: true })
            console.log(state)
            res.status(200).json(state)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    },

    restartBot: async function () {
        let docker = new Dockerode({host: '127.0.0.1', port: 3000})
        let compose = new DockerodeCompose(docker, `${process.cwd()}/freqtrade/docker-compose.yml`, 'helloworld')
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