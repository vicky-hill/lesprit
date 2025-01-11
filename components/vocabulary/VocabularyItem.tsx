import Card from '@/components/elements/Card'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

interface VocabularyItem {
    title: string
    urlKey: string
    count: number
}

function VocabularyItem({ title, urlKey, count }: VocabularyItem) {

    return (
        <Link href={`/vocabulary/${urlKey}`}>
            <Card type="vocabulary">
                {/* <img className="vocabulary-list_item--art hide-mobile" src={chapterArt01} alt="" /> */}

                <div className="vocabulary-card--text">
                    <h3>{title}</h3>
                    <p>{ count } Words</p>
                </div>


                <div className="vocabulary-card--chevron">
                    <FaChevronRight />
                </div>

            </Card>
        </Link>
    )
}

export default VocabularyItem;
