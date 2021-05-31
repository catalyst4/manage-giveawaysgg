import axios from 'axios'
import cookies from 'next-cookies'
import Head from 'next/head'
import React from 'react'
import { Analytics } from '../components/analytics/Analytics'
import { Navbar } from '../components/navbar/Navbar'
import { url } from '../redux/store'

export async function getServerSideProps(context) {

    try {
  
      const token = cookies(context).user
  
      if(!token) {
          throw new Error('No token')
      }
  
      const config = {
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      }
      
      const { data } = await axios.get(`${url}/user/auth`, config)
  
      const user = data
  
        return {
            props: { user }
        }
  
    } catch(e) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
  
}

const analytics = ({ user }) => {
    return (
        <>
            <Head>
                <title>Analytics | Giveaways GG</title>
            </Head>
            <div className="w-full h-auto">
                <Navbar user={user} />
                <div className="container mx-auto mt-20">
                    <Analytics />
                </div>
            </div>
        </>
    )
}

export default analytics
