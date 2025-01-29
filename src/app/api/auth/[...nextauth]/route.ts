import NextAuth from "next-auth"
import { authOptions } from "./auth-options"


const handler = NextAuth(authOptions)

// export de {GET: Handler, POST: Handler}
export { handler as GET, handler as POST }