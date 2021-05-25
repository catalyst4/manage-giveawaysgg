import React, { useEffect } from 'react'
import Link from 'next/link'
import { Menu } from './Menu'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Navbar = ({ user }) => {

    interface NavItem {
        name: String,
        href: String,
    }

    const navItems: NavItem[] = [
        { name: 'Home', href: '/' },
        { name: 'Winners', href: '/winners' },
        { name: 'Analytics', href: '/analytics' },
    ]

    return (
        <nav className="w-full h-16 bg-purple-600">
            <div className="h-full container mx-auto flex justify-between items-center">
                <div className="flex justify-start items-center">
                    <h1 className="text-xl font-semibold mr-8">Dashboard</h1>
                    <div>
                        <ul className="flex text-sm">
                            {navItems?.map((item, i) => (
                                <li key={i} className="mr-3">
                                    <Link href={`${item.href}`}>
                                        <a className="hover:bg-black hover:bg-opacity-10 px-3 py-2 font-medium rounded-md">{item.name}</a>
                                    </Link>
                                </li>    
                            ))}
                        </ul>
                    </div>    
                </div>
                <div>
                    <Account user={user} />
                </div>
            </div>
        </nav>
    )
}

const Account = ({ user }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    
    const { logout } = useSelector((state: RootStateOrAny) => state.user)

    useEffect(() => {
        if(logout) {
            router.push('/login')
        }
    }, [logout])

    return (
        <div className="flex items-center">
            <span className="text-md mr-4">{user.name}</span>
            <img src={`/img/${user.username}.png`} className="w-8 h-8 rounded-full mr-2"></img>
            <Menu logout={logoutHandler} />
        </div>
    )
}

export { Navbar, Account }
