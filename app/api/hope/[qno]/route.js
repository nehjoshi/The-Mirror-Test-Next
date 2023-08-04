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
            case 'pmb':
                user.quiz3.pmb += Number(response);
                break;
            case 'pvb':
                user.quiz3.pvb += Number(response);
                break;
            case 'psb':
                user.quiz3.psb += Number(response);
                break;
            case 'pmg':
                user.quiz3.pmg += Number(response);
                break;
            case 'pvg':
                user.quiz3.pvg += Number(response);
                break;
            case 'psg':
                user.quiz3.psg += Number(response);
                break;
        }
        //Check if all questions completed
        if (user.quiz3.lastQ === 48) {
            user.quiz3.finished = true;
            //If all done, evaluate final result and description
            const {pvb, psb, pmb, pvg, psg, pmg} = user.quiz3;
            let B = pvb + psb + pmb;
            let G = pvg + psg + pmg;
            let optScore = G - B;
            let optDesc = '';
            let hopeScore = pvb + pmb;
            let hopeDesc = '';
            let esteemScore = psb;
            let esteemDesc = '';

            if (optScore > 8) {
                optDesc = "You are a very optimistic person. You are full of hope. You would rather look at the bright side of life than the dark side.";
            }
            else if (optScore >= 6 && optScore <= 8) {
                optDesc = "You are a moderately optimistic person. By increasing your level of optimism, you can reap all the benefits of optimism. To do this, you can read books and/or material available on the internet. A few resources are also listed below.";
            }
            else if (optScore > 3 && optScore <= 5) {
                optDesc = "On the optimism scale, you fall into the average category. What this means is you are not neither an optimist nor a pessimist. By increasing your level of optimism, you can get more benefits with health, longevity, achievements, relationships and wellbeing. The books and resources listed below may help you increase your optimism score.";
            }
            else if (optScore == 1 || optScore == 2) {
                optDesc = "You have a moderately pessimistic score. You should seek a counsellor or a medical professional to improve your score. By improving your score, you will not only have health benefits, you will also have improved relationships, and a happier life.";
            }
            else {
                optDesc = "You have a very pessimistic score. You should seek a counsellor or a medical professional's help as soon as possible. ";
            }

            if (hopeScore >= 0 && hopeScore <= 2) {
                hopeDesc = 'You are extraordinarily hopeful.';
            }
            else if (hopeScore >= 3 && hopeScore <= 6) {
                hopeDesc = 'You are moderately hopeful.';
            }
            else if (hopeScore >= 7 && hopeScore <= 8) {
                hopeDesc = 'You have an average hope score.';
            }
            else if (hopeScore >= 9 && hopeScore <= 11) {
                hopeDesc = 'Your score indicates moderate hopelessness';
            }
            else if (hopeScore >= 12 && hopeScore <= 16) {
                hopeDesc = 'Your score indicates severse hopelessness.';
            }

            if (esteemScore >= 0 && esteemScore <= 1) {
                esteemDesc = 'You have a very high self-esteem.';
            }
            else if (esteemScore >= 2 && esteemScore <= 3) {
                esteemDesc = 'Your level of self-esteem is moderate.';
            }
            else if (esteemScore == 4) {
                esteemDesc = 'Your level of self-esteem is average.';
            }
            else if (esteemScore >= 5 && esteemScore <= 6) {
                esteemDesc = 'You have a moderately low self-esteem.';
            }
            else if (esteemScore >= 7) {
                esteemDesc = 'You have a very low self-esteem.';
            }
            console.log(optScore, optDesc, hopeScore, hopeDesc, esteemScore, esteemDesc);
            user.quiz3 = {
                pmb: user.quiz3.pmb,
                pvb: user.quiz3.pvb,
                psb: user.quiz3.psb,
                pmg: user.quiz3.pmg,
                pvg: user.quiz3.pvg,
                psg: user.quiz3.psg,
                optScore, optDesc, hopeScore, hopeDesc, esteemScore, esteemDesc,
                lastQ: 48,
                finished: true
            }
        }
        else {
            //Otherwise, simply increment the last completed question
            user.quiz3.lastQ = Number(qno) + 1;
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