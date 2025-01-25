'use client'

interface Container {
    children: React.ReactNode
    className?: string
    narrow?: boolean
}

export default function Container({ children, narrow, className = '' }: Container) {

    return (
        <div className={`${narrow ? 'mx-[15%]' : 'mx-[10%]' }  mt-16 ${className}`}>
            {children}
        </div>
    )
}