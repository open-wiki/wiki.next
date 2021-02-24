import * as React from "react";
import "react-dom";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const gfm = require('remark-gfm')

export default function MdEditor() {
    const mdEditor = React.useRef(null);
    const [value, setValue] = React.useState("xxx");

    const saveArticle = () => {
        if (mdEditor.current) {
            // @ts-ignore
            alert(mdEditor.current.getMdValue());
            // fetch('http://localhost:3000/wiki-bot/test')
            //     .then(response => response.json())
            //     .then(data => console.log(data))

        }
    };

    const handleEditorChange = ({html, text}: any) => {
        const newValue = text.replace(/\d/g, "");
        console.log(newValue);
        setValue(newValue);
    };
    return (
        <div className="MdEditor">
            <button onClick={saveArticle}>Save</button>
                <Editor
                ref={mdEditor}
                value={value}
                onChange={handleEditorChange}
                renderHTML={text => <ReactMarkdown plugins={[gfm]} source={text}/>}
                />
        </div>
    )
}
