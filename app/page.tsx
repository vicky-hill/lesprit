'use client'

import Link from '@/next/Link'
import { useEffect, useState } from 'react'
import Circle from '@/components/elements/Circle'
import MenuCard from '@/components/elements/MenuCard'
import Page from '@/components/layout/Page'
import book from '@/assets/iconsImg/book-icon.png'
import speechbubble from '@/assets/iconsImg/speechbubble-icon.png'
import Footer from '@/components/layout/Footer'



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

          {/* Menu items for desktop */}
          {
            windowClass === 'desktop' && (
              <div className="desktop-home_menu">
                <Link href="/vocabulary">
                  <MenuCard icon={book} title="Vocabulary" />
                </Link>
                <Link href="/conjugation">
                  <MenuCard icon={speechbubble} title="Conjugation" bigger />
                </Link>
              </div>
            )
          }

          {/* Footer for mobile */}
          <Footer />
        </div>
      </div>
    </Page>
  )
}
