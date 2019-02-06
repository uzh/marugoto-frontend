export function Timer(time){
    var self = this;
    this.duration = time;
    this.days        = Math.floor(this.duration / 24 / 60 / 60);
    this.hoursLeft   = Math.floor((this.duration) - (this.days * 86400));
    this.hours       = Math.floor(this.hoursLeft / 3600);
    this.minutesLeft = Math.floor((this.hoursLeft) - (this.hours * 3600));
    this.minutes     = Math.floor(this.minutesLeft / 60);
    this.seconds = this.duration % 60;

    this.pad = function(n) { return (n < 10 ? "0" + n : n); };

    this.logIt = function() {
        return; //console.log('Timer: ', this.pad(this.days) + ":" + this.pad(this.hours) + ":" + this.pad(this.minutes) + ":" + this.pad(this.seconds));
    };

    this.clearedInterval = function() {
        if (this.duration == 0) {
            clearInterval(this.start);
            return true;
        } else {
            this.duration--;
            this.days        = Math.floor(this.duration / 24 / 60 / 60);
            this.hoursLeft   = Math.floor((this.duration) - (this.days * 86400));
            this.hours       = Math.floor(this.hoursLeft / 3600);
            this.minutesLeft = Math.floor((this.hoursLeft) - (this.hours * 3600));
            this.minutes     = Math.floor(this.minutesLeft / 60);
            this.seconds = this.duration % 60;
        }
    };  

    this.start = setInterval(function(){
        self.clearedInterval();
        if( self.clearedInterval() ){
            return;
        }
        self.logIt();
    }, 1000);
    
};