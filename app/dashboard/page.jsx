"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ENDPOINTS } from '@/utils/endpoints';
import Image from 'next/image';

const Dashboard = () => {
  const { data: session } = useSession();
  useEffect(async () => {
    let token = sessionStorage.getItem("token") || session?.user?.token;
    const res = await fetch(`${ENDPOINTS.USER}?token=${token}`);
    const response = await res.json();
    console.log(response);
  }, [])
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard;