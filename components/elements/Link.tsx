import NextLink from 'next/link'

interface Link {
    href: string
    className?: string
    ariaLabel?: string
    role?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
    children: React.ReactNode
}

export default function Link({ href, ariaLabel, children, target = '_self', className = '', ...rest }: Link) {
    const getAriaLabel = () => {
        if (typeof(children) !== 'string' && !ariaLabel) {
            throw new Error('Non Text links must have aria-label');
        }

        if (target === '_blank') {
            return "Opens in a new window"
        }

        return ariaLabel;
    }

    const focus = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm';
    const hover = 'transition-all hover:text-blue-500'
    
    return (
        <NextLink
            href={href}
            aria-label={getAriaLabel()}
            target={target}
            className={`${focus} ${hover} ${className}`}
            {...rest}
        >
            {children}
        </NextLink>
    )
}

