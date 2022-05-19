import {Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Book extends Entity {}
let schema = new Schema(
    Book,
    {
        title: {type: 'string'},
        author: {type: 'string'},
        isbn: {type: 'string'},
        description: {type: 'string'},
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createBook(data) {
    await connect();

    // const repository = new Repository(schema, client);
    const repository = client.fetchRepository(schema);
    const book = repository.createEntity(data);
    const id = await repository.save(book);
    return id;
}
