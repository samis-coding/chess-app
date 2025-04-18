import React, { useRef } from "react";

import './chessboard.css';
import Tile from "../Tile/Tile";


const verticalAxis = ["1","2","3","4","5","6","7","8"]
const horizontalAxis = ["a","b","c","d","e","f","g","h"]


interface Piece{
    image: string
    x: number
    y: number
}

const  pieces: Piece[] = []

for(let p = 0; p<2; p++){
    
    const type = p===0 ? "b" : "w";
    const y= p===0 ? 7:0;

    pieces.push({image:`assets/images/rook_${type}.png`,x:0,y})
    pieces.push({image:`assets/images/rook_${type}.png`,x:7,y})
    pieces.push({image:`assets/images/knight_${type}.png`,x:1,y})
    pieces.push({image:`assets/images/knight_${type}.png`,x:6,y})
    pieces.push({image:`assets/images/bishop_${type}.png`,x:2,y})
    pieces.push({image:`assets/images/bishop_${type}.png`,x:5,y})
    pieces.push({image:`assets/images/king_${type}.png`,x:4,y})
    pieces.push({image:`assets/images/queen_${type}.png`,x:3,y})
}

for(let i = 0;i<8;i++){
    pieces.push({image:"assets/images/pawn_b.png",x:i,y:6})
}


for(let i = 0;i<8;i++){
    pieces.push({image:"assets/images/pawn_w.png",x:i,y:1})
}





export default function Chessboard(){
    
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activepiece:HTMLElement | null = null;


function grabPiece(e: React.MouseEvent<HTMLDivElement,MouseEvent>){
    const element = e.target as HTMLElement;
    if(element.classList.contains("chess-piece")){
        console.log(e);

        const x = e.clientX - 60;
        const y = e.clientY - 60;

        element.style.position = "absolute";

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activepiece = element;

    }

}

function movepiece(e: React.MouseEvent){
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;

    if(activepiece && chessboard){
        
        const minX= chessboard.style.left;
        const minY= chessboard.style.top;
        const x = e.clientX - 60;
        const y = e.clientY - 60;

        activepiece.style.position = "absolute";

        activepiece.style.left = `${x}px`;
        activepiece.style.top = `${y}px`;
    }

}

function dropPiece(e: React.MouseEvent){
    if(activepiece){
        activepiece = null;

    }
}


    let board = [];
    for(let j=verticalAxis.length-1;j>=0;j--){
        for(let i = 0;i<horizontalAxis.length;i++)
        {   
            const number = j+i+2;
            let image=undefined;

            pieces.forEach(p =>{
                if(p.x === i && p.y === j){
                    image = p.image;
                }

            })

            board.push(<Tile key={`${j},${i}`} image={image} number={number}/>)


          
            
        }
    }
    return (
        <div 
            onMouseMove={(e) => movepiece(e)} 
            onMouseDown={(e)=> grabPiece(e)}
            onMouseUp={(e)=> dropPiece(e)}

            id="chessboard"
            ref={chessboardRef}
        >
            {board}
        </div>
        )
}