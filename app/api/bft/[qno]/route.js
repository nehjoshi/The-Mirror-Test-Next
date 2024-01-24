import User from "@/models/user";
import { ConnectToDb } from "@/utils/database";
import { verify } from "jsonwebtoken";
export const POST = async (req, { params }) => {
    //Get question number
    const { qno } = params;
    console.log("Current question: ", qno);
    try {
        //Check for valid payload
        const token = req.nextUrl.searchParams.get(["token"]);
        const { response, type } = await req.json();
        console.log(response, type);
        await ConnectToDb();
        if (!token) return new Response(JSON.stringify({ error: "Missing access token" }), { status: 400 });
        const userObj = await verify(token, process.env.JWT_SECRET);
        if (!userObj) return new Response(JSON.stringify({ error: "Invalid access token" }), { status: 401 });
        const user = await User.findById(userObj.id);

        //Increment result based on the type of question
        switch (type) {
            case 'e':
                user.quiz4.E += Number(response);
                break;
            case 'a':
                user.quiz4.A += Number(response);
                break;
            case 'c':
                user.quiz4.C += Number(response);
                break;
            case 'n':
                user.quiz4.N += Number(response);
                break;
            case 'o':
                user.quiz4.O += Number(response);
                break;
        }
        user.quiz4 = {...user.quiz4}
        user.quiz4.lastQ = Number(qno) + 1;
        //Check if all questions completed

        if (Number(qno) === 50) {
            console.log("COMPLETE");
            const { E, A, C, N, O } = user.quiz4;
            const E_score = E + 20;
            const A_score = A + 14;
            const C_score = C + 14;
            const N_score = N + 38;
            const O_score = O + 8;
            let E_desc, A_desc, C_desc, N_desc, O_desc;
            if (E_score >= 28) E_desc = "This means you have a high level of extroversion.";
            else if (E_score > 13 && E_score < 28) E_desc = "This means you have a medium level of extroversion.";
            else E_desc = "This means you have a low level of extroversion.";

            if (A_score >= 28) A_desc = "This means you have a high level of agreeableness.";
            else if (A_score > 13 && A_score < 28) A_desc = "This means you have a medium level of agreeableness.";
            else A_desc = "This means you have a low level of agreeableness.";

            if (C_score >= 28) C_desc = "This means you have a high level of conscientiousness.";
            else if (C_score > 13 && C_score < 28) C_desc = "This means you have a medium level of conscientiousness.";
            else C_desc = "This means you have a low level of conscientiousness.";

            if (N_score >= 28) N_desc = "This means you have a high level of neuroticism.";
            else if (N_score > 13 && N_score < 28) N_desc = "This means you have a medium level of neuroticism.";
            else N_desc = "This means you have a low level of neuroticism.";

            if (O_score >= 28) O_desc = "This means you have a high level of openness.";
            else if (O_score > 13 && O_score < 28) O_desc = "This means you have a medium level of openness.";
            else O_desc = "This means you have a low level of openness.";

            user.quiz4.E_score = E_score;
            user.quiz4.A_score = A_score;
            user.quiz4.N_score = N_score;
            user.quiz4.C_score = C_score;
            user.quiz4.O_score = O_score;
            user.quiz4.E_desc = E_desc;
            user.quiz4.A_desc = A_desc;
            user.quiz4.C_desc = C_desc;
            user.quiz4.N_desc = N_desc;
            user.quiz4.O_desc = O_desc;
            user.quiz4.finished = true;
            user.quiz4.lastQ = 50;
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