'use client'

import { Word } from '@/types/word.types'
import { LiaTimesSolid } from 'react-icons/lia'
import { CiEdit } from "react-icons/ci"
import { Popconfirm } from 'antd'

interface WordsList {
    words: Word[]
}

export default function WordsList({ words }: WordsList) {
    const confirm = (wordId: string) => {
        console.log('delete', wordId);
    }

    return (
        <div className='grid grid-cols-2 gap-x-7 gap-y-3'>
            {words.map(word => (
                <div key={word._id} className='flex items-center justify-between border border-neutral-200 rounded-lg px-3.5 py-3'>
                    <div>
                        <p className='font-800 leading-snug'>{word.foreign}</p>
                        <p className='font-500 font-sm text-zinc-500 leading-snug'>{word.native}</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Popconfirm
                            title="Delete Word"
                            description="Are you sure to delete this word?"
                            onConfirm={() => confirm(word._id)}
                            onCancel={() => console.log('cancel')}
                            okText="Yes"
                            cancelText="No"
                            icon={null}
                        >
                            <div className='text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 cursor-pointer p-1 rounded transition-all'>
                                <LiaTimesSolid size={17} />
                            </div>
                        </Popconfirm>
                        <div className='text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 cursor-pointer p-1 rounded transition-all'>
                            <CiEdit size={18} />
                        </div>

                        <div className='bg-[#FFFBF2] text-[#FFBC00] font-800 text-sm px-2 py-0.5 ml-1 rounded-md'>
                            {word.rating}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}