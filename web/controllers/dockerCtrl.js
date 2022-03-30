let Dockerode = require('dockerode')
let Task = require('../models/task.model')

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
        let container = null
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

    
    createTradeBot: async function (req, res) {
        //start trade bot with a specified name
        // should be create container instead
        let task = null
       
        
        let config =  {
            name: req.body.name, 
            Hostname: req.body.name, 
            Image: 'freqtradeorg/freqtrade:stable',
            Env: [
            `FREQTRADE__BOT_NAME=${req.body.name}`, 
            `FREQTRADE__MAX_OPEN_TRADES=${req.body.maxOpenTrades || 3}`,
            `FREQTRADE__STAKE_CURRENCY=${req.body.stakeCurrency || "BTC"}`,
            `FREQTRADE__STAKE_AMOUNT=${req.body.stakeAmount || 0.05}`,
            `FREQTRADE__TIMEFRAME=${req.body.timeframe || "1m"}`,
            `FREQTRADE__AVAILABLE_CAPITAL=${req.body.availableCapital || 2 }`,
            `FREQTRADE__DRY_RUN=${req.body.dryRun || true}`,
            `FREQTRADE__EXCHANGE__NAME=${req.body.exchangeName || 'binance'}`,
            `FREQTRADE__EXCHANGE__KEY=${req.body.exchangeKey || 'zLqPHbEBGRXigIjRcANw0xRqXus1hDnt4prZbzQeEAWNjE5df0wV9bMTr2sLiE79'}`,
            `FREQTRADE__EXCHANGE__SECRET=${req.body.exchangeSecret || 'grYKHq2QG5J1S3VF4kJg5OceOJeY97E8BmN6omBlMneY1dcHMS5e25QLTI7v7Pbu'}`,
            ],
            ExposedPorts: { '8080/tcp': {} }, 
            HostConfig: {
                NetworkMode: 'freqtrade_network',
                Binds: [`${process.cwd()}/freqtrade/user_data:/freqtrade/user_data`] 
            },
            Entrypoint: ["freqtrade"],
            Cmd: [`trade`, `-`,`{
                "max_open_trades": 5,
                "stake_currency": "BTC",
                "stake_amount": 0.05,
                "tradable_balance_ratio": 0.99,
                "fiat_display_currency": "USD",
                "timeframe": "5m",
                "dry_run": true,
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
                    "name": "binance",
                    "key": "zLqPHbEBGRXigIjRcANw0xRqXus1hDnt4prZbzQeEAWNjE5df0wV9bMTr2sLiE79",
                    "secret": "grYKHq2QG5J1S3VF4kJg5OceOJeY97E8BmN6omBlMneY1dcHMS5e25QLTI7v7Pbu",
                    "ccxt_config": {},
                    "ccxt_async_config": {
                    },
                    "pair_whitelist": [
                        "ETH/BTC"
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
                "telegram": {
                    "enabled": false,
                    "token": "your_telegram_token",
                    "chat_id": "your_telegram_chat_id"
                },
                "api_server": {
                    "enabled": true,
                    "listen_ip_address": "0.0.0.0",
                    "listen_port": 8080,
                    "verbosity": "error",
                    "jwt_secret_key": "somethingrandom",
                    "CORS_origins": [],
                    "username": "freqtrader",
                    "password": "SuperSecurePassword"
                },
                "bot_name": "freqtrade",
                "initial_state": "running",
                "forcebuy_enable": false,
                "db_url": "sqlite:////freqtrade/user_data/tradesv3.sqlite",
                "logfile": "/freqtrade/user_data/logs/freqtrade.log",
                "user_data_dir": "/freqtrade/user_data",
                "strategy": "Strategy005",
                "strategy-path": "/freqtrade/user_data/strategies",
                "internals": {
                    "process_throttle_secs": 5
                } 
            }
            `],
        }

        
        let createContainer = async function (name, config, req, res) {

        let docker = new Dockerode()
        let container = null
        let containers = await docker.listContainers()
        containers = containers.filter( container => container.Names.includes(`/${name}`) )
        if (!(containers.length > 0)) { 
            try {
                let networkName = config.HostConfig.NetworkMode
                let networks = await docker.listNetworks()
                let network = networks.filter( network => network.Name == networkName )
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
                            await newTask.save()
                            res.status(200).json({})
                        } catch (e) {
                            console.log(e)
                            res.status(500).json({})
                        }

                    } catch(e) {
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
            task = await Task.findOne({name: req.body.name})
            if (!task) {
               await createContainer(req.body.name, config, req, res)
            } else {
                res.status(200).json({})
            }
        } catch (err) {
            res.status(500).json({})
        }

    },

    getUserBots: async function (req, res) {
        Task.find({user: req.user}, { config: 0 }, function (err, tasks) {
            if (err) return res.status(500).json({})
            res.status(200).json(tasks)
        })
    },

    startTradeBot: async function (req, res) {
         // start tradebot with a specified name
         let docker = new Dockerode()
         let container = null
         Task.findOne({taskId: req.body.taskId}, async function (err, task) {
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
                 res.status(500).json({message: 'Internal server error'})
             }
        })
         
        
    },

    stopTradeBot: async function (req, res) {
        // start tradebot with a specified name
        let docker = new Dockerode()
        let container = null
        Task.findOne({taskId: req.body.taskId}, async function (err, task) {
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
                res.status(500).json({message: 'Internal server error'})
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
                }, function(err) {
                    if (err) return res.status(500).json({})
                    Task.findOneAndDelete({taskId: req.body.taskId }, function (err) {
                        if (err) return res.status(500).json({})
                        res.status(200).json({})
                    })
                })
            
        } catch (e) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}