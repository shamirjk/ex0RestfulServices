'use strict';
var http = require ('http');
var express= require ('express');
//var eventEmitter = require ('events');
var eventsConfig = require('./modules/config');
var Competitor = require ("./modules/competitor");

var app = express();

app.get(`/`, function(req, res) {
    var competitor_one = new Competitor ("Michael Phelps","400m Mixed");
    var competitor_two = new Competitor ("Ian Thorpe","100m Freestyle");

    competitor_one.on(eventsConfig.events.MEDAL_INCREASE, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_INCREASE, function (data) {
        console.log(data);
    });

    competitor_one.on(eventsConfig.events.MEDAL_DECREASE, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_DECREASE, function (data) {
        console.log(data);
    });

    competitor_one.on(eventsConfig.events.MEDAL_SET, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_SET, function (data) {
        console.log(data);
    });

    competitor_one.removeMedal();
    competitor_one.setMedal(-3);
    competitor_one.setMedal(6);
    competitor_two.setMedal(2);
    competitor_one.addMedal();
    competitor_one.removeMedal();
    competitor_two.removeMedal();
    competitor_two.addMedal();

    res.send('<h1>Success</h1> '+competitor_one.printlog());
})

http.createServer(app).listen(3000);//create Server


/**
 * Created by Shamir on 22-Apr-17.
 */


