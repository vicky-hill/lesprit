'use client'

import classNames from 'classnames'
import { LoadingOutlined } from '@ant-design/icons'
import Link from './Link'
import { Spin } from 'antd'

type Color = 'gold'
type Size = 'small' | 'regular' | 'large'
type Type = 'default' | 'solid' | 'outline' | 'dashed' | 'text' | 'filled' | 'clear'


interface Colors {
    gold: string
}

interface Button {
    children?: React.ReactNode
    icon?: React.ReactNode
    block?: boolean
    outline?: boolean
    link?: string
    disabled?: boolean
    ariaLabel?: string
    loading?: boolean
    onClick?: any
    color?: Color
    size?: Size
    clear?: boolean
    type?: Type
    className?: string
}

const DEFAULT_COLOR: Color = 'gold';
const DEFAULT_TYPE: Type = 'default';
const DEFAULT_SIZE: Size = 'regular';

const colors: Colors = {
    gold: '#f8d679'
}

export default function Button({ children, type = DEFAULT_TYPE, link, color = DEFAULT_COLOR, block, ariaLabel, loading, disabled, size = DEFAULT_SIZE, icon, className = '', ...rest }: Button) {
    const classes = classNames('btn', {
        [`btn-${color}-default`]: type === 'default',
        [`btn-${color}-solid`]: type === 'solid',
        [`btn-${color}-outline`]: type === 'outline',
        [`btn-${color}-dashed`]: type === 'dashed',
        [`btn-${color}-filled`]: type === 'filled',
        [`btn-${color}-text`]: type === 'text',
        [`btn-${color}-clear`]: type === 'clear',
        [`btn-${size}`]: size,
        'w-full': block,
        'btn-loading': loading
    });

    const getSpinnerColor = () => {
        const colorSpinner = ['outline', 'dashed', 'filled', 'text', 'default', 'transparent'];
        return colorSpinner.includes(type) ? colors[color] : 'white'
    }

    const ButtonWithoutLink = (
        <button disabled={loading || disabled} className={`${classes} ${className}`} {...rest} aria-label={ariaLabel}>
            {icon && !loading && <div className={children ? 'mr-2' : ''}>{icon}</div>}

            {loading && (
                <Spin
                    indicator={<LoadingOutlined style={{ color: getSpinnerColor() }} spin />}
                    size={size === 'large' ? 'default' : 'small'}
                    style={{ marginRight: 5, marginBottom: 2, marginLeft: -2 }}
                />
            )}
            <span>
                {children}
            </span>
        </button>
    )

    const ButtonWithLink = link && (
        <Link ariaLabel={ariaLabel} href={link}>
            {ButtonWithoutLink}
        </Link>
    )


    return link ? ButtonWithLink : ButtonWithoutLink
}