import User from "@/models/user";
import { verify } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
export const GET = async (req, { params }) => {
    const token = await getToken({
        req: req,
        secret: process.env.JWT_SECRET
    });
    console.log(token);
    return new Response(JSON.stringify({ message: "Hello there" }, { status: 200 }));
}