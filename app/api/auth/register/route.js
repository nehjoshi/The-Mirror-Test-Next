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
        const user = new User({ email, name, password: hashedPassword });
        await user.save();
        console.log(user);
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
}