// pages/index.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import config from '../config/index.json';

export default function Home() {
  const { company } = config;
  const { logo, name: companyName } = company;
  const [firstName, setFirstName] = useState('');
  const BASE_URL = 'https://api.telegram.org/bot';
  const url = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const showLogger = process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true';

  useEffect(() => {
    console.log('url ',url)
    if (showLogger) {
      console.log('Full URL:', `${BASE_URL}${url}`);
    }

    if (typeof window !== 'undefined' && window.Telegram) {
      console.log('windows is working')
      try {
        const { user } = window.Telegram.WebApp.initData;
        if (user) {
          setFirstName(user.first_name);
        }
      } catch (error) {
        console.error('Error accessing Telegram WebApp data:', error);
      }
    }
  }, [url, showLogger]);

  return (
    <div>
      <Head>
        <title>My Telegram Web App</title>
        <meta name="description" content="A web app integrated with Telegram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <h1>Welcome to My Telegram Web App</h1>
        {firstName && <p>Hello, {firstName}!</p>}
      </main>
    </div>
  );
}
