'use client'

import { useState, useEffect, createRef, useContext } from 'react'

import Form from '@/components/elements/Form'
import Card from '@/components/elements/Card'
import { FormContainer, Heading, Input, SubmitButton } from '@/components/elements/Form'
import { CreateWord, Word } from '@/types/word.types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { createWord as createWordAction, updateWord as updateWordAction } from '@/store/slices/word.slice'
import { FaTimes } from 'react-icons/fa'


interface WordForm {
    format: 'half' | 'full'
    onClose: () => void
    list?: string
    editWord: Word | null
}

const WordForm = ({ format, onClose, list, editWord }: WordForm) => {
    const [values, setValues] = useState({
        native: '',
        foreign: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    const createWord = (word: CreateWord) => dispatch(createWordAction(word));
    const updateWord = (wordId: string, payload: any) => dispatch(updateWordAction({ wordId, payload }));


    useEffect(() => {
        editWord ? setValues({
            native: editWord.native,
            foreign: editWord.foreign
        }) : setValues({
            native: '',
            foreign: ''
        })
    }, [editWord]);

    const { native, foreign } = values;

    const refInput: any = createRef();

    useEffect(() => {
        return () => {
            closeWordForm();
        }
    }, []) // eslint-disable-line

    const onChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!native || !foreign) return;

        if (editWord) {
            updateWord(editWord._id, { native, foreign });
            closeWordForm();
            return;

        } else if (list) {
            createWord({ native, foreign, list });
        }
        
        refInput.current.focus();
        setValues({ native: '', foreign: '' })
    }

    const closeWordForm = () => {
        onClose();
        setValues({
            native: '',
            foreign: ''
        });
    }

    const formComponent = (
        <>
            <FormContainer format="half">
                <Form onSubmit={onSubmit} id={'new-word-form'} >
                    <Heading>Add new word:</Heading>

                    {/* Foreign input */}
                    <Input
                        placeholder="Foreign"
                        name="foreign"
                        id="foreign"
                        value={foreign}
                        onChange={onChange}
                        ref={refInput}
                    />

                    {/* Native input */}
                    <Input
                        placeholder="Native"
                        name="native"
                        id="native"
                        value={native}
                        onChange={onChange}
                    />

                    <SubmitButton title="Save word" />
                </Form>
            </FormContainer>

            <FaTimes className="fas fa-times closing-x" id="closing-x" onClick={closeWordForm} />
        </>
    )

    const halfScreenForm = (
        <Card type="stitched">
            {formComponent}
        </Card>
    )

    const fullScreenForm = (
        <div className='main-container'>
            <Card type="stitched">
                {formComponent}
            </Card>
        </div>
    )

    return (
        format === 'half' ? halfScreenForm : fullScreenForm
    )
}

export default WordForm;

