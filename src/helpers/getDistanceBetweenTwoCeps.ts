import CepCoords from 'coordenadas-do-cep';
import geolib from 'geolib';

async function getCoordinatesFromCep(cepValue: string) {
    try {
        const info = await CepCoords.getByCep(cepValue);
        return { latitude: info.lat, longitude: info.lon };
    } catch (err) {
        console.error(err);
    }
}

export default async function getDistanceBetweenTwoCEPs(
    startCep: string,
    endCep: string
) {
    const startCoordinates = await getCoordinatesFromCep(startCep);
    const endCoordinates = await getCoordinatesFromCep(endCep);

    if (startCoordinates && endCoordinates) {
        const distance = geolib.getDistance(
            startCoordinates,
            endCoordinates,
            1
        );
        const distanceInKm = distance / 1000;
        const distanceInKmWithOneDecimal = distanceInKm.toFixed(1);

        return distanceInKmWithOneDecimal;
    } else {
        console.log(
            'Failed to retrieve startCoordinates or endCoordinates coordinates.'
        );
    }
}

// const isPayingUsingPix = payment_method == 1;

// if (isPayingUsingPix) {
//     try {
//         await whatsappRestApi({
//             method: 'post',
//             url: '/send-message',
//             data: {
//                 id: restaurant!.slug,
//                 number: '55' + whatsapp,
//                 message: `*${
//                     restaurant!.name
//                 }*\n\n✅ _Seu pedido foi recebido com sucesso e começará a ser preparado em breve! Você receberá aqui todas as atualizações.\n\n Pague através da chave pix: *INSIRA CHAVE PIX*`,
//             },
//         });
//     } catch (err) {
//         console.error(err);
//     }
// } else {
//     try {
//         await whatsappRestApi({
//             method: 'post',
//             url: '/send-message',
//             data: {
//                 id: restaurant!.slug,
//                 number: '55' + whatsapp,
//                 message: `*${
//                     restaurant!.name
//                 }*\n\n✅ _Seu pedido foi recebido com sucesso e começará a ser preparado em breve! Você receberá aqui todas as atualizações.`,
//             },
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }
