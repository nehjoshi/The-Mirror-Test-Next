"use client";
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { QuestionSet } from '@/utils/data';
import { ENDPOINTS } from '@/utils/endpoints';
import { useRouter } from 'next/navigation';
import BFT from '@/components/BFT/BFT';

const Page = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        console.log("Access token: ", accessToken);
        const GetData = async () => {
            const res = await fetch(`${ENDPOINTS.BFT}?token=${accessToken}`);
            const response = await res.json();
            if (response.error) console.log(response.error);
            if (response.done){
                 return router.push('/dashboard');
            }
            else setNumber(response.qno);
            setLoading(false);
            console.log(response);
        }
        GetData();
    }, [number]);

    const SubmitResponse = async (answer) => {
        setLoading(true);
        const finalAnswer = QuestionSet.bft[number][answer].value;
        const type = QuestionSet.bft[number].type;
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const res = await fetch(`${ENDPOINTS.BFT}/${number}?token=${accessToken}`, {
            method: "POST",
            body: JSON.stringify({response: finalAnswer, type: type})
        })
        const response = await res.json();
        console.log(response);
        setNumber(number => number + 1);
    }

    return (
        <div className={styles.container}>
            {!loading &&
                <BFT
                    qno={number}
                    question={QuestionSet.bft[number].question}
                    SubmitResponse={SubmitResponse}
                />
            }
        </div>
    )
}

export default Page;