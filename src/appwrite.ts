import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string)

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
export { ID } from 'appwrite';