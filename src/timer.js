/* eslint-disable */
export default class Timer{
    constructor(time, callback) {
        this.time = time;
        this.callback = callback;
    }
    
    start() {
        var cTime = this.time;
        var callback = this.callback;
        var timer = setInterval( function(){
            if( cTime > 0 ){
                cTime--;
            }else{
                callback();
                clearInterval(timer);
            }
        }, 1000 );
    }
}