'use client'

import Circle from '@/components/elements/Circle';
import Page from '@/components/layout/Page'
import { useEffect, useState } from 'react'


export default function Home() {
  const [windowClass, setWindowClass] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    window.innerWidth < 1100 ? setWindowClass('mobile') : setWindowClass('desktop');
  }, []);

  return (
    <Page protect>
      <div className="container">
        <div className={windowClass + '-home'}>
          <Circle windowClass={windowClass} />
        </div>
      </div>
    </Page>
  )
}
