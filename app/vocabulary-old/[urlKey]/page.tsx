'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Page from '@/components/layout/Page'
import Hide from '@/components/elements/Hide'

import Spinner from '@/components/elements/Spinner'
import Slide from '@/components/elements/Slide'
import { useLists, useWords } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteWord as deleteWordAction } from '@/store/slices/word.slice'
import { List } from '@/types/list.types'
import { Word } from '@/types/word.types'
import WordForm from '@/components/words/WordForm'
import WordItem from '@/components/words/WordItem'
import WordsPanel from '@/components/words/WordsPanel'

const list = ({ }) => {
    const [list, setList] = useState<List | null>(null);
    const [listWords, setListWords] = useState<Word[] | null>(null);
    const [wordForm, setWordForm] = useState<boolean>(false);
    const [slideForm, setSlideForm] = useState<boolean>(false);
    const [editWord, setEditWord] = useState<Word | null>(null);

    const { urlKey } = useParams<{ urlKey: string }>()

    const dispatch = useDispatch<AppDispatch>()
    const deleteWord = (wordId: string) => dispatch(deleteWordAction(wordId));
    

    // const {  deleteWord } = useContext(WordContext);
    const { words } = useWords();
    const { lists } = useLists();

    useEffect(() => {
        if (lists) {
            const currentList = lists.find((list: List) => list.urlKey === urlKey);
            currentList && setList(currentList);
        }
    }, [urlKey, lists]);

    useEffect(() => {
        if (list && words) {
            const currentWords = words.filter(word => word.list._id.toString() === list._id.toString());
            currentWords && setListWords(currentWords);
        }
       
    }, [list, words]);

    const closeWordForm = () => {
        setWordForm(false);
        setSlideForm(false);
        setEditWord(null);
    }

    return (
        <Page title={list?.title}>
            <div className='container'>
                <div className="scroll-container">
                    <div className="main-container">
                        {
                            !list || !listWords ? <Spinner /> : (
                                <>
                                    {/* Hidden form */}
                                    <Hide open={wordForm}>
                                        <WordForm
                                            format="half"
                                            onClose={closeWordForm}
                                            list={list._id}
                                            editWord={editWord}
                                        />
                                    </Hide>

                                    {/* Header and word panel */}
                                    <WordsPanel
                                        openForm={() => setWordForm(true)}
                                        title={list.title}
                                        listId={list._id}
                                    />

                                    {/* Word list */}
                                    <div className="list-container flex">
                                        {
                                            listWords.map(word => (
                                                <WordItem
                                                    openForm={() => setSlideForm(true)}
                                                    key={word._id}
                                                    word={word}
                                                    setEditWord={setEditWord}
                                                    deleteWord={() => deleteWord(word._id)}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                {/* Slide Form */}
                <Slide open={slideForm}>
                    <WordForm
                        onClose={closeWordForm}
                        format="full"
                        editWord={editWord}
                    />
                </Slide>
            </div>
        </Page>
    )
}

export default list;
