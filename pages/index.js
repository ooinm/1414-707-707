import Head from 'next/head';
import { useState,useEffect, useRef,useCallback} from 'react';
import Image from 'next/image';
import {correctLabels} from '../correctLabels.js';
import styles from '../styles/Home.module.css';
import Logo from './logo.js';


export default function labelMachine({size=150}) {

  const [index, setIndex] = useState(1);
  const [speed, setSpeed] = useState(1200);
  const [stop, setStop] = useState(0);
  const [centerColor, setCenterColor] = useState(styles.centerImageBlack)
  const [input,setInput] = useState("");
  const [allLabels, setAllLabels] = useState([]);
  const [counter, setCounter] = useState(0);
  const [score,setScore] = useState(1)
  const [ID,setID] = useState("")
  const [countDown, setCountDown] = useState(3);


  const correctLabel = correctLabels[index]

  const keyPress = useCallback((e) => {
    let k=e.key
    if (k=='0'||k=='1'||k=='2'||k=='3'||k=='4'||k=='5'||k=='6'
      ||k=='7'||k=='8'||k=='9'||k=='s'||k=='p'||k=='u'||k=='d'){
      setInput(k);}
    else if (k == 'f'){
            setInput('5');}
    else if (k == 'h'){
            setInput('6');}
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
      setCountDown((cD)=> cD-1);
      if (countDown==0){
        console.timeEnd("plaatje tijd");
        // selectRandomImage();
        randWithoutDouble();
        console.time("plaatje tijd");
        console.log(score)
        setCountDown(0);
        setCounter((c)=> c+1);
        setCenterColor(styles.centerImageBlack)

        if (speed>1000){
          setSpeed(speed - 5)
        }

        if (score>1){
          setSpeed(speed + 50)
          setScore(1)
        }


      }

     }
     else {
      setCountDown(3)
     }
    }, speed);
    return () => clearInterval(interval);
  }, [stop,speed,counter,countDown]);

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

  function StartStopMenu(){
    if (countDown==0){
        return (
            <ul>
           <li>{ID}, you already labelled {counter} images today!</li>
          <li>p - pause</li>
          <li>u - speed +</li>
          <li>d - speed -</li>
            </ul>);
    }
    return (
        <ul>
        <li>s - start in {countDown}</li>
        <li>u - speed +</li>
        <li>d - speed -</li>
        </ul>);
  }


function selectRandomImage(){
  let rand = Math.floor(Math.random() * 60000);
  setIndex(rand)
}
const randWithoutDouble = async () => {
  const response = await fetch('/api/labels')
  const data = await response.json();
  let indexSet = new Set();
  for (let i = 0; i < data.length; i++)
  {
    indexSet.add(data[i]['index']);
  }
  let rand = 0;
  do
  {
    rand = Math.floor(Math.random() * 7000);
  } while (indexSet.has(rand));
  setIndex(rand);
}

  function placeCursor(){
    const input = document.querySelector("input");
    input.focus();
    input.select();
  }

function checkSpeed(){
if(input == 's'){
  setID(window.prompt("What is your name?"))
  placeCursor()
  setInput('')
  setStop(1)
  }
else if(input == 'p'){
    setStop(0)
  }
else if(input == 'u'){
  if (speed > 100){
    setSpeed(speed-100)
  }
}
else if(input== 'd'){
    setSpeed(speed+100);
    }
else if(input!=correctLabel){

  setScore(score+1)

  //setCenterColor(styles.centerImageRed)
}
else if (input==correctLabel){
  setScore(score-1)
  if (score < 0)
  {
    setScore(0)
  }
  //setCenterColor(styles.centerImageBlue)
}





}

function collectLabels(){
  setAllLabels([allLabels,input]);
  saveData()
}


  return (
<div className={styles.container}>
    <Head>
      <title>1414=707+707</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Logo/>
  <center>
    <div className={centerColor}>
      <Image src={`/big_images_7000_subset/${index}.png`} width={size} height={size} alt="nowNumber"  />
    </div>
 </center>

  <hr />

    <label>
        <input value={input}
        onInput={checkSpeed}
        onChange={collectLabels}
        />
    </label>

<StartStopMenu />
       <p>f=5, h=6</p>
      <p>Velocity: {speed} ms</p>


     </div>
  );
}
