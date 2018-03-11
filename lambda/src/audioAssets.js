'use strict';

let en = {
    card : {
        title: 'Pepper Radio',
        subtitle: 'Pepper',
        cardContent: "Visit our web site https://www.pepper966.gr",
        image: {
            largeImageUrl: 'https://www.pepper966.gr/wp-content/uploads/2014/07/pepper-logo.png',
            smallImageUrl: 'https://www.pepper966.gr/wp-content/uploads/2014/07/pepper-logo.png'
        }
    },
    url: 'https://www.pepper966.gr'
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
