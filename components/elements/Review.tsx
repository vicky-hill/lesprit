'use client'

import { useContext, useEffect, useState, useRef } from 'react'
import ReviewContext from '@/context/ReviewContext'


interface Review {

}

export default function Review({ }: Review) {
    const { currentWord, checkAnswer, answer, show, focused, setFocused, showAnswer, reviewSlide }: any = useContext(ReviewContext);

    const [value, setValue] = useState('');

    const inputRef: any = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            window.addEventListener('keydown', shrinkNative)
        }

        return () => {
            inputRef.current && window.removeEventListener('keydown', shrinkNative);
        };
    }, [inputRef.current, currentWord]);

    useEffect(() => {
        if (!focused && inputRef.current) {
            inputRef.current.blur();
            setValue('');
        }

    }, [focused]);

    useEffect(() => {
        setValue('');
    }, [reviewSlide]);

    useEffect(() => {
        show && setValue(' ' + show + ' ');
    }, [answer])

    const shrinkNative = (e: any) => {
        if (!inputRef.current) return;

        inputRef.current.focus();
        setFocused(true);
    }

    const showAnswerOnEnter = (e: any) => {
        if (!inputRef.current) return;

        if (e.key === 'Enter') {
            inputRef.current.blur();

            if (value === '') {
                showAnswer('show');
            } else {
                showAnswer('incorrect');
            }
        }
    }

    const onChange = (e: any) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
    }


    return (
        <div className='review'>
            <h1 className={`review_title ${focused ? ' review_title--small' : ''}`} >{currentWord?.native || ''}</h1>
            <input
                autoCapitalize="none"
                className={`review-input ${answer === 'correct' ? 'correct' : answer === 'incorrect' ? 'incorrect' : ''}`}
                id="foreign" type="text"
                onKeyDown={showAnswerOnEnter}
                autoComplete="off"
                value={value}
                disabled={answer}
                onChange={onChange}
                ref={inputRef}
                onFocus={shrinkNative}
            />
        </div>
    )
}