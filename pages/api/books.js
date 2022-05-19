import {createBook} from '../../lib/redis';

export default async function handler(req, res) {
    console.log(`req.body: ${JSON.stringify(req.body, undefined, 2)}`)
    const id = await createBook(req.body);
    res.status(200).json({id});
}