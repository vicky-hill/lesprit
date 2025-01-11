'use client'

import React from 'react'

interface Card {
    radius?: 'soft' | 'hard' | 'medium'
    type?: 'stitched' | 'panel' | 'vocabulary' | 'word' | 'auth'
    children: React.ReactNode
}

export default function Card({ radius, type, children }: Card) {

    return (
        <div className={`${type}-card ${radius ? radius + '-radius' : ''}`}>
            {children}
        </div>
    )
}