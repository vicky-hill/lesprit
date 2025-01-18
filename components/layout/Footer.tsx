'use client'

import book from "@/assets/iconsImg/book-icon.png"
import speechbubble from "@/assets/iconsImg/speechbubble-icon.png"
import chevronright from "@/assets/iconsImg/chevron-right-icon.png"
import Link from '@/next/Link'

interface Footer {

}

export default function Footer({ }: Footer) {

    return (
        <>
           {/* Vocabulary Footer Link */}
            <Link href="/vocabulary" className="footer-top">       
            <img className="icon" src={book.src} alt="book icon"/>
                <h5>Vocabulary</h5>
                <img className="chevron" src={chevronright.src} alt="chevron right"/>   
            </Link>
    
           
             {/* Conjugation Footer Link */}
            <div className="footer-bottom">
                <img className="icon" id="speechbubble" src={speechbubble.src} alt="speech bubble icon"/>
                <h5>Conjugation</h5>
                <img className="chevron" src={chevronright.src} alt="chevron right"/>  
            </div>
            
        </>
    )
}