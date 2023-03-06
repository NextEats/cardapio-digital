
import { NextApiRequest, NextApiResponse } from "next";
import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from 'node-thermal-printer';
import Printer from 'node-thermal-printer';

let printer = new ThermalPrinter({
    type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
    interface: 'tcp://xxx.xxx.xxx.xxx',                       // Printer interface                      // Printer character set - default: SLOVENIA
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "=",                                       // Set character for lines - default: "-"
    options: {                                                 // Additional options
        timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    }
});

export default async function selects(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const { id, name } = body

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

