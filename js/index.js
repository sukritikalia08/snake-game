// kuch constants ko define krege phle jo snake game ko run krne me madadt krege
//as a object define krge n 0 means ki snake abhi  move hi ni kr rha 
//const isley taki inn naam ke variables phir use kr ske

//GAME CONSTANTS AND VARIABLES
let inputDir={x:0, y:0};  
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.wav');
const moveSound=new Audio('move.wav');
const backgroundMusicSound=new Audio('backgroundmusic.wav');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
]
food={x:6, y:7};  //food sirf ek particle hae isley array ni hae ye  


//GAME FUNCTIONS
function main(ctime){   //ctime i scurrent time- jiss time pr run hoga
    window.requestAnimationFrame(main);  //edhr dobara isley likha taki ye call hota rhe ek trh se ye ab hmara gameloop bn chuka hae
//why to use requestAnimationFrame rather than setinterval ?  stackoverflow me hae iska ans

// console.log(ctime);
//bhoot tezi se console me gameloop chlega


//we contrl fps so that we can play the game comfortably
//we will put the condition for that
if((ctime-lastPaintTime)/1000 < 1/speed){    
     return;
} 
lastPaintTime=ctime;

//agr hmara ctime-lastPaintTime chota hae 0.5 se to paint render ni hoga otherwise lastPaintTime ctime ke equal ho jayega
gameEngine(); //gameEngine naam ka method bnayege
}



function isCollide(snake){
    //if  you bump into yourself
    for(let i=1; i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
            return true;
        }
    return false;
}



//gameEngine ko 2 parts me bnayege 
function gameEngine(){
    //Part 1- Updating the snake array(snake ke alg alg locations ke array bnayege) and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundMusicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        backgroundMusicSound.play();
        score=0;


    }   

    //if you have eaten the food, increment the score and reggenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // if(score>hiscoreval){
        //     hiscoreval= score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hiscoreBox.innerHTML= "hiScore: "+ hiscoreval;
        // }
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a= 2;
        let b= 16;
        food ={x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }



    //Moving the snake
    for(let i=snakeArr.length-2;i>=0; i--){
        snakeArr[i+1]= {...snakeArr[i]};

    }

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;




    
    //Part 2- *Render/Display  snake
       board.innerHTML="";
       snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;     //row hmare y hae
        snakeElement.style.gridColumnStart= e.x;   //col hmare x hae
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
       });

        //Part 2- *Render/Display  food
       foodElement= document.createElement('div');
       foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
       foodElement.classList.add('food')
       board.appendChild(foodElement);
}






















// ek main function me hm apne game ki functionalities likhege
//game loop is a main component while making the game 
//it is highly recomended while we are rendering the animation to use window.requestAnimationFrame aur ye apne andr ek method leta hae
//iske phle arument ka naam function hota hae aur uss function ko time stem pass kiya jata hae 

//MAIN LOGIC STARTS HERE
// backgroundMusicSound.play();


// let hiscore = localStorage.getItem("hiscore");
// if(hiscore===null){
//     hiscoreval=0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval)) 
// }
// else{
//     // hiscoreval= JSON.parse(hiscore);
//     hiscoreBox.innerHTML= "hiScore: "+ hiscore;
// }
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
innputDir = {x:0, y:1} //start the game
moveSound.play();
switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x= 0;
        inputDir.y= -1;
        break;

    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x= 0;
        inputDir.y= 1;
        break;


    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x= -1;
        inputDir.y= 0;
         break;
    
    case "ArrowRight":
    console.log("ArrowRight");
    inputDir.x= 1;
    inputDir.y= 0;
    break;
        default:
            break;
}
});