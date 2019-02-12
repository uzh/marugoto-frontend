/* eslint-disable */
import store from './store'

export default class Timer{
    constructor(time, callback, callbackPayload) {
        this.time = time;
        this.callback = callback;
        this.payload = callbackPayload;
    }
    
    start() {
        var self = this;
        var timer = setInterval( function(){
            if( self.time > 0 ){
                console.log('timer: ', self.time);
                self.time--;
            }else{
                if(self.callback && typeof self.callback === "function"){
                    console.log('timer DOne ');
                    self.callback(self.payload);
                }
                clearInterval(timer);
            }
        }, 1000 );
    }
}