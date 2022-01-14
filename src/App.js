import './App.css';
import React, {useState, useEffect, useRef} from 'react'
import ChessBoard from 'chessboardjsx';
import Chess from 'chess.js'
function App() {
  const [fen, setFen] = useState("start")
  const [turn, setTurn] = useState("White")
  const [check, setCheck] = useState(false)
  const[ill, setIll] = useState(false)
  const [checkmate, setCheckmate] = useState(false)
  let game = useRef(null)

  const onDrop = ({sourceSquare, targetSquare}) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    })
    console.log(move)
    
    if(move === null){
      setIll(true)
    }
    else{
      setIll(false)
    }
    if(!ill){
      if(turn === "White"){
        setTurn("Black")
      }
      else if(turn === "Black"){
        setTurn("White")
      }
    }
    if(game.current.in_check()){
      setCheck(true)
    }
    else{
      setCheck(false)
    }
    if(game.current.in_checkmate()){
      setCheckmate(true)
    }
    setFen(game.current.fen())
    
    console.log(turn)
    
  }
  useEffect(() =>{
    game.current = new Chess();
  },[])

  const playAgain = () =>{
    game.current.reset()
    setFen("start")
  }

  return (
    <div className="grid grid-cols-3 ">
      <div className="bg-green-400 font-sans mr-12 border mt-12 ml-4 border-yellow-400 border-4 rounded-lg">
        <h1 className="mt-12 ml-2 text-3xl text-bold  text-rose-800 font-nun">Move: {turn}</h1>
        {
          check ? <h1 className="mt-12 ml-2 text-3xl text-bold  text-rose-800 font-nun">Check!!!!</h1> :null
        }
        {
          ill ? <h1 className="mt-12 ml-2 text-3xl text-bold  text-rose-800 font-nun">Illegal Move</h1> : null
        }
        {
          checkmate ? (
            <div>
            <h1>{turn} wins!!</h1>
            <button className="p-4 m-2 ml-12 bg-orange-600 text-bold " onClick={()=>{playAgain()}}>Play again??</button>
            </div>
          ) : null
        }

      </div>
      <div className="mt-12 "><ChessBoard position={fen}  width={600} onDrop={onDrop}/></div>
      <div></div>
      
    </div>
    
  );
}



export default App;
