"use client"
import React from 'react'
import Link from "next/link";
const Navigation = () => {
    const highlightSection = (id) => {
        const section = document.querySelector(id);
        if (section) {
            setTimeout(() => {
                section.classList.add("flash-highlight");
                setTimeout(() => {
                    section.classList.remove("flash-highlight");
                }, 1000); // Adjust duration based on the animation length
            }, 300); // Adjust duration based on the animation length
        }
    };
    const handleClickLink = (e) => {
        const hreftext = e.target.getAttribute("href");
        if (hreftext.startsWith("#")) {
            e.preventDefault();
            highlightSection(hreftext);
            document.querySelector(hreftext).scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <nav className='flex gap-3'>
            <Link className="rounded-full bg-white dark:bg-green-900 border border-gray-200 dark:border-green-800 px-4 py-1" href={"#filter"}
                onClick={handleClickLink}
            >
                Filter
            </Link>
            <Link className="rounded-full bg-white dark:bg-green-900 border border-gray-200 dark:border-green-800 px-4 py-1" href={"#properties"}
                onClick={handleClickLink}
            >
                Properties
            </Link>
        </nav>
    )
}

export default Navigation