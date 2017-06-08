/*
* @Author: Zervanto
* @Date:   2017-06-08 17:29:36
* @Last Modified by:   Zervanto
* @Last Modified time: 2017-06-08 17:29:41
*/

var soulmate = soulmate || {};
soulmate.createWSServer = function () {
    //create udp server
    var udpAddress = '230.185.192.140';
    var udpPort = 41234;
    var webSocketPort = 7856;

    const server = require('dgram').createSocket('udp4');

    server.bind(udpPort, function () {
        console.log('UDP binded.');
        server.setBroadcast(true)
        server.setMulticastTTL(128);
        server.addMembership(udpAddress);
    });

    server.on('listening', function(address){
      console.log('UDP listening: ' + address.address + ':' + address.port);
    });

    server.on('message', function(msg, rinfo){
        console.log('UDP received: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
        server.send(Buffer.from('port:' + webSocketPort), rinfo.port, rinfo.address, function(err){
            //nothing to do
        });
    });

    server.on('error', function(err){
      console.log('UDP error:' + err.stack);
    });

    //create web socket server
    var wsServer = new require('ws').Server({
        port: webSocketPort
    });
    return wsServer
};