export default class Timer{
    constructor(time, callback, callbackPayload) {
        this.time = time;
        this.callback = callback;
        this.payload = callbackPayload;
        this.timerContainer = {};
    }
    
    start() {
        var self = this;
        this.timerContainer = setInterval( function(){
            if( self.time > 0 ){
                self.time--;
            }else{
                if(self.callback && typeof self.callback === "function"){
                    if( self.payload ){
                        self.callback(self.payload);
                    }else{
                        self.callback();
                    }
                }
                clearInterval(self.timerContainer);
            }
        }, 1000 );
    }

    stop() {
        clearInterval(this.timerContainer);
    }
}