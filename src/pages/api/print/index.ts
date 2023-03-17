import { NextApiRequest, NextApiResponse } from 'next';
import { ThermalPrinter } from 'node-thermal-printer';

let printer = new ThermalPrinter({
    type: undefined,
    interface: '/dev/usb/lp0',
    removeSpecialCharacters: false,
    lineCharacter: '=',
    options: {
        timeout: 5000,
    },
});

export default async function print(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req;
    const restaurant_id = Number(query.restaurant_id);
    const { id, name } = body;

    try {
        printer.alignCenter();
        printer.println('Hello, world!');
        printer.println('Yan Tu é o cara!');
        printer.println('Aeeeee caramba!');
        printer.cut();
        printer.execute();
        res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }

    // switch (method) {
    //     case 'POST':
    //         try {
    //             let isConnected = await printer.isPrinterConnected();
    //             console.log(isConnected)
    //             let execute = await printer.execute();
    //             console.log(execute)
    //             let raw = await printer.raw(Buffer.from("Hello world"));
    //             console.log(raw)
    //             printer.print("Hello World");

    //             res.status(200).send(selects)
    //         } catch {
    //             res.status(404).end();
    //         }
    //         break
    //     default:
    //         res.status(404).end();
    // }
}
