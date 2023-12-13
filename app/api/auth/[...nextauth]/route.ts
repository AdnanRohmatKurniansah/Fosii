import { prisma } from "@/app/utils/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/'
    },
    session: {
      strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              if (!credentials?.username || !credentials?.password) {
                return null
              }
                
              const existUser = await prisma.user.findFirst({
                where: {
                  username: credentials.username
                }
              })

              if (!existUser) {
                return null
              }

              const passwordMatch = await compare(credentials.password, existUser.password)

              if (!passwordMatch) {
                return null
              }

              return {
                id: existUser.id,
                name: existUser.name,
                username: existUser.username,
              }
            }
        })
    ], 
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.name = user.name
          token.username = user.username
        }
        return token;
      },
      async session({ session, token, user }) { 
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            username: token.username,
          },
          error: token.error,
        };
      }
    }
    
} 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }