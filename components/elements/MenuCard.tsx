'use client'

import chevronright from "@/assets/iconsImg/chevron-right-icon.png"
import { mustafa } from '@/app/layout'

interface MenuCard {
    icon: any
    title: string
    bigger?: boolean
}

export default function MenuCard({ icon, title, bigger }: MenuCard) {

    return (
        <div className="menu-card" id={'menu-card-' + title}>
            <img className={`menu-card--icon ${bigger && 'menu-card--bigger'}`} src={icon.src} alt="card icon" />
                <h5>{title}</h5>
            <img className="menu-card--chevron" src={chevronright.src} alt="chevron right" />
        </div>
    )
}