'use strict';

var Alexa = require('alexa-sdk');
var ddb = require('./ddbController.js');
var audioData = require('./audioAssets');
var controller = require('./audioController.js');
var constants = require('./constants');


var intentHandlers = {
    'LaunchRequest': function () {
        this.emit('PlayAudio');
    },
    'PlayAudio': function () {

        let request = this.event.request;

        // play the radio directly
        controller.play.call(this, this.t('WELCOME_MSG', {
            skillName: audioData(request).card.title
        }), audioData(request).url, audioData(request).card);
    },
    'AMAZON.HelpIntent': function () {
        this.response.listen(this.t('HELP_MSG', {
            skillName: audioData(this.event.request).card.title
        }));
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        // No session ended logic
        // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
        this.emit(':responseReady');
    },
    'System.ExceptionEncountered': function () {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(this.event.request, null, 2));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak(this.t('UNHANDLED_MSG'));
        this.emit(':responseReady');
    },
    'AMAZON.NextIntent': function () {
        this.response.speak(this.t('CAN_NOT_SKIP_MSG'));
        this.emit(':responseReady');
    },
    'AMAZON.PreviousIntent': function () {
        this.response.speak(this.t('CAN_NOT_SKIP_MSG'));
        this.emit(':responseReady');
    },

    'AMAZON.PauseIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        controller.stop.call(this, this.t('STOP_MSG'))
    },

    'AMAZON.ResumeIntent': function () {
        controller.play.call(this, this.t('RESUME_MSG'), audioData(this.event.request).url, audioData(this.event.request).card)
    },

    'AMAZON.LoopOnIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.LoopOffIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.ShuffleOnIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.ShuffleOffIntent': function () {
        this.emit('AMAZON.StartOverIntent');
    },
    'AMAZON.StartOverIntent': function () {
        this.response.speak(this.t('NOT_POSSIBLE_MSG'));
        this.emit(':responseReady');
    },

    /*
     *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
     */
    'PlayCommandIssued': function () {
        controller.play.call(this, this.t('WELCOME_MSG', {
            skillName: audioData(this.event.request).card.title
        })), audioData(this.event.request).url, audioData(this.event.request).card
    },
    'PauseCommandIssued': function () {
        controller.stop.call(this, this.t('STOP_MSG'))
    }
}

module.exports = intentHandlers;
