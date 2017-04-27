var eventEmitter = require ('events');
var eventsConfig = require ('./config');
var util = require ('util');

var log = []; //log array to print into html file

function Competitor(name, sportType, medals=0) {
    this.name = name;
    this.sportType = sportType;
    this.medals = 0;
    this.printCompetitor();
}

Competitor.prototype.printCompetitor = function (){
    log.push(`Competitor:  ${this.name} <br>
    sportType: ${this.sportType} <br>
    Medals: ${this.medals}<br>`);
}

util.inherits(Competitor, eventEmitter);

Competitor.prototype.addMedal = function () {
    this.medals++;
    this.emit(eventsConfig.events.MEDAL_INCREASE,`Medal added (New Sum of Medals: ${this.medals})`);
    log.push (`Medal Added (New Sum of Medals: ${this.medals})<br>`);
    this.printCompetitor();
};

Competitor.prototype.removeMedal = function (){
    if (this.medals>0){
        this.medals--;
        this.emit(eventsConfig.events.MEDAL_DECREASE,`Medal was Removed (New Sum of Medals: ${this.medals})`);
        log.push (`Medal Removed (New Sum of Medals: ${this.medals})<br>`);
        this.printCompetitor();
    }
    else{
        this.emit(eventsConfig.errors.MIN_MEDAL,`Could not Remove Medal. The Competitor Has No Medals`);
        log.push (`Medal Removed Failed - The Competitor has No Medals`);
    }
};

Competitor.prototype.setMedal = function(num) {
    if (num>=0){
        this.medals=num;
        this.emit(eventsConfig.events.MEDAL_SET,`Medals were Set to ${num} (New Sum of Medals:  ${this.medals})`);
        log.push (`Medals Set to ${num} (New Sum of Medals:  ${this.medals})<br>`);
        this.printCompetitor();
    }
    else{
        this.emit(eventsConfig.errors.MIN_MEDAL,`Medals Set Failed!! You can not give negetive number
        (Sum of Medals: ${this.medals}`);
        log.push (`Medals Set Failed! You can not give negetive number (Sum of Medals:  ${this.medals})`);
    }
};

Competitor.prototype.printlog = function (){
    return log.toString().split(',').join("<br>");
}

module.exports = Competitor;

/**
 * Created by Shamir on 24-Apr-17.
 */
