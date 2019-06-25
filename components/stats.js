class Stats {
    constructor(){
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.gamesPlayed = 0;
    }

    updateStats(type){
        if(type === 'matches'){
            this.matches++;
        } else if(type === 'attempts'){
            this.attempts++;
        } else if(type === 'gamesPlayed'){
            this.gamesPlayed++;
        }
        this.displayStats();
    }

    calcAccuracy(){
        this.accuracy = this.matches / this.attempts * 100;
        this.accuracy = this.accuracy.toFixed();
        if(isNaN(this.accuracy)){
            return 0;
        }
        return this.accuracy;
    }

    displayStats(){
        $(".games-played .value").text(this.gamesPlayed);
        $(".attempts .value").text(this.attempts);
        this.accuracy = this.calcAccuracy();
        $(".accuracy .value").text(this.accuracy + '%');
    }

    resetStats(){
        this.accuracy = 0;
        this.matches = 0;
        this.attempts = 0;
    }
}