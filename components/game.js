class Game {
    constructor(info){
        this.frontImages = info.frontImages;
        this.backImage = info.backImage;
        this.cardDeck = [];
        this.cardClicked = [];
        this.totalPossibleMatches = this.frontImages.length;
        this.stats = new Stats();

        this.handleCardClicked = this.handleCardClicked.bind(this);
        this.resetIncorrectMatch = this.resetIncorrectMatch.bind(this);
        this.resetButton = this.resetButton.bind(this);
    }
    startGame(){
        $(".alert").hide();
        this.stats.displayStats();
        $("#game-area").empty();
        this.createCard();
        $(".reset").on('click', this.resetButton);
    }

    shuffleCard(){
        var imagesArray = this.frontImages.concat(this.frontImages);
        for(var index = 0; index < imagesArray.length; index++){
            var randomIndex = Math.floor(Math.random() * imagesArray.length);
            var tempItem = imagesArray[index];
            imagesArray[index] = imagesArray[randomIndex];
            imagesArray[randomIndex] = tempItem;
        }
        return imagesArray;
    }

    createCard(){
        var shuffledFrontImages = this.shuffleCard();
        for(var index = 0; index < shuffledFrontImages.length; index++){
            var card = new Card(shuffledFrontImages[index], this.backImage, this.handleCardClicked);
            this.cardDeck.push(card);
            var domElement = card.render();
            $("#game-area").append(domElement);
        }
    }

    handleCardClicked(cardObj){
        this.cardClicked.push(cardObj);
        cardObj.reveal();

        if(this.cardClicked.length < 2){
            cardObj.disableClick();
        }

        if(this.cardClicked.length === 2){
            this.stats.updateStats('attempts');
            for(var index = 0; index < this.cardDeck.length; index++){
                this.cardDeck[index].disableClick();
            }
            if(this.cardClicked[0].getValue() === this.cardClicked[1].getValue()){
                this.stats.updateStats('matches');
                this.cardClicked[0].domElements.cardContainer.addClass('matched');
                this.cardClicked[1].domElements.cardContainer.addClass('matched');
                for(var index = 0; index < this.cardDeck.length; index++){
                    this.cardDeck[index].activateClick();
                }
                this.cardClicked = [];
                if(this.stats.matches === this.totalPossibleMatches){
                    $(".alert").show();
                }
            }else {
                setTimeout(this.resetIncorrectMatch, 2000);
            }
        }
        this.stats.displayStats();
    }

    resetIncorrectMatch(){
        for(var index = 0; index < this.cardDeck.length; index++){
            this.cardDeck[index].activateClick();
        }
        this.cardClicked[0].hide();
        this.cardClicked[1].hide();
        this.cardClicked = [];
    }

    resetButton(){
        this.stats.updateStats('gamesPlayed');
        this.stats.resetStats();
        this.startGame();
    }
}