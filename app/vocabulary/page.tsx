'use client'

import Page from '@/components/layout/Page'
import Hide from '@/components/elements/Hide'
import Spinner from '@/components/elements/Spinner'
import { useLists, useWords } from '@/store/hooks'
import VocabularyPanel from '@/components/vocabulary/VocabularyPanel'


export default function page({ }) {
    const { words, loading: wordsLoading } = useWords();
    const { lists, loading: listsLoading } = useLists();

    return (
        <Page protect>
            <div className='container'>
                <div className="scroll-container">
                    <div className="main-container">
                        {
                            wordsLoading || listsLoading ? <Spinner /> : (
                                <>
                                    {/* Hidden form */}
                                    <Hide open={false}>
                                        <div></div>
                                        {/* <VocabularyForm onClose={() => setListForm(false)} /> */}
                                    </Hide>


                                    {/* Header and vocabulary panel */}
                                    <VocabularyPanel loading={false} count={words.length} openForm={() => console.log(true)} />

                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Page>
    )
}