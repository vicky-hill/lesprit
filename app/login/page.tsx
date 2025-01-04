'use client'

import { useContext, useState, useEffect } from 'react'
import Card from '@/components/elements/Card'
import Form, { Heading, Input, SubmitButton } from '@/components/elements/Form'
import pineapple from '@/assets/graphics/pineapple.png'
import Page from '@/components/layout/Page'
import UserContext from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { auth } from '@/utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login({ }) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const { checkUserSession }: any = useContext(UserContext);

    const { email, password } = values;


    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { email, password } = values;
            const { user }: { user: any} = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem('token', user.accessToken);
       
            await checkUserSession(user.accessToken);
            router.push('/');

            setValues({ email: '', password: '' });
            setLoading(false);

        } catch (err: any) {
            console.log(err);
            setLoading(false);
        }
    }

    const onChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Page>
            <div className='scroll-container'>
                <div className='container auth-container'>
                    <Card type="auth">
                        <img className="auth-icon" src={pineapple.src} alt="pineapple" />
                        <Heading>Sign into your account</Heading>
                        <Form onSubmit={onSubmit}>
                            <Input placeholder="Email" name="email" id="email" value={email} onChange={onChange} type="text" />
                            <Input placeholder="Password" name="password" id="password" value={password} onChange={onChange} type="password" />
                            <SubmitButton title="Log In" />
                        </Form>
                    </Card>
                </div>
            </div>
        </Page>
    )
}