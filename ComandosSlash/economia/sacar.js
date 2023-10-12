// withdraw.js
const { Interaction } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'withdraw',
  description: 'Saque dinheiro da sua conta.',
  execute(interaction) {
    const user = interaction.user.id;
    const userBank = db.get(`bank_${user}`) || 0;

    if (userBank > 0) {
      db.subtract(`bank_${user}`, userBank);
      db.add(`money_${user}`, userBank);
      interaction.reply(`Você sacou $${userBank} da sua conta bancária.`);
    } else {
      interaction.reply('Você não tem dinheiro no banco para sacar.');
    }
  },
}
