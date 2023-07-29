import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { sign } from "jsonwebtoken";
export const GET = async (req, { params }) => {
    console.log("Setting new token");
    try {
        await ConnectToDb();
        const user = await User.findById(params.id);
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong!" }, { status: 500 }));
    }
}