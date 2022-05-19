import {Client, Entity, Repository, Schema } from 'redis-om';

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
        title: {type: 'string', textSearch: true},
        author: {type: 'string', textSearch: true},
        isbn: {type: 'string'},
        description: {type: 'string', textSearch: true},
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createBook(data) {
    await connect();

    const repository = client.fetchRepository(schema);
    const book = repository.createEntity(data);
    const id = await repository.save(book);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = client.fetchRepository(schema);
    await repository.createIndex();
}

export async function searchBook(query) {
    await connect();
    
    const repository = new client.fetchRepository(schema);
    // const repository = new Repository(schema, client)
    const books = await repository.search()
        .where('title').eq(query)
        .or('author').eq(query)
        .or('description').matches(query)
        .return.all();

    return books;

}


