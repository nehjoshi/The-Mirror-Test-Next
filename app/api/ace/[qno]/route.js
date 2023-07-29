import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { verify } from "jsonwebtoken";
export const POST = async (req, { params }) => {
    //Get question number
    const { qno } = params;
    try {
        //Check for valid payload
        const token = req.nextUrl.searchParams.get(["token"]);
        const { response } = await req.json();
        await ConnectToDb();
        if (!token) return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
        const userObj = await verify(token, process.env.JWT_SECRET);
        if (!userObj) return new Response(JSON.stringify({ error: "Invalid access token" }), { status: 401 });
        const user = await User.findById(userObj.id);

        //Increment result
        if (response === "y") user.quiz1.result += 1;
        //Check if all questions completed
        if (user.quiz1.lastQ === 10) {
            user.quiz1.finished = true;
            if (user.quiz1.result === 0) {
                user.quiz1.resultDesc = "This is a very good score. However, not everyone is as lucky as you are! Around 64% of people have ACE score of at least 1 and and 12.5% (6 in 1 people) have ACE score 4 or more. Because a higher is score is linked to chronic diseases, mental illness, risky behaviours and early death, you can help your family, friends and people you know, by spreading awareness about ACEs.";
            }
            else if (user.quiz1.result > 0 && user.quiz1.result < 4) {
                user.quiz1.resultDesc = "If you don't have any associated health conditions, you fall into a low risk category. If you have any associated health conditions as well, you should seek medical help.";
            }
            else {
                user.quiz1.resultDesc = "Unfortunately, you fall into high risk category for toxic stress and its consequences. Because an ACE score like this is linked to chronic diseases, mental illness, risky behaviours and early death, you should seek medical help as soon as possible.";
            }
        }
        else {
            user.quiz1.lastQ = Number(qno) + 1;
        }
        //Save and respond
        await user.save();
        return new Response(JSON.stringify({ message: "success" }, { status: 200 }));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }, { status: 500 }));
    }
}