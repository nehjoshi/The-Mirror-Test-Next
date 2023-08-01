"use client";
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { QuestionSet } from '@/utils/data';
import { ENDPOINTS } from '@/utils/endpoints';
import { useRouter } from 'next/navigation';
import Hope from '@/components/Hope/Hope';

const Page = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const GetData = async () => {
            const res = await fetch(`${ENDPOINTS.HOPE}?token=${accessToken}`);
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

    const SubmitResponse = async (type, answer) => {
        setLoading(true);
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const res = await fetch(`${ENDPOINTS.ATT_STYLE}/${number}?token=${accessToken}`, {
            method: "POST",
            body: JSON.stringify({response: answer, type: QuestionSet.att_style[number].type})
        })
        const response = await res.json();
        console.log(response);
        setNumber(number => number + 1);
    }

    return (
        <div className={styles.container}>
            {!loading &&
                <Hope
                    qno={number}
                    question={QuestionSet.hope[number].question}
                    type={QuestionSet.hope[number].type}
                    option1={QuestionSet.hope[number].option_1}
                    option2={QuestionSet.hope[number].option_2}
                    SubmitResponse={SubmitResponse}
                />
            }
        </div>
    )
}

export default Page;