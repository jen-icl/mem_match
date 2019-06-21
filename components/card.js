class Card {
    constructor(imageFront, imageBack, callback){
        this.cardImage = {
            front: imageFront,
            back: imageBack
        };
        this.callback = callback;
        this.domElements = {
            cardContainer: null,
            front: null,
            back: null
        };
        this.handleCardClick = this.handleCardClick.bind(this);
        this.hide = this.hide.bind(this);
    }

    handleCardClick(){
        this.callback(this)
    }

    getValue(){
        return this.cardImage.front;
    }

    reveal(){
        this.domElements.back.hide();
    }

    hide(){
        this.domElements.back.show();
    }

    disableClick(){
        this.domElements.cardContainer.off('click');
    }

    activateClick(){
        this.domElements.cardContainer.not('.matched').on('click', this.handleCardClick);
    }

    render(){
        this.domElements.cardContainer = $("<div>", {'class': 'cardContainer'});
        this.domElements.cardContainer.on('click', this.handleCardClick);
        this.domElements.front = $("<div>", {'class': 'front'}).append(
            $("<img>", {'src': this.cardImage.front}));
        this.domElements.back = $("<div>", {'class': 'back'}).append(
            $("<img>", {'src': this.cardImage.back,}));
        this.domElements.cardContainer.append(this.domElements.front,  this.domElements.back);
        return this.domElements.cardContainer;
    }

}