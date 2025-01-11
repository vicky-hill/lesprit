'use client'

import Card from '@/components/elements/Card'

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
                
            </div>
        </Card>
    )
}