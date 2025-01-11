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
        <div className='list-container'>
            {
                lists && words && lists.map(list => (
                    <VocabularyItem
                        key={list._id}
                        title={list.title}
                        urlKey={list.urlKey}
                        count={getWordCount(list._id)}
                    />
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
                    <div className="main-container">
                        {
                            wordsLoading || listsLoading ? <Spinner /> : (
                                <>
                                    {/* Hidden form */}
                                    <Hide open={listForm}>
                                        <VocabularyForm onClose={() => setListForm(false)} />
                                    </Hide>


                                    {/* Header and vocabulary panel */}
                                    <VocabularyPanel loading={false} count={words.length} openForm={() => setListForm(true)} />
                                    { results ? WordList : VocabularyList }
                                </>
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