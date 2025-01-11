'use client'

import Card from '@/components/elements/Card'
import Button from '../elements/Button'
import { FiPlus } from 'react-icons/fi'
import Searchbar from '../elements/Searchbar'

interface VocabularyPanel {
    openForm: any
    count: number
    loading: boolean
}

export default function VocabularyPanel({ openForm, count = 0, loading }: VocabularyPanel) {

    return (
        <Card type="panel" radius="medium">
            <div className="panel-card_group">
                <h1 className="panel-card_group--title">{!loading ? count : ''} Words</h1>
                <Button
                    type="transparent"
                    onClick={openForm}
                    icon={<FiPlus size={14} />}
                >
                    Add List
                </Button>
            </div>
            <Searchbar />
        </Card>
    )
}