// economia/perfil.js
const Canvas = require("canvas");
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const path = require("path");
const db = new QuickDB();

module.exports = {
  name: "perfil",
  description: "Informações do usuário",
  type: Discord.ApplicationCommandOptionType.ChatInput,
  options: [
    {
      name: 'usuario',
      description: 'Usuário a ver as informações',
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.getUser("usuario") || interaction.user;
    const user = interaction.guild.members.cache.get(member.id);
    const avatarURL = member.avatarURL({ extension: 'png', dynamic: true, size: 2048 });

    interaction.reply({
      content: `<:emoji_2:1159266786273939567> Processando`,
    });

    const aboutMe = await db.get(`aboutme_${member.id}`) || 'Use /sobremim para definir isso';
    const money = await db.get(`money_${member.id}`) || 0;
    let userName = await db.get(`username_${member.id}`);
    const bank = await db.get(`bank_${member.id}`) || 0;

    if (userName === null) {
      userName = member.username;
    } else {
      userName = `${userName} (${member.username})`;
    }

    const perfilImage = await db.get(`${user.id}_perfil.confi_perfil`) || 'https://media.discordapp.net/attachments/934448656751398974/1159921350668996660/165_Sem_Titulo_20231006153157.png?ex=6532c7f0&is=652052f0&hm=28507b5970928c9ab030acee7d11dc85ebe4b8ab2c16cb96dc5d8f35661a6f68&';

    const canvas = Canvas.createCanvas(850, 500);
    const ctx = canvas.getContext('2d');

    // Carregar fonte personalizada
    const fontPath = path.resolve(__dirname, '../fonte.otf');
    const font = await Canvas.loadFont(fontPath);

    const background = await Canvas.loadImage(perfilImage);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0066FF';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "left";
    ctx.font = `40px 'Uniform'`;
    ctx.fillStyle = "rgb(253, 255, 252)";
    ctx.fillText(`${userName}`, 190, 60);

    ctx.textAlign = "left";
    ctx.font = `32px 'Uniform'`;
    ctx.fillStyle = "rgb(253, 255, 252)";
    ctx.fillText(`Money: ${money.toLocaleString()}`, 190, 100);

    ctx.textAlign = "left";
    ctx.font = `32px 'Uniform'`;
    ctx.fillStyle = "rgb(253, 255, 252)";
    ctx.fillText(`Bank: ${bank}`, 550, 100);

    ctx.textAlign = "left";
    ctx.font = `32px 'Uniform'`;
    ctx.fillStyle = "rgb(253, 255, 252)";
    ctx.fillText(`${aboutMe}`, 10, 400);

    ctx.arc(100, 80, 65, 0, Math.PI * 2, true);
    ctx.strokeStyle = "#0066FF";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(avatarURL);
    ctx.drawImage(avatar, 15, 10, 175, 175);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), perfilImage);

    interaction.editReply({ content: " ", files: [attachment] });
  },
}
