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
  portfolio(command: CommandMessage): void {
    command.author.send('General Kenobi!');
  }

  @Command('buy')
  buy(command: CommandMessage): void {
    command.author.send('General Kenobi!');
  }

  @Command('sell')
  sell(command: CommandMessage): void {
    command.author.send('General Kenobi!');
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
  async recievedMessage([message]: ArgsOf<'message'>): Promise<void> {
    console.log('Got message', message.content);
    
    // Check for ticker in message
    const tickerMatch = message.content.match(/(\$[a-zA-Z.]+)/)
    if (tickerMatch?.length > 0) {
      await Html2Image(message, 'elon');
    }
    
  }

  @On('messageDelete')
  messageDeleted([message]: ArgsOf<'messageDelete'>): void {
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
