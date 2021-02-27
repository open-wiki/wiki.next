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

export default function MdEditor() {
    const mdEditor = React.useRef(null);
    const [state, setState] = React.useState({
        articleTitle: matter(sampleMD).data.title,
        articleContent: matter(sampleMD).content,
    });

    const saveArticle = () => {
        if (mdEditor.current) {
            // @ts-ignore
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
    // const handleTitleChange = ({html, text}: any) => {
    //     const newTitleValue = text.replace(/\d/g, "");
    //     console.log('1' + newTitleValue);
    //     setTitleValue(newTitleValue);
    // };
    //
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
    const { articleTitle, articleContent } = state
    const TitleInput = () => {
        return(
            <input
                className={styles.titleInput}
                type={"text"}
                name={"articleTitle"}
                placeholder={"Pick a title for your article"}
                onChange={handleChange}
                value={articleTitle}
                key={"articleTitle"}
            />
        );
    }
    return (
        <div className={"MdEditor"}>
            <div>
                <TitleInput />
                <button onClick={saveArticle}>Save</button>
            </div>
            <Editor
                placeholder={"Start typing your article"}
                name={"articleContent"}
                ref={mdEditor}
                value={articleContent}
                onChange={handleEditorChange}
                renderHTML={(text) => mdParser.render(text)}
            />
        </div>
    )
}
