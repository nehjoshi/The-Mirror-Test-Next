import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { verify } from "jsonwebtoken";
export const POST = async (req, { params }) => {
    //Get question number
    const { qno } = params;
    try {
        //Check for valid payload
        const token = req.nextUrl.searchParams.get(["token"]);
        const { response, type } = await req.json();
        await ConnectToDb();
        if (!token) return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
        const userObj = await verify(token, process.env.JWT_SECRET);
        if (!userObj) return new Response(JSON.stringify({ error: "Invalid access token" }), { status: 401 });
        const user = await User.findById(userObj.id);

        //Increment result based on the type of question
        switch (type) {
            case 1:
                user.quiz2.result1 += Number(response);
                break;
            case 2:
                user.quiz2.result2 += Number(response);
                break;
            case 3:
                user.quiz2.result3 += Number(response);
                break;
            case 4:
                user.quiz2.result4 += Number(response);
                break;
        }
        //Check if all questions completed
        if (user.quiz2.lastQ === 40) {
            user.quiz2.finished = true;
            const { result1, result2, result3, result4 } = user.quiz2;
            //If all done, evaluate final result and description
            if (result1 > result2 && result1 > result3 && result1 > result4) {
                console.log("Secure!");
                user.quiz2.result = "Secure";
                user.quiz2.resultDesc = "People with a secure attachment style have an ability to form trusting, loving and lasting relationships. They tend to have good self-esteem and it is easier for them to share feelings with partners and friends.";
            }
            else if (result2 > result1 && result2 > result3 && result2 > result4) {
                user.quiz2.result = "Anxious";
                user.quiz2.resultDesc = "People with an anxious attachment style tend to be insecure in and about their relationsips. Because they are concerned with the uncerctainty of relationships, they are normally hungry for validation from their partners. They also display needy or clingy behaviour.";
            }
            else if (result3 > result1 && result3 > result2 && result3 > result4) {
                user.quiz2.result = "Avoidant";
                user.quiz2.resultDesc = "An adult with this attachment style prefers to avoid intimacy and close relationships with others. This helps them retain a sense of independence and invulnerability.";
            }
            else if (result4 > result1 && result4 > result3 && result4 > result2) {
                user.quiz2.result = "Disorganized";
                user.quiz2.resultDesc = "An adult with this attachment style generally makes efforts to avoid their feelings so that they don't get overwhelmed by them. This style is a combination of both anxious and avoidant attachment styles.";
            }
        }
        else {
            //Otherwise, simply increment the last completed question
            user.quiz2.lastQ = Number(qno) + 1;
        }
        //Save and respond
        await user.save();
        return new Response(JSON.stringify({ message: "success" }, { status: 200 }));

    } catch (error) {
        //Deal with any errors
        console.log(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }, { status: 500 }));
    }
}