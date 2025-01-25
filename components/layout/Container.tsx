'use client'

interface Container {
    children: React.ReactNode
}

export default function Container({ children }: Container) {

    return (
        <div className='px-[10%]'>
            {children}
        </div>
    )
}