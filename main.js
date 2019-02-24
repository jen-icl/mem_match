$(document).ready(initializeApp);

function initializeApp(){
    $(".alert").addClass('display-none');
    create_card();
    $(".card").on('click', card_clicked);
    display_stats();
    $(".reset").on('click', reset_button);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


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
];

function random_array(array){
    for(var index = 0; index < array.length; index++) {
        var random_index = Math.floor(Math.random() * game_images.length);
        var temp_item = array[index];
        array[index] = array[random_index];
        array[random_index] = temp_item;
    }
    return array;
}

function create_card(){
    var game_area = $("#game-area");
    for(var card_pair = 0; card_pair < 2; card_pair++) {
        random_array(game_images);
        for (var index = 0; index < game_images.length; index++) {
            var create_card_div = $("<div>").addClass('card');
            var create_front_div = $("<div>").addClass('front');
            var create_front_img = $("<img>").attr({
                'src': game_images[index][0],
                'alt': game_images[index][1]
            });
            var create_back_div = $("<div>").addClass('back');
            var create_back_img = $("<img>").attr({
                'src': 'images/silver-back.png',
                'alt': 'card back'
            });
            create_front_div.append(create_front_img);
            create_back_div.append(create_back_img);
            create_card_div.append(create_front_div, create_back_div);
            game_area.append(create_card_div);
        }
    }
}

function card_clicked(){
    $(".back", this).addClass('display-none'); //or $(this).find(".back").hide();
    if (first_card_clicked === null) {
        first_card_clicked = this;
        disable_click(first_card_clicked);
    } else {
        second_card_clicked = this;
        var first_card_image = $(".front img", first_card_clicked).attr('src');
        var second_card_image = $(".front img", second_card_clicked).attr('src');
        disable_click('.card');
        attempts++;
        if (first_card_image === second_card_image) {
            matches++;
            $(first_card_clicked).addClass('matched');
            $(second_card_clicked).addClass('matched');
            reactivate_click('.card');
            first_card_clicked = null;
            second_card_clicked = null;
            if (matches === total_possible_matches) {
                $(".alert").removeClass('display-none');
            }
        } else {
            setTimeout(reset_incorrect_match, 2000);
        }
    }
    display_stats();
}

//scale cards smaller if wrong guess and proportionally larger if correct

function reset_incorrect_match(){
    $(".back", first_card_clicked).removeClass('display-none');
    $(".back", second_card_clicked).removeClass('display-none');
    reactivate_click('.card');
    first_card_clicked = null;
    second_card_clicked = null;
}

function disable_click(card){
    $(card).off('click');
}

function reactivate_click(card){
    $(card).not('.matched').on('click', card_clicked);
}

function calc_accuracy(){
    accuracy = matches / attempts * 100;
    accuracy = accuracy.toFixed();
    if(isNaN(accuracy)){
        return 0;
    }
    return accuracy;
}

function display_stats(){
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    accuracy = calc_accuracy();
    $(".accuracy .value").text(accuracy + '%');
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function reset_button(){
    games_played++;
    reset_stats();
    display_stats();
    $(".alert").addClass('display-none');
    $("#game-area").empty();
    create_card();
}