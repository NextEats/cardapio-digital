import '../styles/globals.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const stopLoading = () => setLoading(false);

        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', stopLoading);
        router.events.on('routeChangeError', stopLoading);

        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
            router.events.off('routeChangeError', stopLoading);
        };
    }, [router]);

    return (
        <>
            {loading && (
                <div className="w-screen h-screen flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && <Component {...pageProps} />}
        </>
    );
}
