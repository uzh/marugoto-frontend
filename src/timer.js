export default function timer(duration) {
    let seconds = duration;
    let days        = Math.floor(seconds / 24 / 60 / 60);
    let hoursLeft   = Math.floor((seconds) - (days * 86400));
    let hours       = Math.floor(hoursLeft / 3600);
    let minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    let minutes     = Math.floor(minutesLeft / 60);
    let secondsLeft = seconds % 60;
    function pad(n) {
        return (n < 10 ? "0" + n : n);
    }
    console.log(pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(secondsLeft));
    if (seconds == 0) {
        clearInterval(countdownTimer);
    } else {
        seconds--;
    }
}
var countdownTimer = setInterval('timer(132801)', 1000);