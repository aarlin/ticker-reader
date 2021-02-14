import 'reflect-metadata';
import { Client } from '@typeit/discord';
require('dotenv').config();

export class Main {
    static start() {
        const client = new Client({
            classes: [`${__dirname}/*.ts`],
            silent: false,
            variablesChar: ':',
        });
        client.login(process.env.DISCORD_TOKEN);
    }
}
Main.start();