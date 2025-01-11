import { useState, useEffect } from 'react'


interface InputText {
    text: string
    onSubmit: (e: any) => void
}

function InputText({ text, onSubmit }: InputText) {

    const [input, setInput] = useState(text);

    function onChange(e: any) {
        setInput(e.target.value)
    }

    function onBlur(e: any) {
        onSubmit(e.target.value);
    }


    useEffect(() => {
        setInput(text)
    }, [text])

    return (
        <input type="text" className="input-text" value={input || "" } onChange={onChange} onBlur={onBlur} />
    )
}

export default InputText;
