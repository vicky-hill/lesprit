'use client'

import { Word } from '@/types/word.types'
import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

interface WordItem {
    word: Word
    openForm: () => void
    setEditWord: (word: Word) => void
    deleteWord: () => void
}


const WordItem = ({ word, openForm, setEditWord, deleteWord }: WordItem) => {

    // Toggle edit icons
    const toggleOptions = (e: any) => {

        let toggleElement;

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            toggleElement = e.target.parentElement.parentElement;
        } else {
            toggleElement = e.target;
        }

        const listItems = document.querySelectorAll('.word-card');

        listItems.forEach(item => {
            if (item.classList.contains('show-edits') && !item.classList.contains(toggleElement.classList[1])) {
                item.classList.remove('show-edits');
            }
        })

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            e.target.parentElement.parentElement.classList.toggle('show-edits');
        } else {
            e.target.classList.toggle('show-edits');
        }
    }

    const onEdit = () => {
        setEditWord(word);
        openForm();
    }

    const onDelete = () => {
        const c = window.confirm("Delete this word?");

        if (c) {
            deleteWord();
        }
    }


    return (
        <div className="word-card" onClick={toggleOptions}>
            <div className="word-card--text">
                <h3>{word.foreign}</h3>
                <p>{word.native}</p>
            </div>
            <div className="word-card--edits">
                <FaEdit onClick={onEdit} />
                <FaTrashAlt onClick={onDelete} />
            </div>
        </div>
    )
}



export default WordItem;
