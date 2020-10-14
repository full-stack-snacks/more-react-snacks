import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = async (url) => {

    const response = await axios.get(url);

    return response.data;
}

export default function Home() {

    const url = 'https://drf-snacks-api.herokuapp.com/api/v1/snacks/';
    // const url = 'https://more-snacks.herokuapp.com/api/v1/snacks';

    const { data, error } = useSWR((url), fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {data.map((snack) => {
                    return <h2 key={snack.id}>hi, I am {snack.name}</h2>
                })}
            </main>
        </div>
    )
}
