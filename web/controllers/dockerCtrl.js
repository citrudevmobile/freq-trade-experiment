let Dockerode = require('dockerode')
let Task = require('../models/task.model')
const writeJson = require('write')
const fs = require('fs-sync')
const fsPerm = require('fs');


module.exports = {

    startCtrlBot: async function (req, res) {
        // start controller bot
        let ctrlCreateOptions = {
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
        containers = containers.filter(container => container.Names.includes(`/ctrl`))
        if (!(containers.length > 0)) {
            try {
                let networkName = ctrlCreateOptions.HostConfig.NetworkMode
                let networks = await docker.listNetworks()
                let network = networks.filter(network => network.Name == networkName)
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
                    res.status(200).json({ id: container.id, name: ctrlCreateOptions.name })
                } catch (e) {
                    console.log(e)
                    res.status(500).json({})
                }
            } catch (e) {
                console.log('Error occured while creating bot network...')
                console.log(e)
                res.status(500).json({ message: 'Internal server error' })
            }
        } else {
            res.status(200).json({ id: containers[0].Id, name: ctrlCreateOptions.name })
        }
    },


    stopCtrlBot: async function (req, res) {
        // stop controller bot
        let docker = new Dockerode()
        let container = null
        try {
            let containers = await docker.listContainers()
            containers = containers.filter(container => container.Names.includes(`/ctrl`))
            console.log(containers)
            if (containers.length > 0) {
                container = docker.getContainer(containers[0].Id)
                container.remove({
                    force: true
                }, function (err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({ message: `container ctrl has been shut down` })
                })
            } else {
                res.status(200).json({ message: `container ctrl not found. Already shut down` })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    },


    createTradeBot: async function (req, res) {

        let task = null

        const configFile = `${process.cwd()}/user_data/${req.body.name}_config.json`
        const logFile = `${process.cwd()}/user_data/${req.body.name}_freqtrade.log`
        const dbUrl = `${process.cwd()}/user_data/${req.body.name}_tradesv3.sqlite`
        const dbUrlSimulate = `${process.cwd()}/user_data/${req.body.name}_simulate_tradesv3.sqlite`

        let recipe = `{
            "max_open_trades":${req.body.maxOpenTrades || 5},
            "stake_currency":"${req.body.quoteCurrency}",
            "stake_amount":${req.body.stakeAmount},
            "tradable_balance_ratio":${req.body.tradableBalanceRatio ||0.99},
            "timeframe":"${req.body.timeFrame}",
            "dry_run":${req.body.dryRun || true},
            "available_capital":${req.body.availableCapital},
            "dry_run_wallet": 100000,
            "cancel_open_orders_on_exit": true,
            "unfilledtimeout": {
                "buy": 10,
                "sell": 10,
                "exit_timeout_count": 0,
                "unit": "minutes"
            },
            "bid_strategy": {
                "ask_last_balance": 0.0,
                "use_order_book": true,
                "order_book_top": 1,
                "check_depth_of_market": {
                    "enabled": false,
                    "bids_to_ask_delta": 1
                }
            },
            "ask_strategy": {
                "use_order_book": true,
                "order_book_top": 1
            },
            "exchange": {
                "name":"${req.body.exchangeName || 'binance'}",
                "key":"${req.body.exchangeKey || 'zLqPHbEBGRXigIjRcANw0xRqXus1hDnt4prZbzQeEAWNjE5df0wV9bMTr2sLiE79'}",
                "secret":"${req.body.exchangeSecret ||  'grYKHq2QG5J1S3VF4kJg5OceOJeY97E8BmN6omBlMneY1dcHMS5e25QLTI7v7Pbu'}",
                "ccxt_config": {},
                "ccxt_async_config": {
                },
                "pair_whitelist": [
                    "${req.body.baseCurrency}/${req.body.quoteCurrency}"
                ],
                "pair_blacklist": [
                ]
            },
            "pairlists": [
                {"method": "StaticPairList"}
            ],
            "edge": {
                "enabled": false,
                "process_throttle_secs": 3600,
                "calculate_since_number_of_days": 7,
                "allowed_risk": 0.01,
                "stoploss_range_min": -0.01,
                "stoploss_range_max": -0.1,
                "stoploss_range_step": -0.01,
                "minimum_winrate": 0.60,
                "minimum_expectancy": 0.20,
                "min_trade_number": 10,
                "max_trade_duration_minute": 1440,
                "remove_pumps": false
            },
            "webhook": {
                "enabled": true,
                "url": "http://103.155.93.61/notify-tradebot/${req.body.name}/${req.user}",
                "retries": 3,
                "retry_delay": 0.2,
                "webhookstatus": {
                    "status": "{status}"
                },
                "webhookbuy": {
                    "trade_id" : "{trade_id}",
                    "exchange" : "{exchange}",
                    "pair" : "{pair}",
                    "open_rate" : "{open_rate}",
                    "amount" : "{amount}",
                    "open_date" : "{open_date}",
                    "stake_amount" : "{stake_amount}",
                    "stake_currency" : "{stake_currency}",
                    "base_currency" : "{base_currency}",
                    "fiat_currency" : "{fiat_currency}",
                    "order_type" : "{order_type}",
                    "current_rate": "{current_rate}",
                    "buy_tag" : "{buy_tag}"
                },
                "webhooksell": {
                    "trade_id": "{trade_id}",
                    "exchange": "{exchange}",
                    "pair": "{pair}",
                    "gain": "{gain}",
                    "limit": "{limit}",
                    "amount": "{amount}",
                    "open_rate": "{open_rate}",
                    "profit_amount": "{profit_amount}",
                    "profit_ratio": "{profit_ratio}",
                    "stake_currency": "{stake_currency}",
                    "base_currency": "{base_currency}",
                    "fiat_currency" : "{fiat_currency}",
                    "sell_reason" : "{sell_reason}",
                    "order_type" : "{order_type}",
                    "open_date" : "{open_date}",
                    "close_date" : "{close_date}"
                }
            },
            "bot_name": "${req.body.name}",
            "initial_state": "running",
            "forcebuy_enable": false,
            "db_url": "${req.body.dryRun ? `sqlite:////freqtrade/user_data/${req.body.name}_tradesv3.sqlite` : `sqlite:////freqtrade/user_data/${req.body.name}_simulate_tradesv3.sqlite`}",
            "user_data_dir": "/freqtrade/user_data",
            "strategy": "Strategy005",
            "strategy-path": "/freqtrade/user_data/strategies",
            "internals": {
                "process_throttle_secs": 5
            } 
        }
        `
        console.log(recipe)
        
        const dbUrlStream = fsPerm.createWriteStream(dbUrl, { mode: 0o777 })
        dbUrlStream.write('')
        dbUrlStream.end()

        const dbUrlSimulateStream = fsPerm.createWriteStream(dbUrlSimulate, { mode: 0o777 })
        dbUrlSimulateStream.write('')
        dbUrlSimulateStream.end()

        const logFileStream = fsPerm.createWriteStream(logFile, { mode: 0o777 })
        logFileStream.write('')
        logFileStream.end()

        const configFileStream = fsPerm.createWriteStream(configFile, { mode: 0o777 })
        configFileStream.write(recipe)
        configFileStream.end()

        let config = {
            name: req.body.name,
            Hostname: req.body.name,
            WorkingDir: "/freqtrade",
            Image: 'freqtradeorg/freqtrade:stable',
            Tty: false,
            OpenStdin: false,
            ExposedPorts: { '8080/tcp': {} },
            HostConfig: {
                NetworkMode: 'freqtrade_network',
                Binds: [`${process.cwd()}/user_data:/freqtrade/user_data`]
            },
            Entrypoint: ["freqtrade"],
            Cmd: ['trade', '-c', `/freqtrade/user_data/${req.body.name}_config.json`],
        }


        let createContainer = async function (name, config, configRecipe, botConfigFile, botLogFile, botDB, botSimulateDB, req, res) {
            let docker = new Dockerode()
            let container = null
            let containers = await docker.listContainers()
            containers = containers.filter(container => container.Names.includes(`/${name}`))
            if (!(containers.length > 0)) {
                try {
                    let networkName = config.HostConfig.NetworkMode
                    let networks = await docker.listNetworks()
                    let network = networks.filter(network => network.Name == networkName)
                    if (!(network.length > 0)) {
                        await docker.createNetwork({ 'Name': networkName, 'CheckDuplicate': true })
                    }
                    try {
                        container = await docker.createContainer(config)
                        try {
                            let newTask = new Task()
                            newTask.user = req.user
                            newTask.name = name
                            newTask.config = config
                            newTask.taskId = container.id
                            newTask.configFile = botConfigFile
                            newTask.logFile = botLogFile
                            newTask.botDB = botDB
                            newTask.botSimulateDB = botSimulateDB
                            newTask.recipe = JSON.parse(configRecipe)
                            await newTask.save()
                            res.status(200).json({})
                        } catch (e) {
                            console.log(e)
                            res.status(500).json({})
                        }

                    } catch (e) {
                        console.log(e)
                        res.status(500).json({})
                    }
                } catch (e) {
                    console.log('Error occured while creating bot network...')
                    console.log(e)
                    res.status(500).json({})
                }
            } else {
                res.status(200).json({})
            }
        }

        try {
            task = await Task.findOne({ name: req.body.name })
            if (!task) {
                await createContainer(req.body.name, config, recipe, configFile, logFile, dbUrl, dbUrlSimulate, req, res)
            } else {
                res.status(200).json({})
            }
        } catch (err) {
            res.status(500).json({})
        }
    },

    getUserBots: async function (req, res) {
        Task.find({ user: req.user }, { config: 0 }, function (err, tasks) {
            if (err) return res.status(500).json({})
            res.status(200).json(tasks)
        })
    },

    startTradeBot: async function (req, res) {
        let docker = new Dockerode()
        let container = null
        Task.findOne({ taskId: req.body.taskId }, async function (err, task) {
            if (err) return res.status(500).json({})
            try {
                container = await docker.getContainer(req.body.taskId)
                await container.attach({
                    stream: true,
                    stdout: true,
                    stderr: true
                }, function handler(err, stream) {
                    container.modem.demuxStream(stream, process.stdout, process.stderr)
                })
                await container.start()
                task.status = true
                task.save(function (err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({})
                })
            } catch (e) {
                res.status(500).json({ message: 'Internal server error' })
            }
        })
    },

    stopTradeBot: async function (req, res) {
        // start tradebot with a specified name
        let docker = new Dockerode()
        let container = null
        Task.findOne({ taskId: req.body.taskId }, async function (err, task) {
            if (err) return res.status(500).json({})
            try {
                container = await docker.getContainer(req.body.taskId)
                await container.stop()
                task.status = false
                task.save(function (err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({})
                })
            } catch (e) {
                res.status(500).json({ message: 'Internal server error' })
            }
        })
    },



    deleteTradeBot: async function (req, res) {
        // stop tradebot with a specified name
        let docker = new Dockerode()
        let container = null
        try {
            container = docker.getContainer(req.body.taskId)
            container.remove({
                force: true
            }, function (err) {
                if (err) return res.status(500).json({})
                Task.findOneAndDelete({ taskId: req.body.taskId }, function (err, task) {
                    if (err) return res.status(500).json({})
                    try {
                        fs.remove(task.configFile)
                        fs.remove(task.logFile)
                        fs.remove(task.botDB)
                        fs.remove(task.botSimulateDB)
                        res.status(200).json({})
                    } catch (e) {
                        res.status(500).json({})
                    }
                })
            })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    notifyTradeBot: async function (req, res) {
        //req.body
        Task.findOne({ user: req.params.username, name: req.params.botname }, async function (err, task) {
            if (err) return res.status(500).json({})
            try {
               if (req.body.trade_id) {
                task.trades.push(req.body)
                task.save(function (err) {
                    if (err) return res.status(500).json({})
                    res.status(200).json({})
                })
               } else {
                    res.status(200).json({})
               }
            } catch (e) {
                res.status(500).json({})
            }
        })
    },
}