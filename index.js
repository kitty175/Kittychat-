const express = require('express');
const app = express();
app.get("/", (request, response) => {
const ping = new Date();
response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const { GatewayIntentBits, Client, Collection } = require("discord.js");
const config = require("./Config.json");
const path = require('path');
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

module.exports = client;

client.slashCommands = new Collection();


//==== Handler das Slahs ====\\
const SlashsArray = [];

fs.readdir(`././ComandosSlash/`, (erro, pasta) => {
  pasta.forEach(subpasta => {
    fs.readdir(`././ComandosSlash/${subpasta}/`, (erro, arquivos) => {
      arquivos.forEach(arquivo => {
        if (!arquivo?.endsWith('.js')) return;
        arquivo = require(`./ComandosSlash/${subpasta}/${arquivo}`);
        if (!arquivo?.name) return;
        client.slashCommands.set(arquivo?.name, arquivo);
        SlashsArray.push(arquivo);
      });
    });
  });
});

client.on("ready", async () => {
  const guild = client.guilds.cache.get("934448654339698758");

  if (!guild) {
    console.log("O servidor específicado para registrar as slashs é inválido.", "Desligando...");
    process.exit();
  }

  guild.commands.set(SlashsArray);
});

//==== Handler dos eventin ====\\
fs.readdir(`././Eventos/`, (erro, pasta) => {
  pasta.forEach(subpasta => {
    fs.readdir(`././Eventos/${subpasta}/`, (erro, arquivos) => {
      arquivos.forEach(arquivo => {
        if (!arquivo.endsWith('.js')) return;
        require(`./Eventos/${subpasta}/${arquivo}`);
      });
    });
  });
});
client.login(config.BotToken);
