const Discord = require("discord.js");

const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports ={

        name: "sobre-mim", 

        description: "Mudar o seu sobre mim no /perfil", 

        type: Discord.ApplicationCommandType.ChatInput,

        options: [

          {

            name: 'descrição',

            description: 'A descrição que vai mudar no sobre mim',

            type: Discord.ApplicationCommandOptionType.String,

            required: true,

          },

        ],

        run: async (client, interaction, args) => {



            const descrição = interaction.options.getString("descrição");

          

          

            await db.set(`aboutme_${interaction.user.id}`,descrição );

        

              interaction.reply({content:`Certo, seu sobremim foi alterado para: ${descrição}`})

            }

            }

         

