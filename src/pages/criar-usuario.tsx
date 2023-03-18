import { useCallback, useState } from 'react';
import { supabase } from '../server/api';

export default function CreateUser() {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleSubmit = useCallback(async () => {
        const bothValuesExists = email && password;

        if (!bothValuesExists) {
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        console.log(data);
    }, [email, password]);

    return (
        <>
            <div>
                <input
                    name="email"
                    id="email"
                    placeholder="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    id="password"
                    placeholder="password"
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </>
    );
}
