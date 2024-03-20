import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../../../../db/prisma/connection"

export const OPTIONS: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // signIn: '/login',
        // newUser: "/"
    },
    // adapter: Adapter(prisma)"",
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your-awesome-username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your-awesome-password"
                },
            },
            async authorize(credentials): Promise<any> {
                console.log("AUTHORISING....")
                const user = {id: 42, username: "John", password: "next-auth"}
                
                if(credentials?.username === user.username && credentials.password === user.password) {
                    console.log("AUTHORISED", true)
                    return true
                } else {
                    console.log("AUTHORISED: ERR:", null)
                    return null
                }
            }
        })
    ]
}

const Handler = NextAuth(OPTIONS)

export default {GET: Handler, POST: Handler}
// export { handler as GET, handler as POST }