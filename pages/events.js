import { useState,useEffect, useRef,useCallback} from 'react';

export default function events() {


      
const [input,setInput] = useState("");
const [countDown, setCountDown] = useState(3);



    
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
     
        setCountDown((cD)=> cD-1);
     
     }
    , 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <label>
    <input id="userInput" 
     value={input} />
{countDown}
</label>

  )
}