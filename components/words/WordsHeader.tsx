'use client'

import Image from 'next/image'
import Button from '../elements/Button'
import { FiPlus, FiTrash } from 'react-icons/fi'
import { List } from '@/types/list.types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteList } from '@/store/slices/list.slice'
import { useRouter } from 'next/navigation'

interface WordsHeader {
    list: List
    openWordForm: () => void
}

export default function WordsHeader({ list, openWordForm }: WordsHeader) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();


    const onDelete = () => {
        const c = window.confirm("Delete this list?");

        if (c) {
            dispatch(deleteList(list._id));
            router.push('/vocabulary');
        }
    }

    return (
        <div className='flex justify-between items-start'>
            <div className='flex gap-10 items-start'>
                <Image className='relative bottom-10' width={200} height={200} alt='List image' src={list.image} />
                <div>
                    <p className='text-2xl font-800'>{list.title}</p>
                    <p className='mt-2 font-semibold text-zinc-500'>{list.words.length} Words</p>
                </div>
            </div>
            <div className='flex gap-2'>
                <Button onClick={() => openWordForm()} icon={<FiPlus />}>Add Words</Button>

                <Button onClick={onDelete} icon={<FiTrash />} />
            </div>
        </div>
    )
}