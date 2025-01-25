'use client'

import Image from 'next/image'
import Slide from '../elements/Slide'
import Form from '@/components/elements/Form'
import { Input, SubmitButton } from '@/components/elements/Form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { createWord } from '@/store/slices/word.slice'
import { Word } from '@/types/word.types'
import { List } from '@/types/list.types'

interface WordsForm {
    slide: boolean
    editWord?: Word | null
    onClose: () => any
    list: List
}

export default function WordsForm({ slide, onClose, list, editWord }: WordsForm) {
    const [values, setValues] = useState({
        foreign: '',
        native: ''
    })

    const dispatch = useDispatch<AppDispatch>();

    const { foreign, native } = values;

    const onChange = (e: any) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!editWord) {
            dispatch(createWord({
                foreign,
                native,
                list: list._id
            }))
        }

        setValues({ foreign: '', native: ''})
    }


    return (
        <Slide open={slide} onClose={onClose}>
            <div className='flex flex-col items-center mt-2'>
                <Image
                    alt='List image'
                    src={list.image}
                    height={150}
                    width={150}
                />
                <p className='font-800 text-2xl mt-7'>{list.title}</p>
                <p className='mt-2 font-semibold text-zinc-500'>{list.words.length} Words</p>

                <div className="w-1/5 mt-10">
                    <Form onSubmit={onSubmit}>
                        <Input placeholder="French" name="foreign" id="foreign" value={foreign} onChange={onChange} type="text" />
                        <Input placeholder="English" name="native" id="native" value={native} onChange={onChange} type="text" />
                        <SubmitButton title="Add Word" />
                    </Form>
                </div>

            </div>
        </Slide>
    )
}