import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import Link from 'next/link';
import { useContext } from 'react';

function ThankYouPage() {
    const { restaurant } = useContext(DigitalMenuContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Obrigado pela sua solicitação!
                        </h2>
                        <p className="mt-2 text-center text-md text-gray-600">
                            Seu pedido foi recebido e está sendo processado.
                            Você receberá uma confirmação em breve.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={`/${restaurant!.slug}`}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Voltar para a página inicial
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThankYouPage;