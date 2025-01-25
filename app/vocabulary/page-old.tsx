'use client'

import Page from '@/components/layout/Page'
import Hide from '@/components/elements/Hide'
import Spinner from '@/components/elements/Spinner'
import { useLists, useWords } from '@/store/hooks'
import VocabularyPanel from '@/components/vocabulary/VocabularyPanel'
import VocabularyForm from '@/components/vocabulary/VocabularyForm'
import { useState } from 'react'
import VocabularyItem from '@/components/vocabulary/VocabularyItem'
import { Word } from '@/types/word.types'
import WordItem from '@/components/words/WordItem'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteWord as deleteWordAction } from '@/store/slices/word.slice'
import Slide from '@/components/elements/Slide'
import WordForm from '@/components/words/WordForm'
import Image from 'next/image'
import { List } from '@/types/list.types'


export default function page({ }) {
    const [listForm, setListForm] = useState<boolean>(false);
    const [wordForm, setWordForm] = useState<boolean>(false);
    const [editWord, setEditWord] = useState<Word | null>(null);

    const { words, results, loading: wordsLoading } = useWords();
    const { lists, loading: listsLoading } = useLists();

    const dispatch = useDispatch<AppDispatch>();
    const deleteWord = (wordId: string) => dispatch(deleteWordAction(wordId));

    const getWordCount = (listId: string) => {
        const wordsInList: Word[] = words.filter(word => (
            word.list._id === listId
        ))

        return wordsInList.length;
    }

    const VocabularyList = (
        <div className='grid grid-cols-3'>
            {/* {
                lists && words && lists.map(list => (
                    <VocabularyItem
                        key={list._id}
                        title={list.title}
                        urlKey={list.urlKey}
                        count={getWordCount(list._id)}
                    />
                ))
            } */}
            {
                lists && words && lists.map((list: List) => (
                    <div className='group text-center w-max' key={list._id}>
                        {list.image && <Image className='group-hover:scale-[1.1] transition-all cursor-pointer mb-3' alt='chapter art' width={200} height={200} src={list.image} />}

                        <span className='text-lg font-semibold'>{list.title}</span>

                    </div>
                ))
            }
        </div>
    )


    const WordList = (
        <div className='list-container flex'>
            {
                results && results.map(word => (
                    <WordItem
                        key={word._id}
                        word={word}
                        openForm={() => setWordForm(true)}
                        setEditWord={setEditWord}
                        deleteWord={() => deleteWord(word._id)}
                    />
                ))
            }
        </div>
    )

    return (
        <Page protect>
            <div className='container'>
                <div className="scroll-container">
                    <div className='px-[5%] text-center'>
                        {VocabularyList}
                        {
                            wordsLoading || listsLoading ? <Spinner /> : (
                                //  Hidden form 
                                <Hide open={listForm}>
                                    <VocabularyForm onClose={() => setListForm(false)} />
                                </Hide>
                            )
                        }
                    </div>
                </div>

                <Slide open={wordForm} >
                    <WordForm
                        format="full"
                        onClose={() => setWordForm(false)}
                        editWord={editWord}
                    />
                </Slide>
            </div>
        </Page>
    )
}