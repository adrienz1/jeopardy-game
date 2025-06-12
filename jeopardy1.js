const game = document.getElementById("game");
const score = document.getElementById("score");


let categoriesList = [{

}]
class categories {
    constructor(catName, leftCoord){
        this.catName = catName;
        this.leftCoord = leftCoord;
    }
    questions = [{}];
    get name(){
        return this.catName;
    }
}
var cats = ["Gaming", "News", "Technology", "History", "Geography", "Media"];

const cat1 = new categories(cats[0], 0);
const cat2 = new categories(cats[1], 100);
const cat3 = new categories(cats[2], 200);
const cat4 = new categories(cats[3], 300);
const cat5 = new categories(cats[4], 400);
const cat6 = new categories(cats[5], 500);

// the number of question categories
let catNum = 6;

//the amount of questions per categories
let questions = 5;

let options = 30;
//create the price of each question, in ascending order
let prices = [100];

for(let i = 1; i<5; i++){
    prices[i] = prices[i-1] + 100;      
}
function addCategories(){

}
// checks that the page is fully loaded to set up the screen
document.addEventListener('DOMContentLoaded', function(){
    
    
    /*var docfrag = document.createDocumentFragment();
    var frag = document.createDocumentFragment();
    for(let i = 0; i<6; i++){
        let message = document.createElement('text');
        message.innerHTML=  cats[i];
        message.style.left = "0";
        frag.appendChild(message);
    }
    document.body.appendChild(frag);
    for(let i = 0; i<questions; i++){
            let button = document.createElement('button');
            button.style.left = 0;
            button.innerHTML=  "$" + prices[i];
            docfrag.appendChild(button);
        }
    document.body.appendChild(docfrag);*/
    }
);