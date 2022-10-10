import '../styles/globals.css'
import '../styles/normalize.css'
import type { AppProps } from 'next/app'
import {useEffect, useState, createContext} from "react";
import styles from "../styles/Home.module.sass";

import {config, IconDefinition} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Image from "next/image";
import logo from "../public/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faImages, faPen, faNewspaper, faHamburger} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  let [headerExpanded, setHeaderExpanded] = useState(false)

  useEffect(() => {{
    setHeaderExpanded(false)
  }}, [])

  const HeaderEntry = (
      {link, icon, children}:
          {link: string, icon: IconDefinition, children: string}) =>
      <b>
        <FontAwesomeIcon viewBox={"0 0 512 512"} icon={icon}/>
        &nbsp;
        <Link href={link}>
          <a onClick={() => setHeaderExpanded(false)}>
            {children}
          </a>
        </Link>
      </b>

  // @ts-ignore
  // @ts-ignore
  return <div>
    <Head>
      <title>HiveMind Robotics</title>
      <meta name="description" content="HiveMind Robotics" />
      <link rel="icon" href="/logo.png" />
    </Head>
{/*    <div className={styles.mobileHeader}>
      <p>HiveMind Robotics<FontAwesomeIcon icon={faBars}/></p>

    </div>*/}
    {/*@ts-ignore*/}
    <div className={styles.mobileButton}>
      <button className={styles.mobileButtonSpecific} onClick={() => {
        setHeaderExpanded(!headerExpanded)
            //@ts-ignore
      }}><FontAwesomeIcon viewBox={"0 0 512 512"} size={"lg"} icon={faHamburger}/></button>
    </div>
    <div className={styles.container}>
    <div className={styles.home}>
      {/*@ts-ignore*/}
    <div className={`${styles.headerContainer} ${headerExpanded ? "" :  styles.hide}`} style={{"--mobileHeaderHeight": headerExpanded ? "100vh" : "0", "--mobileDisplay" : headerExpanded ? "block" : "none"}}>
      <div className={styles.header}>
        <div style={{"padding": "5px"}}>
          <Link href="/"><a onClick={() => setHeaderExpanded(false)}><Image src={logo} alt="HiveMind Robotics Logo" className={styles.logo} layout={"responsive"}/></a></Link>
        </div>
        <div className={styles.links}>
          <HeaderEntry link={"/notebook"} icon={faPen}>Notebook</HeaderEntry>
          <HeaderEntry link={"/gallery"} icon={faImages}>Gallery</HeaderEntry>
          <HeaderEntry link={"/parents"} icon={faNewspaper}>For Parents</HeaderEntry>
          <HeaderEntry link={"https://instagram.com/ftc_3397"} icon={faInstagram}>Instagram</HeaderEntry>
          <HeaderEntry link={"https://github.com/HiveMindRobotics"} icon={faGithub}>Github</HeaderEntry>
          <HeaderEntry link={"mailto:hivemindrobotics@gmail.com"} icon={faEnvelope}>Contact Us</HeaderEntry>
        </div>
      </div>
    </div>
      {(function () {
        if (!headerExpanded) {
          return <Component {...pageProps} />
        }
      })()}
    </div>
    </div>
    <Background/>
  </div>
}

const Background = () => {
  const [pos, setPos] = useState({x: 0, y: 0});
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPos({x: e.clientX, y: e.clientY});
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  })

  // @ts-ignore
  return <div className={styles.background} style={{"--y": pos.y + "px", "--x": pos.x + "px"}}></div>
}

export default MyApp
