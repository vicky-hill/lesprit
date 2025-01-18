'use client'

import ReviewContext from '@/context/ReviewContext'
import goldCircle from "@/assets/graphics/gold-circle.png"
import silverCircle from "@/assets/graphics/silver-circle.png"
import { useContext } from 'react'
import Spinner from './Spinner'
import Slide from './Slide'
import Review from './Review'
import Levels from './Levels'
import {greatVibes} from '@/app/layout';
import { useWords } from '@/store/hooks'

interface Circle {
    windowClass: 'desktop' | 'mobile'
}

export default function Circle({ windowClass }: Circle) {
    const { words } = useWords();
    const { reviewSlide, startReview, endReview, reviewCount, levelSlide, showLevels, setLevelSlide }: any = useContext(ReviewContext);

    const gold = (
        <div className={windowClass + "-home_review--tag"} >
            <p><span id="counter" data-target={words.length}>{words.length}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
        </div>
    )

    const silver = reviewCount ? (
        <div className={windowClass + "-home_review--tag silver-tag"} >
            <p><span id="counter" data-target={reviewCount}>{reviewCount}</span></p>
        </div>
    ) : null

    if (!words.length) return;

    return (
        <>
            {
                reviewCount !== null ? (
                    <div className={windowClass + "-home_review"} onClick={reviewCount ? startReview : showLevels}>
                        <h2 className={`${windowClass}-home_review--title ${greatVibes.variable}`}>{reviewCount ? "Review" : "All done"}</h2>
                        <img className={windowClass + "-home_review--circle"} src={reviewCount ? silverCircle.src : goldCircle.src} alt="circle" />
                        {reviewCount ? silver : gold}
                    </div>
                ) : <Spinner />
            }

            <Slide open={levelSlide} onClose={() => setLevelSlide(null)}>
                <Levels />
            </Slide>

            <Slide open={reviewSlide} onClose={endReview}>
                <Review />
            </Slide>
        </>
    )
}