/* eslint-disable */
export default class Timer{
    constructor(time, callback, callbackPayload) {
        this.time = time;
        this.callback = callback;
        this.payload = callbackPayload;
    }
    
    start() {
        var self = this;
        var timer = setInterval( function(){
            console.log(`Timer started: ${self.time}`);
            if( self.time > 0 ){
                self.time--;
            }else{
                if(self.callback && typeof self.callback === "function"){
                    console.log('timer Done ');
                    if( self.payload ){
                        self.callback(self.payload);
                    }else{
                        self.callback();
                    }
                }
                clearInterval(timer);
            }
        }, 1000 );
    }
}