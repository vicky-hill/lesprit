import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

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
    const searchParams = useSearchParams();
    const clearParams = ['req'];
    let params = '';
    

    searchParams.forEach((value, name) => {
        if (!clearParams.includes(name)) {
            params = !params ? `?${name}=${value}` : `${params}&${name}=${value}`
        }
    })

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

