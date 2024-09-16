import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import NextAuth, {type NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export  const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
          name: 'Login',
          credentials: {
            email: {
              label: 'Email',
              type: 'email',
            },
            password: { label: 'Password', type: 'password' }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
              return null
            }
    
            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email
              }
            })
    
            if (!user) {
              throw new Error("No user found with the provided email");
            }

            let isValidPassword = false;
            if(credentials.password === user.password)
              isValidPassword = true;
            if (!isValidPassword) {
              throw new Error("Invalid password");
            }
    
            return {
              id: user.id + '',
              email: user.email,
              name: user.name,
            }
          }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }   