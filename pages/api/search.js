import { searchBook } from "../../lib/redis";

export default async function handler(req, res) {
    const qry = req.query.query
    const books = await searchBook(qry);
    res.status(200).json({books});

}