import { Client } from '@typeit/discord';
require('dotenv').config();
import { Logging } from './lib/Logging';

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