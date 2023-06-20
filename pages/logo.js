import { useState} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Logo() {

  return (

    <h1 className={styles.title}>

    <Image src='/images/416.png' width='25' height='25' alt="1" />
    <Image src='/images/275.png' width='25' height='25' alt="4" />
    <Image src='/images/224.png' width='25' height='25' alt="1" />
    <Image src='/images/412.png' width='25' height='25' alt="4" />
    =
    <Image src='/images/168.png' width='25' height='25' alt="7" />
    <Image src='/images/69.png'  width='25' height='25' alt="0" />
    <Image src='/images/446.png' width='25' height='25' alt="7" />
    +
    <Image src='/images/370.png' width='25' height='25' alt="7" />
    <Image src='/images/440.png' width='25' height='25' alt="0" />
    <Image src='/images/340.png' width='25' height='25' alt="7" />
    </h1>

  )
}
