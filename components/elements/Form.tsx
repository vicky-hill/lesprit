'use client'

import React, { forwardRef } from 'react'


interface Form {
    children: React.ReactNode
    onSubmit: any
    id?: string
}

interface FormContainer {
    children: React.ReactNode
    format: 'half' | 'full'
}

interface Heading {
    children: React.ReactNode
}

const Form = ({ onSubmit, children, id }: Form) => {

    return (
        <form onSubmit={onSubmit} id={id}>
            {children}
        </form>
    )
}

export const FormContainer = ({ children, format }: FormContainer) => {
    return (
        <div className={`form-container ${format && format}`}>
            {children}
        </div>
    )
}

export const Heading = ({ children }: Heading) => {
    return (
        <h1 className="form-heading">
            {children}
        </h1>
    )
}

export const Input = forwardRef((props: any, ref: any) => {
    return (
        <div className="input-container">
            <input {...props} ref={ref} />
            <small className="invalid">{ props.validation }</small>
        </div>
    )
})

export const TextArea = (props: any) => {
    return (
        <div className="input-container">
            <textarea  {...props} cols="30" rows="4"></textarea>
            <small>{ props.small }</small>
        </div>
    )
}

export const SubmitButton = ({ title }: { title: string}) => {
    return (
        <button className='regular-btn' type="submit">{title}</button>
    )
}


export default Form;
