'use client'

import pineapple from '@/assets/graphics/pineapple.png'
import Link from '@/next/Link'
import { usePathname, useRouter } from 'next/navigation'
import { mustafa } from '@/app/layout'
import { useContext } from 'react'
import UserContext from '@/context/UserContext'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'



interface Header {

}





export default function Header({ }: Header) {
    const router = useRouter();
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
            {/* Dictionary Search */}
            <div className="dictionary-searchbar">
                {/* <form action="">
                    <i class="fas fa-book-open input-icon"></i><input class="heading_grey-box_input rounded-input" type="text" />
                </form> */}
            </div>

            {/* Logo */}
            <Link href="/" >
                <span className={`${mustafa.className} text-6xl antialiased`}>lesprit</span>
            </Link>

            { !currentUser ? loggedOutNav : loggedInNav }

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
        </div>
    )
}

