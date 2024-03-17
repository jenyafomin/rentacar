import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    pages: {
        signIn: '/login'
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
                const user = {id: 42, username: "John", password: "next-auth"}

                if(credentials?.username === user.username && credentials.password === user.password) {
                    return true
                } else {
                    return false
                }
            }
        })
    ]
}

const Handler = NextAuth(options)

export default Handler
// export { handler as GET, handler as POST }