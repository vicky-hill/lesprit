import NextLink from 'next/link'

const paths: any = {
    home() {
        return '/'
    }
}

interface Link {
    children: React.ReactNode
    path?: 'home'
    name?: string
    urlKey?: string
    href?: string
    className?: string
    onClick?: any
}


export default function Link({ path, name, urlKey, href, children, ...rest }: Link) {
    let params = '';

    const getHref = () => {
        if (href) return href + params;
        if (path) return paths[path](urlKey) + params;
        return ''
    }

    return (
        <NextLink href={getHref()} {...rest}>
            {children}
        </NextLink>
    )
}

