'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import placeholder from '../public/placeholder.png'

interface Image {
    src: any
    className?: string
    alt?: string
    objectFit?: 'cover' | 'contain' | 'fill' | 'none'
}

export default function Image({ src, className, alt = 'image description', objectFit = 'cover', ...rest }: Image) {
    const [imgSource, setImgSrc] = useState(() => {
        if (src?.src) return src.src;
        return src && (src?.startsWith('/') || src?.startsWith('http') ? src : placeholder)
    });

    if (!src) return;

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }} className={className}>
            <NextImage
                src={imgSource}
                fill
                style={{ objectFit }}
                alt={alt}
                priority
                onError={() => {
                    setImgSrc(placeholder)
                }}
                {...rest}
            />
        </div>
    )
}