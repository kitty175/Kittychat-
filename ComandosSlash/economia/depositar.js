// deposit.js
const { Interaction } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'deposit',
  description: 'Deposite dinheiro na sua conta.',
  execute(interaction) {
    const user = interaction.user.id;
    const userBalance = db.get(`money_${user}`) || 0;

    if (userBalance > 0) {
      db.subtract(`money_${user}`, userBalance);
      db.add(`bank_${user}`, userBalance);
      interaction.reply(`Você depositou $${userBalance} na sua conta bancária.`);
    } else {
      interaction.reply('Você não tem dinheiro para depositar.');
    }
  },
}
