import { ConnectToDb } from "@/utils/database";
import User from "@/models/user";
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
export const POST = async (req, res) => {
    const { email, password } = await req.json();
    try {
        await ConnectToDb();
        const exists = await User.findOne({ email });
        if (!exists) return new Response(JSON.stringify({error: "User does not exist"}), { status: 404 });
        if (!exists.password) return new Response(JSON.stringify({error: "User does not exist"}), { status: 404 });
        const correct = await compare(password, exists?.password);
        if (!correct) return new Response(JSON.stringify({error: "Incorrect password"}), { status: 401 });
        const token = sign({ id: exists._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return new Response(JSON.stringify({ token: token, _id: exists._id }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
}