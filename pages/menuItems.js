import { useState} from 'react';

// Old, but maybe still handy
// function counterSpeed(){
//   if (counter==2){
//     setSpeed(speed - 200)
//   }
//   else if (counter>50 && counter<100){
//     setSpeed(900)
//   }
//   else if (counter>150){
//     setSpeed(1000)
//   }

// }
// function getID(){
//   setID(window.prompt("What is your name?"))
// }




// function start(){

//     selectRandomImage()
//     setStop(1)
//     placeCursor()
//   }
 
  
  // function placeCursor(){
  //   const input = document.querySelector("input");
  //   input.focus();
  //   input.select();
  
  // }

  {/*    
    <p>newLabels: {allLabels.map(x=>x)}</p> */}

    {/*     
    <button onClick={start}>START</button> */}
   
    
    {/* <button onClick={fetchData}> fetchData</button>
    <button onClick={saveData}> saveData</button> */}




export default function menuItems(){

    const [game, setGame] = useState(true);
  


    function StartStopMenu(){
        if (game==true){
            return (
                <ul>
              <li>p - pause</li>
              <li>u - speed +</li>
              <li>d - speed -</li>
                </ul>);
        }
        return (
            <ul>
            <li>s - start </li>
            <li>u - speed +</li>
            <li>d - speed -</li>
            </ul>);
      }






return (
    <>
    <StartStopMenu />
  
    <button onClick={()=>setGame(true)}>START</button> 
    <button onClick={()=>setGame(false)}>STOP</button> 
  
    </>
   

    

    
   
    
    
 
    

      );
    }
    