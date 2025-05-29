"use client";
import Image from "next/image";
import styles from "../app/page.module.css";

import ScrollHandler from "@/components/scrollHandler";
import { Fragment, useEffect, useRef, useState } from "react";


export const Catalog = (props) => {

  // currentItem is a NUMBER!!
  const [currentItem, setCurrentItem] = useState(0);

  const currentElement = useRef(null);

  // set currentElement to first element
  useEffect(() => {
    currentElement.current = document.getElementById(sectionItems[0].slug);
  }, []);

  const sections = [
    {
      title: 'Hero',
      slug: 'hero',
      items: [{ title: 'Hero', type: 'sectionHeader', slug: 'hero' }]
    },
    ...props.items.map(section => {
      return {
        title: section.title,
        slug: section.slug,
        items: [
          { title: section.title, type: 'sectionHeader', slug: section.slug },
          ...section.items
        ]
      }
    })
  ];

  console.log(props.items)



  const sectionItems = sections.reduce((acc, section) => {
    return acc.concat(section.items);
  }, []);

  // Scroll Snapping

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleSnap = () => {
      const snappedElement = getSnappedElement();
      currentElement.current = snappedElement;
      if (snappedElement) {
        const id = snappedElement.id;
        const index = sectionItems.findIndex(item => item.slug === id);
        setCurrentItem(index);
      }
    }

    const scrollContainer = scrollRef.current;

    scrollContainer.addEventListener('scroll', handleSnap);

    return () => {
      scrollContainer.removeEventListener('scroll', handleSnap);
    }
  })

  const getSnappedElement = () => {
    const scrollContainer = scrollRef.current;

    const scrollLeft = scrollContainer.scrollLeft;
    const screenWidth = window.innerWidth;

    const centerScreen = scrollLeft + screenWidth / 2;


    const tableCells = scrollContainer.querySelectorAll('td');

    let closestCell = null;
    let minDistance = Infinity;

    tableCells.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementLeft = rect.left + scrollLeft;
      const distance = Math.abs(elementLeft + rect.width / 2 - centerScreen);
      if (distance < minDistance) {
        minDistance = distance;
        closestCell = element;
      }
    });




    return closestCell;
  }



  // Desktop scrolling



  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      /* setCurrentItem(prevItem => (prevItem + 1) % sectionItems.length); */
      /* scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' }); */
      const nextElement = currentElement.current.nextElementSibling;
      if (nextElement) {
        const scrollContainer = scrollRef.current;
        const containerWidth = scrollContainer.clientWidth;
        const targetOffsetLeft = nextElement.offsetLeft;
        const targetWidth = nextElement.offsetWidth;
        
        const scrollToPosition = targetOffsetLeft - (containerWidth / 2) + (targetWidth / 2);
        
        scrollContainer.scrollTo({
          left: scrollToPosition,
          behavior: 'smooth'
        });
      }


    } else {
      const previousElement = currentElement.current.previousElementSibling;
      if (previousElement) {
        const scrollContainer = scrollRef.current;
        const containerWidth = scrollContainer.clientWidth;
        const targetOffsetLeft = previousElement.offsetLeft;
        const targetWidth = previousElement.offsetWidth;
        
        const scrollToPosition = targetOffsetLeft - (containerWidth / 2) + (targetWidth / 2);
        
        scrollContainer.scrollTo({
          left: scrollToPosition,
          behavior: 'smooth'
        });
      }
    }
  }


  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);


  const scrollToItem = (slug) => {
    const item = document.getElementById(slug);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center', scrollMode: 'x' });
    }
  }



  const prevItemRef = useRef(null);

  useEffect(() => {
    /* if (prevItemRef.current !== currentItem) {
      prevItemRef.current = currentItem;
    }
    scrollToItem(); //This might need to go up
    console.log(currentItem); */
  }, [currentItem]);


  const EmmaEmail = "emma.cote@aauni.edu";

  return (
    <>
      <div className={styles.catalog}>
        <header className={styles.header}>
          <h1>Em's Exhibition</h1>

          <nav className={styles.catalogNav}>
            <i>{sectionItems[currentItem].title}</i>
            <ul>
              {sections.map((section, sectionIndex) => {
                return (
                  <li
                    className={styles.sectionNav}
                    key={sectionIndex}

                  >
                    {!section.items.includes(sectionItems[currentItem]) && (
                      <button
                        className={styles.sectionNavButton}
                        onClick={() => {
                          setCurrentItem(sectionItems.findIndex(item => item.slug === section.items[0].slug))
                          scrollToItem(section.items[0].slug);
                        }
                          
                        }
                      ></button>
                    )}

                    <ul>
                      {
                        sectionItems.map((item, index) => {

                          if (section.items.includes(item)) {
                            return (
                              <li className={styles.itemNav} key={index}>
                                <button
                                  key={index}
                                  onClick={() => {
                                    setCurrentItem(sectionItems.findIndex(sectionItem => sectionItem.slug === item.slug))

                                    scrollToItem(item.slug);
                                  }

                                  }
                                  className={sectionItems[currentItem].slug === item.slug ? styles.navButtonActive : ""}
                                ></button>
                              </li>
                            )
                          }

                        })
                      }
                    </ul>
                  </li>
                )
              })}

            </ul>
          </nav>

          



        </header>

        <div className={styles.sidescroller} ref={scrollRef}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" ><path d="m604.04-180.32-62.65-62.65L734.36-435.7H57.83v-89.26h676.53l-192.97-192.9 62.65-62.41L903.41-480 604.04-180.32Z" /></svg>
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
                      <a
                        href="https://github.com/macglencoe">GitHub</a>
                      <i>Blue Ridge Community & Technical College</i>
                    </div>
                  </footer>
                </td>
                {props.items.map(category => (
                  <Fragment key={category.slug}>
                    <td id={category.slug} className={styles.categoryTitle}>
                      <h1>{category.title}</h1>
                    </td>

                    {category.items.map(item =>
                      <td key={item.href} className={styles.gridCell + " " + (
                        item.details ? styles.twoColumn : ''
                      )}
                        id={item.slug}
                      >
                        <figure>
                          {item.href && <a href={item.href}
                            target="_blank"><img
                            src={item.href}
                            alt={item.slug}
                          /></a>}
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
                        {item.details && <div className={styles.description}>
                          <p>{item.details}</p>
                        </div>}
                      </td>
                    )}
                  </Fragment>
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