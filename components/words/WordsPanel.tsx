'use client'

import { useState } from 'react'
import Button from '@/components/elements/Button'
import Card from '@/components/elements/Card'
import Spinner from '@/components/elements/Spinner'
import { useRouter } from 'next/navigation'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { useWords } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { updateList as updateListAction, deleteList as deleteListAction } from '@/store/slices/list.slice'
import InputText from '../elements/InputText'


interface WordsPanel {
    openForm: () => void
    title: string
    listId: string
}

function WordsPanel({ openForm, title, listId }: WordsPanel) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const { words } = useWords();

    const dispatch = useDispatch<AppDispatch>();
    const deleteList = (listId: string) => dispatch(deleteListAction(listId));
    const updateList = (listId: string, payload: any) => dispatch(updateListAction({ listId, payload }));



    const onSubmit = (title: string) => {
        updateList(listId, { title });
    }

    const onDelete = () => {
        const c = window.confirm("Delete this list?");

        if (c) {
            deleteList(listId);
            router.push('/vocabulary')
        }
    }

    const getWordCount = () => {
        const wordsInList = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    return (
        loading || !words ? <Spinner /> : (
            <Card type="panel" radius="medium" >
                <div className="panel-card_group">
                    <div className="panel-card_group--bundle">
                        <InputText text={title} onSubmit={onSubmit} />
                        <p className="panel-card_group--subtitle">{getWordCount()} Words</p>
                    </div>
                </div>
                <div className="panel-card_group higher">
                    <Button type="outline" onClick={openForm} icon={<FiPlus color="#514F55" size={12} />}>Add Words &nbsp;</Button>
                    <Button type="outline" onClick={onDelete} icon={<FiTrash color="#514F55" size={15} />}>{''}</Button>
                </div>

            </Card >
        )
    )
}

export default WordsPanel;
