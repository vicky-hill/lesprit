import React from 'react'

interface Hide {
    open: boolean,
    children: React.ReactNode
}

function Hide({ open, children }: Hide) {
    return (
        <div className={`${ !open && 'hidden'}`}>
            { children }
        </div>
    )
}

export default Hide;


