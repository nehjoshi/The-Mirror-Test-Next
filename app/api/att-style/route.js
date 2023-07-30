import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { verify } from "jsonwebtoken";
export const GET = async (req, res) => {
    try {
        //Connect to DB
        await ConnectToDb();
        //Look for token in request
        const token = req.nextUrl.searchParams.get(["token"]);
        if (!token) return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
        const userObj = await verify(token, process.env.JWT_SECRET);
        if (!userObj) return new Response(JSON.stringify({ error: "Invalid access token" }), { status: 401 });
        const user = await User.findById(userObj.id);

        //Look for Attachment Style questionnaire progress

        return new Response(JSON.stringify({qno: user.quiz2.lastQ, done: user.quiz2.finished}, {status: 200}));
    }
    catch(error) {
        console.log(error);
        return new Response(JSON.stringify({error: "Something went wrong"}, {status: 500}));
    }
}