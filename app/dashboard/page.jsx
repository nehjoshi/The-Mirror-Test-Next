"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ENDPOINTS } from '@/utils/endpoints';
import Image from 'next/image';

const Dashboard = () => {
  const { data: session } = useSession();
  useEffect(async () => {
    const res = await fetch(`${ENDPOINTS.USER}/${session?.user?.id}`, {
      method: "GET",
    })
  }, [])
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard;