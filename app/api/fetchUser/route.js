import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { verify } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
export const GET = async (req, { params }) => {
    try {
        await ConnectToDb();
        const token = req.nextUrl.searchParams.get(["token"]);
        if (!token) return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
        const userObj = await verify(token, process.env.JWT_SECRET);
        if (!userObj) return new Response(JSON.stringify({ error: "Invalid access token" }), { status: 401 });
        const user = await User.findById(userObj.id);
        const respObject = {
            quiz1: user.quiz1,
            quiz2: user.quiz2,
            quiz3: user.quiz3,
            quiz4: user.quiz4,
            quiz5: user.quiz5
        }
        return new Response(JSON.stringify({ user: respObject }, { status: 200 }));
    }
    catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong" }, { status: 500 }));
    }
}