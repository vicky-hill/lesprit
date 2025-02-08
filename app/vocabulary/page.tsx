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
import Searchbar from '@/components/elements/Searchbar'
import WordsForm from '@/components/words/WordsForm';
import { useState } from 'react'
import WordsList from '@/components/words/WordsList';

interface page {

}

export default function page({ }: page) {
    const [slide, setSlide] = useState<boolean>(false);
    const [editWord, setEditWord] = useState<Word | null>(null);

    const { words, results, loading: wordsLoading } = useWords();
    const { lists, loading: listsLoading } = useLists();

    const dispatch = useDispatch<AppDispatch>();

    const getWordCount = (listId: string) => {
        const wordsInList: Word[] = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    const openForm = (word: Word) => {
        setSlide(true);
        setEditWord(word);
    }

    const closeForm = () => {
        setSlide(false);
        setEditWord(null);
    }

    return (
        <Page protect>
            <Container>
                <Searchbar />

                {
                    results ? (
                        <div className='mt-10 px-[10%]'>
                            <WordsList
                                words={results}
                                openWordForm={openForm}
                            />
                        </div>

                    ) : (
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
                    )
                }

                <WordsForm
                    slide={slide}
                    onClose={closeForm}
                    editWord={editWord}
                />
            </Container>
        </Page>
    )
}