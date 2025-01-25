'use client'

import pineapple from '@/assets/graphics/pineapple.png'
import Link from '@/next/Link'
import { usePathname } from 'next/navigation'
import { mustafa } from '@/app/layout'
import { useContext, useState } from 'react'
import UserContext from '@/context/UserContext'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'
import Button from '../elements/Button'
import { IoMdList } from 'react-icons/io'
import { Modal } from 'antd'


interface Header {

}

export default function Header({ }: Header) {
    const [model, setModal] = useState<'addList' | null>(null);

    const pathname = usePathname();

    const { currentUser, logout }: any = useContext(UserContext);

    const loggedOutNav = (
        <div className="nav">
            {
                pathname.includes('login') ?
                    <Link href="/register" className="nav-link nav-link--signin">Sign up <FaUserPlus className="fas fa-user-plus" /> </Link> :
                    <Link href="/login" className="nav-link nav-link--signin">Sign in <FaSignInAlt className="fas fa-sign-in-alt" /> </Link>
            }
        </div>
    )

    const loggedInNav = (
        <div className="nav">
            <Link href="/vocabulary" className="nav-link">vocabulary</Link>
            <Link href="/conjugation" className="nav-link">conjugation</Link>

            <img src={pineapple.src} alt="" />
            <div className="logout-box">
                <Link href="" className="nav-link nav-link--user">{currentUser?.name}</Link>
                <div className="logout" id="logout" onClick={logout}>
                    <p className="logout-button">Logout</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className='header'>
            {/* Utility Buttons */}
            <div className="dictionary-searchbar">
                {pathname === '/vocabulary' && (
                    <Button onClick={() => setModal('addList')} type="clear" className='font-normal text-[#514F55] text-[16px]' icon={<IoMdList />}>Add List</Button>
                )}
            </div>

            {/* Logo */}
            <Link href="/" >
                <span className={`${mustafa.className} text-6xl antialiased`}>lesprit</span>
            </Link>

            {!currentUser ? loggedOutNav : loggedInNav}

            {
                currentUser && (
                    <>
                        <div className="hamburger">
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                        </div>

                        <div className="drawer" id="drawer">
                            {/* <Drawer authenticated={authenticated} username={username} /> */}
                        </div>
                    </>
                )
            }

            <Modal title="Basic Modal" open={model === 'addList'} onCancel={() => setModal(null)} footer={null}>
                
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

