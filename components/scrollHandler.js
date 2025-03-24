"use client"
import { useEffect } from "react";

const ScrollHandler = (props) => {

    const handleScroll = (e) => {
        const currentSection = props.items.find((item) => {
            const element = document.getElementById(item.slug);
            return element && element.offsetLeft <= window.scrollX + window.innerWidth / 2;
        })

        if (e.deltaY > 0) {
            // scroll down
            const nextSectionIndex = props.items.indexOf(currentSection) + 1;
            if (nextSectionIndex < props.items.length) {
                scrollTo({
                    top: document.getElementById(props.items[nextSectionIndex].slug).offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }


    useEffect(() => {
        /* const handleScroll = (e) => {
            if (e.deltaY > 0) window.scrollBy({ left: 200, behavior: 'smooth' });
            else window.scrollBy({ left: -200, behavior: 'smooth' });
        } */

        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    return null;
}

export default ScrollHandler