import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import dotenv from 'dotenv'
dotenv.config()

const adminUser = {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD
}
if (!adminUser.login || !adminUser.password) {
    throw new Error("ADMIN_LOGIN or ADMIN_PASSWORD is not set")
}

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/signout',
        newUser: "/"
        // signIn: '/login',
        // newUser: "/"
    },
    // jwt: {
    //     secret: process.env.JWT_SECRET,
    // },
    // callbacks: {
    //     async jwt(token, user, account, profile, isNewUser) {
    //         if (user) {
    //             token.id = user.id
    //         }
    //         return token
    //     },
    //     async session(session, token) {
    //         session.id = token.id
    //         return session
    //     }
    // },
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
            async authorize(credentials: any): Promise<any> {
                console.log("AUTHORISING ::", credentials)
                const user = {id: 42, username: adminUser.login, password: adminUser.password }

                if(credentials?.username === user.username && credentials.password === user.password) {
                    return true
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) token.user = user;
            return token;
        }
    }
}