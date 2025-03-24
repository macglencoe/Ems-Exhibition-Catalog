"use client";
import Image from "next/image";
import styles from "../app/page.module.css";

import ScrollHandler from "@/components/scrollHandler";
import { useEffect, useRef, useState } from "react";


export const Catalog = (props) => {

  // currentItem is a NUMBER!!
  const [currentItem, setCurrentItem] = useState(0);

  const sections = [{ slug: 'hero', title: 'Hero' }, ...props.items];


  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setCurrentItem(prevItem => (prevItem + 1) % sections.length);
    } else {
      setCurrentItem(prevItem => (prevItem - 1 + sections.length) % sections.length);
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const scrollToItem = () => {
    const item = document.getElementById(sections[currentItem].slug);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

  }

  const prevItemRef = useRef(null);

  useEffect(() => {
    if (prevItemRef.current !== currentItem) {
      prevItemRef.current = currentItem;
    }
    scrollToItem(); //This might need to go up
  }, [currentItem]);


  const EmmaEmail = "emma.cote@aauni.edu";

  return (
    <>
      <div className={styles.catalog}>
        <header className={styles.header}>
          <h1>Em's Exhibition</h1>

          <nav className={styles.catalogNav}>
            <i>{sections[currentItem].title}</i>
            <ul>
              {sections.map((item, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => setCurrentItem(index)}
                      className={currentItem === index ? styles.navButtonActive : ""}
                    ></button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav className={styles.links}>
            <button className={styles.curatorEmail}>
              <a href={"mailto:" + EmmaEmail}>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M174.78-172.78q-41 0-69.5-28.51t-28.5-69.53V-689.5q0-41.02 28.5-69.37t69.5-28.35h610.44q41 0 69.5 28.51t28.5 69.53v418.68q0 41.02-28.5 69.37t-69.5 28.35H174.78ZM480-407.69l-305.22-179v315.91h610.44v-315.91L480-407.69Zm0-102.53 305.22-179H174.78l305.22 179Zm-305.22-76.47v-102.53V-270.78v-315.91Z" /></svg></div>
                {EmmaEmail}
              </a>
            </button>
            <button className={styles.githubLink}><a href="https://github.com/macglencoe/Ems-Exhibition-Catalog">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
              </svg>
            </a></button>
          </nav>



        </header>

        <div className={styles.sidescroller}>
          <table className={styles.sidescrollerTable}>
            <tbody>
              <tr>
                <td id="hero">
                  <div className={styles.hero} >
                    <h1>Some big words</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className={styles.cta}>
                      <button>See the Writing Assignment</button>
                      <button>Another CTA</button>
                    </div>
                  </div>
                  <div className={styles.instruction}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="M481.19-56.42q-127.73 0-215.65-87.23-87.93-87.23-87.93-215.16v-257.47q0-127.36 87.91-214.84 87.91-87.47 215.64-87.47 126.42 0 213.91 87.86 87.48 87.87 87.48 214.45v257.47q0 127.53-87.47 214.96T481.19-56.42Zm39.32-559.86h172.62q0-74.66-47.67-134.8-47.66-60.15-124.95-74.57v209.37Zm-253.64 0h173.47v-209.37q-77.28 14.42-125.38 74.57-48.09 60.14-48.09 134.8Zm213.75 470.6q88.2 0 150.35-62.34 62.16-62.34 62.16-150.79v-177.3H266.87v177.3q0 88.4 62.77 150.77 62.78 62.36 150.98 62.36ZM480-536.11Zm40.51-80.17Zm-80.17 0ZM480-536.11Z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" ><path d="m604.04-180.32-62.65-62.65L734.36-435.7H57.83v-89.26h676.53l-192.97-192.9 62.65-62.41L903.41-480 604.04-180.32Z"/></svg>
                  </div>
                  <footer className={styles.footer}>
                    <div>
                      <b>Emma</b>
                      <p>Art Curator</p>
                      <a href={"mailto:" + EmmaEmail}>{EmmaEmail}</a>
                      <i>Blue Ridge Community & Technical College</i>
                      <i>Anglo-American University</i>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 -8 72 72" id="Layer_1" data-name="Layer 1"><title>handshake</title><path d="M64,12.78v17s-3.63.71-4.38.81-3.08.85-4.78-.78C52.22,27.25,42.93,18,42.93,18a3.54,3.54,0,0,0-4.18-.21c-2.36,1.24-5.87,3.07-7.33,3.78a3.37,3.37,0,0,1-5.06-2.64,3.44,3.44,0,0,1,2.1-3c3.33-2,10.36-6,13.29-7.52,1.78-1,3.06-1,5.51,1C50.27,12,53,14.27,53,14.27a2.75,2.75,0,0,0,2.26.43C58.63,14,64,12.78,64,12.78ZM27,41.5a3,3,0,0,0-3.55-4.09,3.07,3.07,0,0,0-.64-3,3.13,3.13,0,0,0-3-.75,3.07,3.07,0,0,0-.65-3,3.38,3.38,0,0,0-4.72.13c-1.38,1.32-2.27,3.72-1,5.14s2.64.55,3.72.3c-.3,1.07-1.2,2.07-.09,3.47s2.64.55,3.72.3c-.3,1.07-1.16,2.16-.1,3.46s2.84.61,4,.25c-.45,1.15-1.41,2.39-.18,3.79s4.08.75,5.47-.58a3.32,3.32,0,0,0,.3-4.68A3.18,3.18,0,0,0,27,41.5Zm25.35-8.82L41.62,22a3.53,3.53,0,0,0-3.77-.68c-1.5.66-3.43,1.56-4.89,2.24a8.15,8.15,0,0,1-3.29,1.1,5.59,5.59,0,0,1-3-10.34C29,12.73,34.09,10,34.09,10a6.46,6.46,0,0,0-5-2C25.67,8,18.51,12.7,18.51,12.7a5.61,5.61,0,0,1-4.93.13L8,10.89v19.4s1.59.46,3,1a6.33,6.33,0,0,1,1.56-2.47,6.17,6.17,0,0,1,8.48-.06,5.4,5.4,0,0,1,1.34,2.37,5.49,5.49,0,0,1,2.29,1.4A5.4,5.4,0,0,1,26,34.94a5.47,5.47,0,0,1,3.71,4,5.38,5.38,0,0,1,2.39,1.43,5.65,5.65,0,0,1,1.48,4.89,0,0,0,0,1,0,0s.8.9,1.29,1.39a2.46,2.46,0,0,0,3.48-3.48s2,2.48,4.28,1c2-1.4,1.69-3.06.74-4a3.19,3.19,0,0,0,4.77.13,2.45,2.45,0,0,0,.13-3.3s1.33,1.81,4,.12c1.89-1.6,1-3.43,0-4.39Z" /></svg>
                    <div>
                      <b>Liam</b>
                      <p>Web Developer</p>
                      <a href="mailto:mcpaul1694@gmail">mcpaul1694@gmail.com</a>
                      <i>Blue Ridge Community & Technical College</i>
                    </div>
                  </footer>
                </td>
                {props.items.map(item => (
                  <td key={item.slug} className={styles.gridCell + " " + (
                    item.description ? styles.twoColumn : ''
                  )}
                    id={item.slug}
                  >
                    <figure>
                      {item.image && <a href={item.image}><img src={item.image} alt={item.slug} /></a>}
                      {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
                      <figcaption>
                        <h2>{item.creator}</h2>
                        {item.birthDeath && <span>{item.birthDeath}</span>}
                        <span><b>{item.title}</b>{
                          item.circa && <span>, c. {item.circa}</span>
                        }</span>
                        {item.tombstone && <span className={styles.tombstone}>{item.tombstone}</span>}
                      </figcaption>
                    </figure>
                    {item.description && <div className={styles.description}>
                      <p>{item.description}</p>
                    </div>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Catalog;