'use client'

import { createContext, useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import addTime from '@/utils/addTime'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { updateWord as updateWordAction } from '@/store/slices/word.slice'
import { UpdateWord, Word } from '@/types/word.types'
import { useWords } from '@/store/hooks'

const ReviewContext = createContext({});

export const ReviewContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [reviewCount, setReviewCount] = useState<number | null>(null);
    const [wordsToReview, setWordsToReview] = useState<Word[] | null>(null);
    const [reviewSlide, setReviewSlide] = useState<boolean>(false);
    const [levelSlide, setLevelSlide] = useState<boolean>(false);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [answer, setAnswer] = useState<'correct' | 'incorrect' |  'show' |null>(null);
    const [show, setShow] = useState<string | null>(null);
    const [focused, setFocused] = useState<boolean>(false);

    const { words } = useWords();

    const dispatch = useDispatch<AppDispatch>();

    const updateWord = (wordId: string, payload: UpdateWord['payload']) => {
        dispatch(updateWordAction({ wordId, payload }))
    }

    useEffect(() => {
        words.length && !wordsToReview && getReview();
    }, [words]);

    useEffect(() => {
        wordsToReview && getCurrentWord();
    }, [reviewSlide])

    const getReview = async (practiceWords?: Word[]) => {
        const now = DateTime.now().toISODate();

        if (!practiceWords) {
    
            const review: Word[] = words.filter(word => {
                const due = DateTime.fromISO(word.dueDate).toISODate();

                return (due || 0) < now;
            })

            setReviewCount(review.length);
            setWordsToReview(review);
        } else {
            setWordsToReview(practiceWords);
        }
    }

    const getCurrentWord = (skipWord_id = '') => {
        if (!wordsToReview) return;

        const words = wordsToReview.filter(word => word._id !== skipWord_id);

        if (currentWord && !words.length) {
            endReview();
            resetReview();
            setWordsToReview(null);
            return;
        }

        const index = Math.floor(Math.random() * (words.length));
        setCurrentWord(words[index]);
    }

    const correctAnswer = async (currentWord: Word) => {
        const { _id, rating } = currentWord;

        const newDate: string = addTime(currentWord.rating);

        updateWord(_id, {
            rating: rating + 1,
            dueDate: newDate
        })

        setWordsToReview((words => {
            return words && words?.filter(word =>
                word._id.toString() !== _id.toString()
            )
        }))

        resetReview();
        getCurrentWord(currentWord._id);
    }

    const checkAnswer = (typedAnswer: string) => {
        if (!currentWord) return console.warn('No current word found in check answer');
        
        const typed = typedAnswer.replace(/’/g, ' ').replace(/‘/g, ' ').replace(/'/g, ' ');
        const correct = currentWord.foreign.replace(/’/g, ' ').replace(/‘/g, ' ').replace(/'/g, ' ');
 
        if (typed === correct) {
            setAnswer('correct');

            setTimeout(() => {
                correctAnswer(currentWord);
            }, 500);
        }
    }

    const wrongAnswer = (currentWord: Word) => {
        const { _id } = currentWord;

        updateWord(_id, {
            rating: 0
        })

        setWordsToReview(words =>
            words && words.map(word =>
                word._id.toString() !== _id.toString() ? word : { ...word, rating: 0 }
            )
        );

        resetReview();
        getCurrentWord();
    }

    const showAnswer = (status: 'show' | 'incorrect') => {
        if (!currentWord) return console.warn('No current word selected for show answer');

        setAnswer(status);
        setShow(currentWord?.foreign || '');

        setTimeout(() => {
            wrongAnswer(currentWord);
            resetReview();
            getCurrentWord();
            setAnswer(null);
        }, 2000);
    }

    const resetReview = () => {
        setAnswer(null);
        setShow(null);
        setFocused(false);
    }

    const startReview = (words: Word[]) => {
        Array.isArray(words) && getReview(words);
        setReviewSlide(true);
    }

    const endReview = () => {
        setReviewSlide(false);
        setCurrentWord(null);
        resetReview();
        getReview();
        setFocused(false);
    }

    const showLevels = () => {
        setLevelSlide(true);
    }

    const values = {
        reviewCount,
        wordsToReview,
        reviewSlide,
        startReview,
        endReview,
        currentWord,
        checkAnswer,
        answer,
        show,
        setAnswer,
        focused,
        setFocused,
        wrongAnswer,
        showAnswer,
        levelSlide,
        setLevelSlide,
        showLevels
    }

    return (
        <ReviewContext.Provider value={values}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContext;