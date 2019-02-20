$(document).ready(initializeApp);

function initializeApp(){
    console.log('ready');
    $(".card").on('click', card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_details = {}; //###return value of class and imgsource for comparison
var second_card_details = {};
var wait_timeout = false;
var total_possible_matches = 2; //full game = 9
var match_counter = 0;

function card_clicked(){
    console.log('enter card_clicked');
    if(!wait_timeout) {
        $(".back", this).hide(); //show card face or $(this).find(".back").hide();
        if (first_card_clicked === null) { //check if first_card_clicked === null
            first_card_clicked = $(this); //true: assign first_card_clicked = html DOM Element that was clicked
            first_card_details.class = $(this).attr('class');
            first_card_details.imgsource = $(".front img", this).attr('src');
            disable_card(first_card_clicked);
            console.log(first_card_details);
        } else {
            second_card_clicked = $(this); //false: assign second_card_clicked = html DOM Element that was clicked
            second_card_details.class = $(this).attr('class');
            second_card_details.imgsource = $(".front img", this).attr('src');
            wait_timeout = true;
            console.log(second_card_details);
            console.log(wait_timeout);
            if (first_card_details.class !== second_card_details.class && first_card_details.imgsource === second_card_details.imgsource) { //check if first_card_clicked === second_card_clicked
                console.log('correct match');
                disable_card(second_card_clicked); //###remove click event from success matches
                match_counter++; //true: increment match_counter by 1
                first_card_clicked = null; //reset both variables back to null
                second_card_clicked = null;
                first_card_details = {};
                second_card_details = {};
                wait_timeout = false;
                if (match_counter === total_possible_matches) { //check if match_counter === total_possible_matches
                    alert('You have won!')// true: Display a message to user they have won
                } //false: click handler function is complete, return
            } else {
                console.log('not matched');
                setTimeout(reset_incorrect_match, 2000); //false: wait 2s, then perform a function
            }
        }
    }
}
//v put the check class and imgsource in an object
//toggle function .... double-clicking first card will unflip the card - think of how to inactivate the first card until second card is clicked
//v add a global flag (check_card_flipped = true)
//v pointer-event: none to avoid card flipping during reset delay doesn't work
//add css to alert dialog
//DOM creation - create cards
//shuffle cards
//.slideDown() jQuery for completion message
//remove all console.log() after checks

function reset_incorrect_match(){
    console.log('reset cards');
    $(".back", first_card_clicked).show();
    $(".back", second_card_clicked).show(); //show card back on both elements that are flipped over
    reactivate_card(first_card_clicked);
    first_card_clicked = null; //reset both card_clicked variables back to null
    second_card_clicked = null;
    first_card_details = {};
    second_card_details = {};
    wait_timeout = false;
}

function disable_card(card){
    $(card).off('click');
}

function reactivate_card(card){
    $(card).on('click', card_clicked);
}