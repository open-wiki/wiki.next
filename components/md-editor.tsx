import * as React from "react";
import "react-dom";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkDownIt from 'markdown-it';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import styles from '../styles/mdEditor.module.css'
import sampleMD from '../articles/sample.md'
import matter from 'gray-matter'
import {useState} from "react";

export default function MdEditor() {
    const mdEditor = React.useRef(null);
    const [state, setState] = React.useState({
        articleTitle: matter(sampleMD).data.title,
        articleContent: matter(sampleMD).content,
    });

    const saveArticle = () => {
        if (mdEditor.current) {
            alert(mdEditor.current.getMdValue());
            fetch('/api/createArticle', {
                method: 'POST',
                body: JSON.stringify({
                    title: state.articleTitle,
                    content: state.articleContent
                }),
            })
                .then(response => response.json())
                .then(data => console.log(data))

        }
    };
    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };
    const handleEditorChange = ({html, text}: any) => {
        setState({
            ...state,
            'articleContent': text
        });
    };

    const mdParser = new MarkDownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (__) {}
            }
            return '' // use external default escaping
        },

    });
    return (
        <div className={"MdEditor"}>
            <div>
                <input
                    className={styles.titleInput}
                    type={"text"}
                    name={"articleTitle"}
                    placeholder={"Pick a title for your article"}
                    onChange={handleChange}
                    value={state.articleTitle}
                    key={"articleTitle"}
                />
                <button onClick={saveArticle}>Save</button>
            </div>
            <Editor
                placeholder={"Start typing your article"}
                name={"articleContent"}
                ref={mdEditor}
                value={state.articleContent}
                onChange={handleEditorChange}
                renderHTML={(text) => mdParser.render(text)}
            />
        </div>
    )
}
