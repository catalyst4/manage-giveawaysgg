import axios from "axios";
import cookies from "next-cookies";
import Head from "next/head";
import { Navbar } from "../components/navbar/Navbar";
import { Winners } from "../components/winners/Winners";
import { url } from "../redux/store";

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

const WinnersPage = ({ user }) => {
    return (
        <>
        <Head>
            <title>Winners | Giveaways GG</title>
        </Head>
        <div className="w-full h-full bg-gray-100">
        <Navbar user={user} />
        <div className="container mx-auto mt-20">
            <Winners />  
        </div>
        
        </div>
        </>
    )
}

export default WinnersPage