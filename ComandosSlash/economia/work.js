// work.js
const { Interaction, MessageActionRow, MessageSelectMenuBuilder } = require('discord.js');
const db = require('quick.db');

const jobs = ['Programador', 'Garçom', 'Motorista', 'Artista'];

module.exports = {
  name: 'work',
  description: 'Escolha um emprego para ganhar dinheiro.',
  async execute(interaction) {
    const user = interaction.user.id;

    const selectMenu = new MessageSelectMenuBuilder()
      .setCustomId('jobSelection')
      .setPlaceholder('Escolha um emprego')
      .addOptions(jobs.map(job => ({ label: job, value: job })));

    const row = new MessageActionRow().addComponents(selectMenu);

    await interaction.reply({ content: 'Escolha um emprego:', components: [row] });

    const filter = i => i.customId === 'jobSelection' && i.user.id === user;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      const selectedJob = i.values[0];
      const earnings = calculateEarnings(selectedJob);

      db.add(`money_${user}`, earnings);

      await i.update(`Você trabalhou como ${selectedJob} e ganhou $${earnings}!`);
      collector.stop();
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.editReply('Tempo esgotado. Por favor, execute o comando novamente.');
      }
    });
  },
};

function calculateEarnings(job) {
  // Lógica para calcular ganhos com base no emprego escolhido
  // Implemente conforme necessário
  return Math.floor(Math.random() * 100) + 1;
