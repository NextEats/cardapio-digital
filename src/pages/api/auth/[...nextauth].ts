import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';

export const authOptions = {
    providers: [],
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    }),
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, user }: any) {
            const signingSecret = process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!;
            if (signingSecret) {
                const payload = {
                    aud: 'authenticated',
                    exp: Math.floor(new Date(session.expires).getTime() / 1000),
                    sub: user.id,
                    email: user.email,
                    role: 'authenticated',
                };
                session.supabaseAccessToken = jwt.sign(payload, signingSecret);
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
