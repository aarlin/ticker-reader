import 'reflect-metadata';
import { Client } from '@typeit/discord';

export class Main {
    static start() {
        const client = new Client({
            classes: [`${__dirname}/*.ts`],
            silent: false,
            variablesChar: ':',
        });
        require('dotenv').config();
        client.login(process.env.DISCORD_TOKEN);
    }
}
Main.start();