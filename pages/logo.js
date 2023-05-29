import { useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Logo() {


  
  return (

  
    <h1 className={styles.title}>
    
    <Image src='/logo/1.png' width='25' height='25' alt="1" />
    <Image src='/logo/4.png' width='25' height='25' alt="4" />
    <Image src='/logo/1.png' width='25' height='25' alt="1" />
    <Image src='/logo/4.png' width='25' height='25' alt="4" />
    =    
    <Image src='/logo/7.png' width='25' height='25' alt="7" /> 
    <Image src='/logo/0.png' width='25' height='25' alt="0" /> 
    <Image src='/logo/7.png' width='25' height='25' alt="7" /> 
    + 
    <Image src='/logo/7.png' width='25' height='25' alt="7" /> 
    <Image src='/logo/0.png' width='25' height='25' alt="0" /> 
    <Image src='/logo/7.png' width='25' height='25' alt="7" /> 
    </h1>


  )
}