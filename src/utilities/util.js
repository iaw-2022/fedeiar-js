function SecondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    const hours_text = hours == 1 ? 'hour' : 'hours';
    const minutes_text = minutes == 1 ? 'minute' : 'minutes';
    const seconds_text = seconds == 1 ? 'second' : 'seconds';

    return `${hours} ${hours_text}, ${minutes} ${minutes_text}, ${seconds} ${seconds_text}`;
}

function SecondsToTimeToArray(totalSeconds){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
}

function TimeToSeconds(hours, minutes, seconds){
    return (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
}

function parseYoutubeURL(URL){
    let video_id = URL.split('v=')[1];
    if(video_id == null){
        return null;
    }
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}

module.exports = {
    SecondsToTime,
    SecondsToTimeToArray,
    TimeToSeconds,
    parseYoutubeURL
}