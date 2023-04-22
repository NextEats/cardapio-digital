import { deleteTableFetch } from '@/src/fetch/tables/deleteTable';
import { getTablesByRestaurantIdFetch } from '@/src/fetch/tables/getTablesByRestaurantId';
import { postTableFetch } from '@/src/fetch/tables/postTable';
import { updateTableFetch } from '@/src/fetch/tables/updateTable';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function tables(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query, body } = req;
    const slug = query.slug

    switch (method) {
        case 'POST':
            
            break;
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
