'use client'

import Container from '@/components/layout/Container'
import Page from '@/components/layout/Page'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { List } from '@/types/list.types'
import { useLists, useWords } from '@/store/hooks'
import WordsHeader from '@/components/words/WordsHeader'
import WordsList from '@/components/words/WordsList'
import WordsForm from '@/components/words/WordsForm'
import { Word } from '@/types/word.types'

export default function page({ }) {
    const [list, setList] = useState<List | null>(null);
    const [slide, setSlide] = useState<boolean>(false);
    const [editWord, setEditWord] = useState<Word | null>(null);

    const { urlKey } = useParams<{ urlKey: string }>();

    const { words } = useWords();
    const { lists }: any = useLists();

    useEffect(() => {
        if (lists && words) {
            const currentList = lists.find((list: List) => list.urlKey === urlKey);

            currentList && setList({
                ...currentList,
                words: words.filter(word => (word.list._id === currentList._id))
            });
        }
    }, [urlKey, lists, words]);

    const openWordForm = (word?: Word) => {
        word && setEditWord(word);
        setSlide(true);
    }

    const closeWordForm = () => {
        setEditWord(null);
        setSlide(false);
    }


    return (
        <Page protect>
            <Container narrow>
                {
                    list && (
                        <>
                            <WordsHeader
                                list={list}
                                openWordForm={openWordForm}
                            />

                            <WordsList
                                words={list.words}
                                openWordForm={openWordForm}
                            />

                            <WordsForm
                                list={list}
                                slide={slide}
                                onClose={closeWordForm}
                                editWord={editWord}
                            />
                        </>
                    )
                }
            </Container>
        </Page>
    )
}