import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
import React from 'react';

const MdEditor = dynamic(() => import("../components/md-editor"), { ssr: false })

export default function Home() {
    const isSSR = typeof window === "undefined"
    return (
        <div className="App">
            <Head>
                <title>Open wiki</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*<div className="Sidebar">*/}
            {/*    <ul>*/}
            {/*        <li>Gilde 1</li>*/}
            {/*        <li>Gilde 2</li>*/}
            {/*        <li>Gilde 3</li>*/}
            {/*        <li>Gilde 4</li>*/}
            {/*        <li>Gilde 5</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <header>
                <h1>Open wiki</h1>
            </header>
            <main className="main">
                <p>articles go here</p>
            </main>
        </div>
    )
}
