import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/user";
import { connectToDB } from "@utils/db";

export const authConfig = 
{
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ 
                email: session.user.email
            });
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
    
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async redirect(){
            return "/";
        },
    },
}
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };