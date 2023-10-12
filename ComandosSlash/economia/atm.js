// atm.js
const { Interaction } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'atm',
  description: 'Verifique o saldo no banco e na carteira.',
  execute(interaction) {
    const user = interaction.user.id;
    const userBalance = db.get(`money_${user}`) || 0;
    const userBank = db.get(`bank_${user}`) || 0;

    interaction.reply(`Saldo na carteira: $${userBalance}\nSaldo no banco: $${userBank}`);
  },
}
