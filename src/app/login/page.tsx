'use client'
import React from 'react'

export default function Login() {
  return (
    <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <form onSubmit={(e) => {
            console.log("auth")
        }}>
            <h3>Authorise</h3>
            <input placeholder='text' type='text'/>
            <input placeholder='text' type='password'/>

        </form>
        Login
    </div>
  )
}
