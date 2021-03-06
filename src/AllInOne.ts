import {
  Client,
  Discord,
  CommandMessage,
  Command,
  Description,
  On,
  ArgsOf,
  Guard,
} from '@typeit/discord';
import { NotBot } from './NotABot';
import { Html2Image } from './lib/Html2Image';
import Keyv from 'keyv';

const keyv = new Keyv(); // for in-memory storage
keyv.on('error', err => console.error('Keyv connection error:', err));

const log = require('./lib/Logging').Logging.logger

@Discord('!')
@Description('Example of having everything in one file!')
export abstract class AllInOne {
  @Command('ping')
  @Guard(NotBot)
  ping(command: CommandMessage): void {
    command.reply('pong!');
  }

  @Command('portfolio')
  async portfolio(command: CommandMessage): Promise<void> {
    let portfolio = await keyv.get(command.author.id);  

    if (portfolio) {
      console.log(portfolio);
      command.channel.send(portfolio);
    } else {
      command.channel.send('You have no stocks in your portfolio');
    }
  }

  @Command('buy')
  async buy(command: CommandMessage): Promise<void> {
    console.log(command.content.split(' ')[1]);
    let boughtTicker = command.content.split(' ')[1];
    let portfolio = await keyv.get(command.author.id);
    await keyv.set(command.author.id, { ...portfolio, boughtTicker })
  }

  @Command('sell')
  async sell(command: CommandMessage): Promise<void> {
    let portfolio = await keyv.get(command.author.id);  

    await keyv.set(command.author.id, portfolio);
  }

  @Command('logs')
  async printLogs(command: CommandMessage): Promise<void> {
    let deletedMessages = await keyv.get('deletedMessages');
    command.author.send(JSON.stringify(deletedMessages, null, 2));
  }


  @On('ready')
  async onReady(args: string[], bot: Record<string, any>, client: Client): Promise<void> {
    log.info(`Logged in as ${bot.user.tag}`);
    // bot.user.setActivity(`${Config.botPrefix}help`, {
    //   type: 'LISTENING',
    // });
  }

  @On('message')
  @Guard(NotBot)
  async receivedMessage([message]: ArgsOf<'message'>): Promise<void> {
    console.log(message.author.username, ':' , message.content);
    
    // Check for ticker in message
    // const tickerMatch = message.content.match(/(\$[a-zA-Z.]+)/)
    // if (tickerMatch?.length > 0) {
    //   await Html2Image(message, 'elon');
    // }
    
  }

  @On('messageDelete')
  async messageDeleted([message]: ArgsOf<'messageDelete'>): Promise<void> {
    let messageLogs = await keyv.get('deletedMessages') || [];
    await keyv.set('deletedMessages', [...messageLogs, message.content]);
    console.log(`${message.id}:${message.content} was deleted.`);
  }

  @On('guildMemberAdd')
  memberJoin([member]: ArgsOf<'guildMemberAdd'>): void {
    console.log(
      `User : ${member.user.username} has joined the Discord Server.`,
    );
  }

  @On('guildCreate')
  guildJoin([guild]: ArgsOf<'guildCreate'>): void {
    console.log(`Bot added to the Discord Server : ${guild.name}`);
  }
}
