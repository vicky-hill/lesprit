'use client'

import Image from 'next/image'
import Slide from '../elements/Slide'
import Form from '@/components/elements/Form'
import { Input, SubmitButton, Heading } from '@/components/elements/Form';
import { useState, createRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { createWord, updateWord } from '@/store/slices/word.slice'
import { Word } from '@/types/word.types'
import { List } from '@/types/list.types'

interface WordsForm {
    slide: boolean
    editWord?: Word | null
    onClose: () => any
    list?: List
}

export default function WordsForm({ slide, onClose, list, editWord }: WordsForm) {
    const [values, setValues] = useState({
        foreign: '',
        native: ''
    })

    useEffect(() => {
        editWord ? setValues({
            native: editWord.native,
            foreign: editWord.foreign
        }) : setValues({
            native: '',
            foreign: ''
        })
    }, [editWord]);

    const dispatch = useDispatch<AppDispatch>();

    const { foreign, native } = values;

    const refInput: any = createRef();

    const onChange = (e: any) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!foreign || !native) return;

        if (!editWord && list) {
            dispatch(createWord({
                foreign,
                native,
                list: list._id
            }))

            refInput.current.focus();


        } else if (editWord) {
            dispatch(updateWord({
                wordId: editWord._id,
                payload: { foreign, native }
            }))

            onClose();
        }

        setValues({ foreign: '', native: '' })
    }


    return (
        <Slide open={slide} onClose={onClose}>
            <div className='flex flex-col items-center mt-2'>
                {
                    !editWord && list ? (
                        <>
                            <Image
                                alt='List image'
                                src={list.image}
                                height={150}
                                width={150}
                            />
                            <p className='font-800 text-2xl mt-7 mb-10'>{list.title}</p>
                        </>
                    ) : (
                        <Heading>Update Word</Heading>
                    )
                }


                <div className="w-1/5">
                    <Form onSubmit={onSubmit}>
                        <Input placeholder="French" name="foreign" id="foreign" value={foreign} onChange={onChange} type="text" ref={refInput} />
                        <Input placeholder="English" name="native" id="native" value={native} onChange={onChange} type="text" />
                        <SubmitButton title={editWord ? 'Save Word' : 'Add Word'} />
                    </Form>
                </div>

            </div>
        </Slide>
    )
}