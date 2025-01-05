'use client'

import ReviewContext from '@/context/ReviewContext';
import { RootState } from '@/store/store'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { DateTime } from 'luxon'

const levels = [
    { icon: '🎓', level: 10, title: "Graduated" },
    { icon: '🍾', level: 9, title: "Almost There" },
    { icon: '♠️', level: 8, title: "Acing It" },
    { icon: '✨', level: 7, title: "Getting Pretty Good" },
    { icon: '🎩', level: 6, title: "Keep Going" },
    { icon: '🏳️', level: 5, title: "Half Way There" },
    { icon: '💎', level: 4, title: "Getting Better" },
    { icon: '📖', level: 3, title: "Needs More Work" },
    { icon: '🗝️', level: 2, title: "Recently Learned" },
    { icon: '🧊', level: 1, title: "Getting Started" },
]

export default function Levels({ }) {
    const { words } = useSelector((state: RootState) => state.words)
    const { startReview }: any = useContext(ReviewContext);

    const getLevelWords = (level: number) => {
        switch (level) {
            case 1:
                return words.filter(word => word.rating <= 2);
            case 2:
                return words.filter(word => word.rating > 2 && word.rating <= 5);
            case 3:
                return words.filter(word => word.rating > 5 && word.rating <= 8);
            case 4:
                return words.filter(word => word.rating > 8 && word.rating <= 11);
            case 5:
                return words.filter(word => word.rating > 11 && word.rating <= 14);
            case 6:
                return words.filter(word => word.rating > 14 && word.rating <= 17);
            case 6:
                return words.filter(word => word.rating > 17 && word.rating <= 20);
            case 7:
                return words.filter(word => word.rating > 20 && word.rating <= 23);
            case 8:
                return words.filter(word => word.rating > 23 && word.rating <= 25);
            case 8:
                return words.filter(word => word.rating > 25 && word.rating <= 28);
            default:
                return words.filter(word => word.rating > 28)
        }
    }

    // const getWeeklyDueWords = (time) => {
    //     const now = DateTime.now().toISODate();

    //     switch (time) {
    //         case 'this week':
    //             return words.filter(word => {
    //                 const date = new Date(word.dueDate)
    //                 const due = new Temporal.PlainDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    //                 const weekDaysRemaining = 7 - Temporal.Now.plainDateISO().dayOfWeek;
    //                 const difference = now.until(due).days;
    //                 return difference >= 0 && difference <= weekDaysRemaining
    //             })

    //         case 'next week':
    //             return words.filter(word => {
    //                 const date = new Date(word.dueDate)
    //                 const due = new Temporal.PlainDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    //                 const daysRemaining = 8 - Temporal.Now.plainDateISO().dayOfWeek;
    //                 const difference = now.add({ days: daysRemaining }).until(due).days;
    //                 return difference >= 0 && difference <= 7
    //             })

    //         case 'month 1':
    //             return words.filter(word => {
    //                 const date = new Date(word.dueDate)
    //                 const due = new Temporal.PlainDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    //                 const then = now.month === 12 ? new Temporal.PlainDateTime(now.year + 1, 1, 1) : new Temporal.PlainDateTime(now.year, now.month + 1, 1)

    //                 const difference = then.until(due).days;
    //                 return difference >= 0 && difference <= then.daysInMonth;
    //             })

    //         case 'month 2':
    //             return words.filter(word => {
    //                 const date = new Date(word.dueDate)
    //                 const due = new Temporal.PlainDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
    //                 const then = now.add({ months: 6 }).month === 12 ? new Temporal.PlainDateTime(now.year + 1, 1, 1) : new Temporal.PlainDateTime(now.year, now.month + 1, 1)

    //                 const difference = then.until(due).days;
    //                 return difference >= 0 && difference <= then.daysInMonth;
    //             })
    //     }
    // }

    return (
        <>
            <ul className='levels'>
                {
                    words && levels.map(({ level, icon, title }) => getLevelWords(level).length ? (
                        <li key={title} className='levels-item' onClick={() => startReview(getLevelWords(level))}>
                            <span className='levels-item__icon'>{icon}</span>
                            <span className='levels-item__number'>{`Level ${level} `}</span>
                            <span className='levels-item__title'>{`${title} (${getLevelWords(level).length})`}</span>
                        </li>
                    ) : null)
                }
            </ul>
        </>
    )
}