import { ConnectToDb } from "@/utils/database";
import User from "@/models/user";
import {hash, genSalt} from 'bcrypt';
import {sign} from 'jsonwebtoken';
export const POST = async (req, res) => {
    const { email, name, password } = await req.json();
    try {
        await ConnectToDb();
        const exists = await User.findOne({ email });
        if (exists) return new Response(JSON.stringify({error: "Email already exists. Please use another email address."}), { status: 409 });
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = new User({
            email: email,
            password: hashedPassword,
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
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
}