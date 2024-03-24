'use client'
import React, { useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { OPTIONS } from '../api/auth/[...nextauth]/route'

export default function Login() {
    // const [usernam, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const session = await getServerSession(OPTIONS)
    const session = useSession()
    console.log("SESSION:", session)

    async function signinHandler(e: any) {
        try {
            e.preventDefault()
            
            const data = {
                username: e.target[0].value,
                password: e.target[1].value
            }
            
            console.log(data);
            const result = await signIn("credentials", {...data, redirect: false, callbackUrl: "/dashboard"})
            if(result?.ok){
                console.log("Successfully signedIn...", result)
            }
            else {
                console.log("FAILED", result)
            }
        } catch(e) {
            console.error("AUTH",e)
        }
    }
  return (
    <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <form onSubmit={signinHandler}>
            <h3>Authorise</h3>
            <input placeholder='text' type='text' 
            // onChange={(e) => setUsername(e.target.value)}
            />
            
            <input placeholder='text' 
                // value={password} onChange={(e) => setPassword(e.target.value)}  
                type='password'/>
            <button type='submit' defaultValue={""} style={{background: "white", padding: "4px 8px", borderRadius: "2px"}} title='SUBMIT'> SUBMIT </button>

        </form>
        Login
    </div>
  )
}
