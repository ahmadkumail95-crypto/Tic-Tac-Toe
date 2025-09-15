let boxes = document.querySelectorAll(".box ");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn") ;
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO =false; //player X , player O 
let count = 0;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,8],
    [6,7,8],
];

const resetGame = ()=>{
    //turnO= true;
     count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box) =>box.classList.remove("winner"));
};

boxes.forEach((box) =>{
    box.addEventListener('click', () =>{
        console.log("box was clicked");
        if(box.innerText==="" ){
            // move of x
            box.innerText = "X";
            box.classList.add("x");
            // turnO=false;

        
        //else{
            //player X
           // box.innerText ="X";
           // box.classList.add("o");
           // turnO=true;
        //}
        box.disabled = true;
        count ++;}
        
        let isWinner =checkWinner();
        if(isWinner) return;
        if(count === 9 )//&& !isWinner) 
            {
            gameDraw();
            return;
        }
        //computer move(O)
        computerMove();

    });
});

//Fxn for computer move

const computerMove = () =>{
    let emptyBoxes = [];
    boxes.forEach((box) =>{
        if(box.innerText === ""){
            emptyBoxes.push(box);

        }
    });
    if (emptyBoxes.length >0){
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText ="O";
        randomBox.classList.add("o");
        randomBox.disabled = true ;
        count ++;
        
        let isWinner = checkWinner();
        if (isWinner) return;
        if(count === 9){
            gameDraw();
        }
    }
};


const gameDraw =()=>{
    msg.innerText =`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

 const disableBoxes =() => {
    for (let box of boxes){
        box.disabled =true;
    }
 };

 const enableBoxes =() => {
    for (let box of boxes){
        box.disabled =false;
        box.innerText ="";
    box.classList.remove("x", "o", "winner"); // remove old colors & highlights
    }
 };



const showWinner = (winner) =>{
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=() => {
    for (let pattern of winPatterns){
        let pos1Val = boxes [pattern[0]].innerText;
        let pos2Val =boxes [pattern[1]].innerText;
        let pos3Val = boxes [ pattern[2]].innerText;

        if (pos1Val !="" && pos2Val !="" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val){
                console.log("winner", pos1Val);

                 boxes[pattern[0]].classList.add("winner");
        boxes[pattern[1]].classList.add("winner");
        boxes[pattern[2]].classList.add("winner");
                showWinner(pos1Val);
            }
        }
    }
    return false;
}
newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click", resetGame);
