'use client'

import Image from 'next/image'
import Button from '../elements/Button'
import { FiPlus } from 'react-icons/fi'

interface WordsHeader {
    title: string
    image: string
    count: number
}

export default function WordsHeader({ title, image, count }: WordsHeader) {

    return (
        <div className='flex justify-between items-start'>
            <div className='flex gap-10 items-start'>
                <Image className='relative bottom-10' width={200} height={200} alt='List image' src={image} />
                <div>
                    <p className='text-2xl font-800'>{title}</p>
                    <p className='mt-2 font-semibold text-zinc-500'>{count} Words</p>
                </div>
            </div>
            <div className='flex gap-2'>
                <Button>Memorize</Button>
                <Button icon={<FiPlus/>}>Add Words</Button>
            </div>
        </div>
    )
}