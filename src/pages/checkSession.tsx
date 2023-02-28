import { useSession } from 'next-auth/react';

export default function Home() {
    const { data, status } = useSession();

    return <>{JSON.stringify(data)}</>;
}
