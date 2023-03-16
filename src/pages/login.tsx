import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useEffect } from 'react';

import Image from 'next/image';

import nexteats_logo_orange from '@/src/assets/nexteats_logo_orange.png';
import { supabase } from '@/src/server/api';
import { useRouter } from 'next/router';
import { tUserDetails } from '../types/types';

const LoginPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const Router = useRouter();

    useEffect(() => {
        async function fetchUserDetails() {
            const { data: userDetailsData } = await supabase
                .from('user_details')
                .select(
                    `
                    id,
                    restaurant_id,
                    user_id,
                    is_waiter,
                    restaurants (
                        id,
                        name,
                        slug
                    )
            `
                )
                .eq('user_id', user?.id);

            const userDetailsTypedData =
                userDetailsData![0] as unknown as tUserDetails;

            if (userDetailsTypedData?.restaurants.slug) {
                if (userDetailsTypedData.is_waiter) {
                    await Router.replace(
                        `/${userDetailsTypedData?.restaurants.slug}/admin/table-control`
                    );
                } else {
                    await Router.replace(
                        `/${userDetailsTypedData?.restaurants.slug}/admin`
                    );
                }
            }
        }

        if (user) {
            fetchUserDetails();
        }
    }, [user, supabaseClient, Router]);

    if (!user) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="max-w-[500px] w-full m-5 border border-[#0000001c] rounded-lg p-10 shadow-xl">
                    <Image
                        src={nexteats_logo_orange}
                        alt="nexteats_logo_orange"
                    />
                    <Auth
                        appearance={{
                            theme: ThemeSupa,
                            className: {
                                button: `rounded-sm font-semibold text-[white] 
                                        uppercase bg-[#de6114eb] hover:bg-[#9e3b14]
                                        border-none transition-colors duration-300`,
                            },
                        }}
                        localization={{
                            variables: {
                                sign_up: {
                                    email_label: 'Endereço de email',
                                    password_label: 'Crie uma senha',
                                    email_input_placeholder:
                                        'Seu endereço de email',
                                    password_input_placeholder: 'Sua senha',
                                    button_label: 'Registrar',
                                    loading_button_label: 'Registrando...',
                                    social_provider_text: 'Entrar com',
                                    link_text: 'Não tem uma conta? Registre-se',
                                },
                                sign_in: {
                                    email_label: 'Endereço de email',
                                    password_label: 'Sua senha',
                                    email_input_placeholder:
                                        'Seu endereço de email',
                                    password_input_placeholder: 'Sua senha',
                                    button_label: 'Entrar',
                                    loading_button_label: 'Entrando...',
                                    social_provider_text: 'Entrar com',
                                    link_text: 'Já tem uma conta? Entre',
                                },
                                magic_link: {
                                    email_input_label: 'Endereço de email',
                                    email_input_placeholder:
                                        'Seu endereço de email',
                                    button_label: 'Enviar link mágico',
                                    link_text: 'Enviar email com link mágico',
                                },
                                forgotten_password: {
                                    email_label: 'Endereço de email',
                                    password_label: 'Sua senha',
                                    email_input_placeholder:
                                        'Seu endereço de email',
                                    button_label:
                                        'Enviar instruções para redefinir senha',
                                    link_text: 'Esqueceu sua senha?',
                                },
                                update_password: {
                                    password_label: 'Nova senha',
                                    password_input_placeholder:
                                        'Sua nova senha',
                                    button_label: 'Atualizar senha',
                                },
                            },
                        }}
                        supabaseClient={supabaseClient}
                        socialLayout="horizontal"
                    />
                </div>
            </div>
        );
    }
};

export default LoginPage;
