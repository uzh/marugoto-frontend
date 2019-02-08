/* eslint-disable */
import store from './store'

export default class Timer{
    constructor(time, payload) {
        this.time = time;
        this.payload = payload;
    }
    
    start() {
        var cTime = this.time;
        var payload = this.payload;
        var timer = setInterval( function(){
            if( cTime > 0 ){
                console.log('timer: ', cTime);
                cTime--;
            }else{
                if(payload){
                    store.dispatch('HANDLE_NEW_MAIL', payload)
                }
                clearInterval(timer);
            }
        }, 1000 );
    }
}