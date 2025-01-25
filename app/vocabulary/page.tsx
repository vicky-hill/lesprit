'use client'

import Page from '@/components/layout/Page'
import { useLists, useWords } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { Word } from '@/types/word.types'
import Container from '@/components/layout/Container'
import Image from 'next/image';
import { List } from '@/types/list.types';
import Link from '@/next/Link'

interface page {

}

export default function page({ }: page) {
    const { words, results, loading: wordsLoading } = useWords();
    const { lists, loading: listsLoading } = useLists();

    const dispatch = useDispatch<AppDispatch>();

    const getWordCount = (listId: string) => {
        const wordsInList: Word[] = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    return (
        <Page protect>
            <Container>
                <div className='grid grid-cols-4'>
                    {
                        lists && lists.map((list: List) => (
                            <Link key={list._id} href={`/vocabulary/${list.urlKey}`}>
                                <div className='group text-center flex flex-col items-center mt-20'>
                                    {list.image && <Image className='group-hover:scale-[1.1] transition-all cursor-pointer mb-3' alt='chapter art' width={150} height={150} src={list.image} />}

                                    <span className='text-lg font-semibold'>{list.title}</span>
                                    {!wordsLoading && (
                                        <span className='mt-2 font-semibold text-sm text-zinc-400'>{`${getWordCount(list._id)} Words`}</span>
                                    )}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </Container>
        </Page>
    )
}