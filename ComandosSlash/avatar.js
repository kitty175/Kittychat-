const { ActionRowBuilder, EmbedBuilder, ButtonBuilder  } = require("discord.js");



module.exports = {

    name: "avatar",

    description: "Pegue um avatar.",

    options: [

        {

            name: 'pessoa',

            type: 6,

            description: 'Coloque o usuário para ver o avatar.',

            require: false

        },  

    ],

    run: async (client, interaction) => {



      let user = interaction.options.getUser('pessoa') || interaction.user;



      

      const button = new ButtonBuilder()

      .setEmoji("🌐")

      .setLabel("Link")

      .setStyle(5)

      .setURL(

        user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

      );



      const row = new ActionRowBuilder().addComponents(button);

 

      let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })



        let embed = new EmbedBuilder()

       .setTitle(`Avatar - ${user.tag}`)

      .setColor('Random')

      .setImage(avatar)



      interaction.reply({ embeds: [embed], components: [row] })

      

    }
