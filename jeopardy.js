const game = document.getElementById("game");
const inquiry = document.getElementById("inquiry");
const answer = document.getElementById("answer");
const home = document.getElementById("home");

game.style.visibility = "hidden";
inquiry.style.visibility = "hidden";
answer.style.visibility = "hidden";

let categories;
let playerNum;
let card;

let playingSound = false;


function goHome(){
    home.style.visibility = "visible";
    inquiry.style.visibility = "hidden";
    answer.style.visibility = "hidden";
    game.style.visibility = "hidden"
}

function goGame(){
    game.style.visibility = "visible";
    inquiry.style.visibility = "hidden";
    answer.style.visibility = "hidden";
    home.style.visibility = "hidden";
    readQuestions("/questions.txt");
}


function setHome(){
    const input = document.createElement("input");
    const inputBtn = document.createElement("button");
    const playerPart = document.createElement("div");
    const msg = document.createElement("p");
    msg.innerHTML = "please enter a number of players";
    inputBtn.innerHTML = "Start";
    msg.id = "msg";
    input.id = "input-el";
    inputBtn.id = "input-btn";
    playerPart.id = "player-part";

    home.innerHTML = "Welcome to Zingou's Jeopardy!!";
    input.setAttribute("type", "text");
    playerPart.appendChild(msg);
    playerPart.append(input, inputBtn);
    //playerPart.appendChild(inputBtn)
    home.appendChild(playerPart)
    // add a click function to the save input button
    inputBtn.addEventListener("click", function(){ 
        if(!isNaN(input.value)){
            if(input.value > 4 || input.value == 0){
                msg.innerHTML = "Please enter a number between 1 and 4";
            }else{
                playSound("homeSound")
                playerNum = input.value;
                goGame();
            }
        }else if(isNaN(input.value)){
            msg.innerHTML = "please enter an integer";
        }
    })
    
}


function cardClicked(){
    playSound("thinking")
    stopSound("homeSound")
    card = this;
    card.innerHTML = "";
    game.style.visibility = "hidden";
    inquiry.style.visibility = "visible";
    inquiry.innerHTML = this.getAttribute('question');
    this.removeEventListener('click', cardClicked);
    //what happens when the question is clicked 
    inquiry.addEventListener('click', function reveal(){
            stopSound("thinking")
            playSound("timeup")
            this.style.visibility = 'hidden';
            answer.innerHTML = card.getAttribute('answer');
            answer.style.visibility = 'visible';
            answer.addEventListener('click', function(){      
                playSound("homeSound")      
                game.style.visibility = "visible";
                inquiry.style.visibility = "hidden";
                answer.style.visibility = "hidden";
                home.style.visibility = "hidden";
            })
        })
        
}

function readQuestions(file){
    fetch(file)
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
        //read the text file and store it as a list of objects
        const validJSONString = JSON.parse(data);
        categories =  validJSONString;

        // add each category to the game
        categories.forEach(category => addCategories(category));
    
    });
}

function addCategories(category){
    const col = document.createElement("div");

    const title = document.createElement("p");
    title.innerHTML = category.name;

    // adding the name of each category
    col.appendChild(title);

    // adding the price for each questions
    category.questions.forEach( q => {
        const card = document.createElement("div");
        card.classList.add("card")
        card.innerHTML = "$" + q.price;
        col.appendChild(card);
        card.setAttribute('question', q.question);
        card.setAttribute('answer', q.answer);
        card.setAttribute('price', q.price);
        card.addEventListener('click', cardClicked);
    });

    game.append(col);
    
}

function playSound(soundId) {
    const audio = document.getElementById(soundId);
    audio.currentTime = 0; // rewind to start
    audio.play();
}

function stopSound(soundId) {
    const audio = document.getElementById(soundId);
    audio.pause();        // Pauses the audio
    audio.currentTime = 0; // Resets to the beginning
}

// checks that the page is fully loaded to set up the screen
document.addEventListener('DOMContentLoaded', function(){
    setHome();
});



