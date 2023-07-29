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
    const [number, setNumber] = useState(5);
    const router = useRouter();
    useEffect(() => {
        const accessToken = sessionStorage?.getItem("token") || session?.user?.token;
        const GetData = async () => {
            const res = await fetch(`${ENDPOINTS.ACE_CURRENT}?token=${accessToken}`);
            const response = await res.json();
            if (response.error) console.log(response.error);
            else setNumber(response.qno);
            setLoading(false);
            console.log(typeof response.qno.toString());
        }
        GetData();
    }, []);
    return (
        <div className={styles.container}>
            {!loading &&
                <Ace
                    qno={number}
                    question={QuestionSet.ace[number]}
                />
            }
        </div>
    )
}

export default Page;