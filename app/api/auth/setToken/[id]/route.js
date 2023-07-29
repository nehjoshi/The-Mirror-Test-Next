import User from "@/models/user";
import { sign } from "jsonwebtoken";
export const GET = async (req, { params }) => {
    console.log("Setting new token");
    const user = await User.findById(params.id);
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return new Response(JSON.stringify({ token }), { status: 200 });
}