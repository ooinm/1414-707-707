import Head from 'next/head';
import { useState,useEffect,useCallback} from 'react';
import Image from 'next/image';
import {correctLabels} from '../correctLabels.js';
import styles from '../styles/Home.module.css';

export default function labelMachine({size=150}) {
 
  const [index, setIndex] = useState(1);
  const [speed, setSpeed] = useState(1600);
  const [stop, setStop] = useState(0);
  const [centerColor, setCenterColor] = useState(styles.centerImageRed)
  const [input,setInput] = useState("");
  const [allLabels, setAllLabels] = useState([]);
  const [counter, setCounter] = useState(0);
  const [score,setScore] = useState(0)
  const [ID,setID] = useState("")
  
  const correctLabel = correctLabels[index]
   
  const keyPress = useCallback((e) => {
let k=e.key
if (k=='0'||k=='1'||k=='2'||k=='3'||k=='4'||k=='5'||k=='6'
  ||k=='7'||k=='8'||k=='9'||k=='s'||k=='p'||k=='u'||k=='d'){
  setInput(k);}
else if (k == 'f'){
        setInput(5);}
else if (k == 'h'){
          setInput(6);}
else {
setInput('-')}       
  }, []);

  useEffect(() => {
    // add and remove event listener
    document.addEventListener('keydown', keyPress);
return () => {
      document.removeEventListener('keydown', keyPress);
    };
  }, [keyPress]);

  useEffect(() => {
    const interval = setInterval(() => {
    if (stop === 1)
    {
      setCounter((counter)=> counter+1);
      
    
      setIndex((index)=>index+1)
    }
      setCenterColor(styles.centerImageBlack)
    
    }, speed);
    return () => clearInterval(interval);
  }, [stop,speed]);
  
  const fetchData = async () => {
    const response = await fetch('/api/labels')
    const data = await response.json();
    console.log("data", data);
  }

  const saveData = async () => {
    const response = await fetch('/api/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID: ID, newLabel: input, index: index })
      });
      const data = await response.json();
      console.log(data);
  }

function selectRandomImage(){
  let rand = Math.floor(Math.random() * 60000);
  setIndex(rand)
}
  
function checkSpeed(){
if(input == 's'){
    setStop(1)
    selectRandomImage(0)
  }
else if(input == 'p'){
    setStop(0)}
else if(input == 'u'){
  setSpeed(speed-100)}
else if(input== 'd'){
    setSpeed(speed+100);}

else if(input!=correctLabel){
  // setSpeed(speed+100)
  setCenterColor(styles.centerImageRed)}
else if (input==correctLabel){
  setSpeed(speed-50)
  setScore(score+1)
  setCenterColor(styles.centerImageBlue)}
}

function stopNow(){
  setStop(0)
}

function collectLabels(){
  setAllLabels([allLabels,input]);
  saveData()
}

function getID(){
  setID(window.prompt("What is your name?"))
}

function start(){
  getID()
  console.log(ID)
  if(ID==''){
    alert("Please provide your name to start, it will be your labeller ID.")
    getID()
  }
  else {
    selectRandomImage()
    setStop(1)
    placeCursor()
  }
 
  } 

  function placeCursor(){
    const input = document.querySelector("input")
    input.focus()}

  return (
<div className={styles.container}>
    <Head>
      <title>1414=707+707</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className={styles.title}>
      1414=707+707
    </h1>
  <center>
    <div className={styles.leftImage}>
      <Image src={`/images/${index+1}.png`} width={size} height={size} alt="nextNumber"  />
    </div>
    <div className={centerColor}>
      <Image src={`/images/${index}.png`} width={size} height={size} alt="nowNumber"  />
    </div>
    <div className={styles.rightImage}>
      <Image src={`/images/${index-1}.png`} width={size} height={size} alt="prevNumber"  />
    </div>
  </center>
   

  <hr />
  
    
    <label>
      
        <input value={input}
        onInput={checkSpeed}
        onChange={collectLabels}
        />
    </label>
  
    
    {/* <button onClick={start}>START</button> */}
   
    
    {/* <button onClick={fetchData}> fetchData</button>
    <button onClick={saveData}> saveData</button> */}

    <ul>
  <li>s - start</li>
  <li>p - pause</li>
  <li>u - speed +</li>
  <li>d - speed -</li>
    </ul>
 
{/*    
    <p>newLabels: {allLabels.map(x=>x)}</p> */}
  
      <p>Score: {score} correct labels from {counter} images </p>
      <p>f=5, h=6</p>
      <p>Velocity: {speed} ms</p>
      <p>testWorkflowSucces?</p>
    
     
     </div> 
  );
}
