import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { ConnectToDb } from '@/utils/database';
import { ENDPOINTS } from '@/utils/endpoints';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            const res = await fetch(`${ENDPOINTS.SET_TOKEN}/${sessionUser._id}`);
            const response = await res.json();
            session.user.token = response.token
            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await ConnectToDb();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    const user = new User({
                        email: profile.email,
                        userAgreesWithPrivacyPolicy: true
                    })
                    await user.save();
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    }
})

export { handler as GET, handler as POST }