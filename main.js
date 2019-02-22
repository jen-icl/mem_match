$(document).ready(initializeApp);

function initializeApp(){
    console.log('ready');
    create_card();
    $(".card").on('click', card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_details = {}; //###return value of class and imgsource for comparison
var second_card_details = {};
var wait_timeout = false;
var total_possible_matches = 9; //full game = 9
var match_counter = 0;

var game_images = [
    ['images/mercury.png', 'mercury'],
    ['images/venus.png', 'venus'],
    ['images/earth.png', 'earth'],
    ['images/mars.png', 'mars'],
    ['images/jupiter.png', 'jupiter'],
    ['images/saturn.png', 'saturn'],
    ['images/uranus.png', 'uranus'],
    ['images/neptune.png', 'neptune'],
    ['images/pluto-sphere.png', 'pluto-sphere']
]; //image source list

function random_array(array){
    var current_index = array.length;
    while(0 !== current_index){
        var random_index = Math.floor(Math.random() * current_index);
        current_index--;
        var temp = array[current_index];
        array[current_index] = array[random_index];
        array[random_index] = temp;
    }
    return array;
}

function create_card(){
    console.log('create card');
    var game_area = $("#game-area");
    for(var card_pair = 0; card_pair < 18; card_pair) {
        random_array(game_images);
        for (var index = card_pair; index < card_pair + game_images.length; index++) {
            var create_card_div = $("<div>").addClass('card no' + index);
            var create_front_div = $("<div>").addClass('front');
            var create_front_img = $("<img>").attr({
                'src': game_images[index - card_pair][0],
                'alt': game_images[index - card_pair][1]
            });
            var create_back_div = $("<div>").addClass('back');
            var create_back_img = $("<img>").attr({
                'src': 'images/galaxy.png',
                'alt': 'card back'
            });
            create_front_div.append(create_front_img);
            create_back_div.append(create_back_img);
            create_card_div.append(create_front_div, create_back_div);
            game_area.append(create_card_div);
        }
        card_pair = index;
    }
}

function card_clicked(){
    console.log('enter card_clicked');
    if(!wait_timeout) {
        $(".back", this).hide(); //show card face or $(this).find(".back").hide();
        if (first_card_clicked === null) {  //check if first_card_clicked === null
            first_card_clicked = $(this); //true: assign first_card_clicked = html DOM Element that was clicked
            first_card_details.class = $(this).attr('class');
            first_card_details.imgsource = $(".front img", this).attr('src');
            disable_click(first_card_clicked); //###remove click event from click

            console.log(first_card_details);
            console.log(first_card_clicked);
        } else {
            second_card_clicked = $(this); //false: assign second_card_clicked = html DOM Element that was clicked
            second_card_details.class = $(this).attr('class');
            second_card_details.imgsource = $(".front img", this).attr('src');
            disable_click('.card');
            wait_timeout = true;
            console.log(second_card_details);
            console.log(wait_timeout);
            if (first_card_details.class !== second_card_details.class && first_card_details.imgsource === second_card_details.imgsource) { //check if first_card_clicked === second_card_clicked
                console.log('correct match');
                match_counter++; //true: increment match_counter by 1
                first_card_clicked.addClass('matched');
                second_card_clicked.addClass('matched');
                reactivate_click('.card');
                first_card_clicked = null; //reset both variables back to null
                second_card_clicked = null;
                first_card_details = {};
                second_card_details = {};
                wait_timeout = false;
                if (match_counter === total_possible_matches) { //check if match_counter === total_possible_matches
                    alert('You have won!')// true: Display a message to user they have won
                }
                return; //false: click handler function is complete, return
            } else {
                console.log('not matched');
                setTimeout(reset_incorrect_match, 1500); //false: wait 2s, then perform a function
            }
        }
    }
}
//v put the check class and imgsource in an object
//v double-clicking first card will unflip the card - think of how to inactivate the first card until second card is clicked
//v add a global flag (check_card_flipped = true)
//v pointer-event: none to avoid card flipping during reset delay doesn't work

//v DOM creation - create cards
//v shuffle cards - randomize  array

//add css to alert dialog
//.slideDown() jQuery for completion message
//remove all console.log() after checks


//trace the shuffle cards loop
//may not need cards with numbered class name, trace the dom creation loop

function reset_incorrect_match(){
    console.log('reset cards');
    $(".back", first_card_clicked).show();
    $(".back", second_card_clicked).show(); //show card back on both elements that are flipped over
    reactivate_click('.card');
    first_card_clicked = null; //reset both card_clicked variables back to null
    second_card_clicked = null;
    first_card_details = {};
    second_card_details = {};
    wait_timeout = false;
}

function disable_click(card){
    $(card).off('click');
}

function reactivate_click(card){
    $(card).not('.matched').on('click', card_clicked);
}