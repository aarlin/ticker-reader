const tickerMatch = msg.content.match(/(\$[a-zA-Z.]+)/)
console.log(tickerMatch)
if (tickerMatch.length > 0) {
    await html2image(msg, 'elon');
    await yahooStocks('TSLA');
    // let editedText = msg.toString().replace(/\$[a-zA-Z.]+/, "**\$1**")
    // msg.edit(editedText)
    // you can do whatever you want with the msg variable; it returns the normal message object.
    msg.react("👋")
    // message.channel.send(tickerMatch[0]);
}