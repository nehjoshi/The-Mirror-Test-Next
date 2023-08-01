"use client";
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Ace from '@/components/Ace/Ace';
import { QuestionSet } from '@/utils/data';
import { ENDPOINTS } from '@/utils/endpoints';
import { useRouter } from 'next/navigation';


const Page = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const GetData = async () => {
            const res = await fetch(`${ENDPOINTS.ACE}?token=${accessToken}`);
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
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const res = await fetch(`${ENDPOINTS.ACE}/${number}?token=${accessToken}`, {
            method: "POST",
            body: JSON.stringify({response: answer})
        })
        const response = await res.json();
        console.log(response);
        setNumber(number => number + 1);
    }

    return (
        <div className={styles.container}>
            {!loading &&
                <Ace
                    qno={number}
                    question={QuestionSet.ace[number]}
                    SubmitResponse={SubmitResponse}
                />
            }
        </div>
    )
}

export default Page;