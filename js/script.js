'use strict'
/*
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora 
    di azzurro ed emetto un messaggio in console con il numero della 
    cella cliccata.

--- Bonus ---      
Aggiungere una select accanto al bottone di generazione,
    che fornisca una scelta tra tre diversi livelli di difficoltà:
    - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100,
         divise in 10 caselle per 10 righe;
    - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81,
         divise in 9 caselle per 9 righe;
    - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49,
         divise in 7 caselle per 7 righe;
*/

const playingField = document.querySelector('main');
const playBtn = document.getElementById('play');
const difficulty = document.getElementById('difficulty');



function play(){
    const playingSquare = document.createElement('div');
    playingSquare.setAttribute('id', 'big-square');
    playingSquare.className = `m-auto d-flex flex-wrap`;
    playingField.appendChild(playingSquare);
    playingSquare.innerHTML = '';
    let numCells;

    if (difficulty.value == '3'){
        numCells = 49;
    } else if (difficulty.value == '2'){
        numCells = 81;
    } else {
        numCells = 100;
    }
    const bombsPos = [];
    const numBombs = 16;
    while (bombsPos.length<= numBombs){
        let pos = randomNumber(1,numCells);
        if (!bombsPos.includes(pos)){
            bombsPos.push(pos);
        }
    }
    console.log(bombsPos);

    
    const clicks = [];
    function drawingCells(){
        
        let attempts = document.createElement('div');

        
        
        
        function cellColor (){
            
            // if the array of random position of bombs includes the number inside the clicked cell
            const cell = document.querySelectorAll('.cell');
            
            clicks.push('oneClick')
            
            if (bombsPos.includes(parseInt(this.innerText))){
                const bombsClassArray = [];
                // for every cell which has the class number in the array of positions of bombs add the class 'bomb'
                for (let i = 0; i < bombsPos.length; i++){
                    bombsClassArray.push(`cell-${bombsPos[i]}`)                       
                }
                console.log(bombsClassArray)
                for (let i = 0; i < bombsClassArray.length; i++){
                    let bomb = document.getElementsByClassName(`${bombsClassArray[i]}`);
                    bomb[0].classList.add('bomb');
                }
                console.log(bombsClassArray)
                // cannot continue if press a bomb
                for (let i = 1; i < numCells; i++){
                    cell[i].removeEventListener('click', cellColor );
                    
                }
            } else{
                this.classList.add('fine');
                //cannot press the same cell
                this.removeEventListener('click', cellColor );
            }
            
            attempts.classList.add('align-self-end','attempt','my-3','p-3', 'rounded-2')
            attempts.innerHTML = `Hai totalizzato ${clicks.length} tentativi` ;
            playingField.appendChild(attempts);
            console.log(clicks)
        }




        for (let i = 0; i<numCells; i++){
            // creation of cells with class="cell-number" to identify them
            const cell = document.createElement('div')
            cell.className = `cell-${i + 1} cell w-${Math.sqrt(numCells)} d-flex fw-bold justify-content-center align-items-center`;
            const subCell = document.createElement('span');
            subCell.innerText = `${i + 1}`;
            cell.append(subCell);
            playingSquare.appendChild(cell);

            cell.addEventListener('click', cellColor );
        }
    }

    drawingCells();
    
        

        
        
        
}




playBtn.addEventListener('click', play );