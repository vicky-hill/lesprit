'use client'

import { FaTimes } from 'react-icons/fa'

interface Slide {
    open: boolean
    onClose?: () => void
    children: React.ReactNode
}

export default function Slide({open, onClose, children }: Slide) {

    return (
        <div className={`window slide-container ${open && 'slide-in'}`} id="slide-container">
        { children}
        { onClose && <FaTimes className="review-close" onClick={onClose} /> }
    </div>
    )
}

