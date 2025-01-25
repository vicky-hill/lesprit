'use client'

import Container from '@/components/layout/Container'
import Page from '@/components/layout/Page'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { List } from '@/types/list.types'
import { useLists, useWords } from '@/store/hooks'
import WordsHeader from '@/components/words/WordsHeader'
import WordsList from '@/components/words/WordsList'

export default function page({ }) {
    const [list, setList] = useState<List | null>(null);

    const { urlKey } = useParams<{ urlKey: string }>();

    const { words } = useWords();
    const { lists } = useLists();

    useEffect(() => {
        if (lists && words) {
            const currentList = lists.find((list: List) => list.urlKey === urlKey);

            currentList && setList({
                ...currentList,
                words: words.filter(word => (word.list._id === currentList._id))
            });
        }
    }, [urlKey, lists, words]);



    return (
        <Page protect>
            <Container narrow>
                {
                    list && (
                        <>
                            <WordsHeader title={list.title} image={list.image} count={list.words.length} />
                            <WordsList words={list.words} />
                        </>
                    )
                }
            </Container>
        </Page>
    )
}