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
                        userAgreesWithPrivacyPolicy: true,
                        quiz1: {
                            result: 0,
                            lastQ: 1,
                            resultDesc: "",
                            finished: false
                        },
                        quiz2: {
                            result1: 0,
                            result2: 0,
                            result3: 0,
                            result4: 0,
                            result: "",
                            lastQ: 0,
                            finished: false
                        },
                        quiz3: {
                            pmb: 0,
                            pvb: 0,
                            psb: 0,
                            pmg: 0,
                            pvg: 0,
                            psg: 0,
                            optScore: 0,
                            hopeScore: 0,
                            esteemScore: 0,
                            optDesc: "",
                            hopeDesc: "",
                            esteemDesc: "",
                            lastQ: 0,
                            finished: false
                        },
                        quiz4: {
                            E: 0,
                            A: 0,
                            C: 0,
                            N: 0,
                            O: 0,
                            E_score: 0,
                            A_score: 0,
                            C_score: 0,
                            N_score: 0,
                            O_score: 0,
                            E_desc: "",
                            A_desc: "",
                            C_desc: "",
                            N_desc: "",
                            O_desc: "",
                            lastQ: 0,
                            finished: false
                        },
                        quiz5: {
                            P: 0,
                            E: 0,
                            R: 0,
                            M: 0,
                            A: 0,
                            N: 0,
                            HAP: 0,
                            H: 0,
                            LON: 0,
                            PERMA: 0,
                            lastQ: 0,
                            finished: false
                        }
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