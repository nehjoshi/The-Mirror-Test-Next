"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ENDPOINTS } from '@/utils/endpoints';
import Card from '@/components/Card/Card';

const Dashboard = () => {
  const { data: session } = useSession();
  useEffect(async () => {
    let token = sessionStorage.getItem("token") || session?.user?.token;
    const res = await fetch(`${ENDPOINTS.USER}?token=${token}`);
    const response = await res.json();
    console.log(response);
  }, [session]);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Card
          name="Adverse Childhood Experiences"
          desc="Adverse Childhood Experiences are what govern our lives and shape our future. Take this test to find out more."
          image='/ace.png'
          height={250}
          width={250}
          noOfQuestions={10}
          percent={0}
          link="/ace"
        />
        <Card
          name="Attachment Style Test"
          desc="How do you attach with your loved ones or your partner? Out of the four attachment styles, secure, anxious, avoidant and disorganized, which one are you?"
          image='/att_style.png'
          height={400}
          width={400}
          noOfQuestions={40}
          percent={20}
          link="/ace"
        />
        <Card
          name="Hope and Optimism Test"
          desc="How optimistic or pessimistic are you? And how does your level of hope affect your life? Take this test to gain further insights."
          image='/hope.png'
          height={230}
          width={230}
          noOfQuestions={48}
          percent={40}
          link="/ace"
        />

        <Card
          name="Big Five Personality Test"
          desc="Out of the five big personality traits, which one suits you the best? Answer these 50 questions to find out more."
          image='/bft.png'
          height={270}
          width={270}
          noOfQuestions={50}
          percent={60}
          link="/ace"
        />
        <Card
          name="Wellbeing (PERMA) Test"
          desc="How do you feel about your overall wellbeing, quality of life and your general health? Take the wellbeing test to know more about this."
          image='/perma.png'
          height={400}
          width={400}
          noOfQuestions={23}
          percent={100}
          link="/ace"
        />
      </div>
    </div>
  )
}

export default Dashboard;