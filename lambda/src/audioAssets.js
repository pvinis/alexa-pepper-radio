'use strict';

let en = {
    card : {
        title: 'Pepper Radio',
        subtitle: 'Less bla bla, more la la',
        cardContent: "Visit our web site https://www.myradio.com",
        image: {
            largeImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-1200.png',
            smallImageUrl: 'https://s3.amazonaws.com/alexademo.ninja/maxi80/alexa-artwork-720.png'
        }
    },
    url: 'https://stream.radiojar.com/pepper.m3u',
    startJingle: 'https://s3-eu-west-1.amazonaws.com/alexa.maxi80.com/assets/jingle.m4a',
};

let globalAudioData = {
    'en-US': en,
    'en-GB': en
};

function audioData(request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request === undefined ? DEFAULT_LOCALE : request.locale;
    if (locale === undefined) { 
        locale = DEFAULT_LOCALE
    };
    return globalAudioData[locale];    
}

module.exports = audioData;
