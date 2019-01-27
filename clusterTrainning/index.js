const cluster = require('cluster')
const express = require('express')
const cpus = require('os').cpus().length;


if(cluster.isMaster){
    console.log('master process started', cpus)
    for(let i = 0; i < cpus -1; i++){
        console.log('forking process')
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
          console.log(`Worker ${worker.id} crashed. ` +
                      'Starting a new worker...');
          cluster.fork();
        }
    });

}else {
    const app = express()
    const pid = process.pid

    app.get('/', (req, res) => {
        let test = 0
        for(let i = 0; i < 1000000000; i++){
            test++
        }
        res.send(`response on ${pid} and ${test}`)
    })

    app.listen('8080', () => {
        console.log('listening with process', pid)
    })
}

