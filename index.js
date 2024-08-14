const discord = require('discord.js');
const client = new discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const KeepAlive = require('./server.js')
let dateformat = require('dateformat')
require('dotenv').config()
const mySecret = process.env.TOKEN

const moment = require('moment')



client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id !== "560849779765149696") return;

    if (reaction.message.channel.id === "756811948359680011") {
        if (reaction.emoji.name === "✅") {
            await reaction.message.guild.members.cache.get(user.id).roles.add("575550669621035029"); //members
        };
    } else {
        return;
    }

    if (reaction.message.channel.id === "772759284634746880") {
        if (reaction.emoji.name === "1️⃣") {
            await reaction.message.guild.members.cache.get(user.id).roles.add("772871292856696852"); //minecrafter
        };

        if (reaction.emoji.name === "2️⃣") {
            await reaction.message.guild.members.cache.get(user.id).roles.add("770075004414066708"); //bang dreamers
        };
    } else {
        return;
    }
});

client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id !== "560849779765149696") return;

    if (reaction.message.channel.id === "756811948359680011") {
        if (reaction.emoji.name === "✅") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("575550669621035029"); //members
        };
    } else {
        return;
    }

    if (reaction.message.channel.id === "772759284634746880") {
        if (reaction.emoji.name === "1️⃣") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("772871292856696852"); //minecrafter
        };

        if (reaction.emoji.name === "2️⃣") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("770075004414066708"); //bang dreamers
        };
    } else {
        return;
    }
});




client.once('ready', () => {
    client.user.setActivity("Something...", { type: "LISTENING" });
    console.log('nurjavier BOT is now Online!');
});



client.on('message', async message => {
    if (message.author.bot) return;
    let prefix = '/';
    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();

    if (msg.startsWith(prefix + 'serverinfo')) {
        let icon = message.guild.iconURL({ size: 2048 });

        let region = {
            "brazil": "Brazil",
            "eu-central": "Central Europe",
            "singapore": "Singapore",
            "london": "London",
            "russia": "Russia",
            "japan": "Japan",
            "hongkong": "Hongkong",
            "sydney": "Sydney",
            "us-central": "U.S. Central",
            "us-east": "U.S. East",
            "us-south": "U.S. South",
            "us-west": "U.S. West",
            "eu-west": "Western Europe"
        }

        //members
        let member = message.guild.members;
        let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
            online = member.cache.filter(m => m.user.presence.status === "online").size,
            idle = member.cache.filter(m => m.user.presence.status === "idle").size,
            dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
            robot = member.cache.filter(m => m.user.bot).size,
            total = message.guild.memberCount;

        //channels
        let channels = message.guild.channels;
        let text = channels.cache.filter(r => r.type === "text").size,
            vc = channels.cache.filter(r => r.type === "voice").size,
            category = channels.cache.filter(r => r.type === "category").size,
            totalchan = channels.cache.size;

        //region
        let location = region[message.guild.region];

        //date
        let x = Date.now() - message.guild.createdAt
        let h = Math.floor(x / 86400000)
        let created = dateformat(message.guild.createdAt)

        const embed = new discord.MessageEmbed()
            .setColor(0x72890A)
            .setTimestamp(new Date())
            .setThumbnail(icon)
            .setAuthor(message.guild.name, icon)
            .setDescription(`**ID:** ${message.guild.id}`)
            .addField("Region", location)
            .addField("Date Created", `${created} \nsince **${h}** day(s)`)
            .addField("Owner", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
            .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
            .addField(`Channels [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`)
        message.channel.send(embed);
    }

    if (msg.startsWith(prefix + 'ping')) {
        try {
            const m = await message.channel.send("Pinging...");
            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .addField("⌛ Latency", `**${m.createdTimestamp - message.createdTimestamp}ms**`)
                .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`)
            return m.edit(`🏓 Pong!`, embed);
        } catch (error) {
            return message.channel.send(`Something went wrong: ${error.message}`);
        }
    }

    if (msg.startsWith(prefix + 'owner')) {
        message.channel.send('<@!376260756225785866>');
    }

    if (msg.startsWith(prefix + 'help')) {
        const embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("nurjavier's BOT Commands")
            .addField("Prefix This Bot is", `\`/\``)
            .addField("`/help`", `Send This Message`)
            .addField("`/ping`", `Check Your Ping`)
            .addField("`/serverinfo`", `To See This Server Info`)
            .addField("`/invite`", `To See Invite Link`)
            .addField("`/userinfo <username>`", `To Check User Info`)
            .addField("`/coinflip`", `Flip A Coin!`)
            .addField("`/diceroll`", `Roll the Dice!`)
            .addField("Ada Saran Command? Silahkan DM nurjavier8789", `Another Command is Comming Soon ;)`)
            .setTimestamp(new Date())
        message.channel.send("Here You Go!", embed);
    }

    if (msg.startsWith(prefix + 'invite')) {
        message.channel.send('https://discord.gg/gFuqDah  ajak temen yak :)');
    }

    if (msg.startsWith(prefix + 'userinfo') || msg.startsWith(prefix + 'user')) {
        let user = message.mentions.users.first() || message.author;

        if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
        if (user.presence.status === "idle") user.presence.status = "Idle";
        if (user.presence.status === "offline") user.presence.status = "Offline";
        if (user.presence.status === "online") user.presence.status = "Online";

        function game() {
            let game;
            if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
            else if (user.presence.activities.length < 1) game = "Node";
            return game
        }

        let x = Date.now() - user.createdAt;
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
        let created = Math.floor(x / 86400000);
        let joined = Math.floor(y / 86400000);

        const member = message.guild.member(user);
        let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
        let createdate = moment.utc(user.createdAt).format("dddd, MMMM do YYYY, HH:mm:ss");
        let joindate = moment.utc(member.joinedAt).format("dddd, MMMM do YYYY, HH:mm:ss");
        let status = user.presence.status;
        let avatar = user.avatarURL({ size: 2048 });

        const embed = new discord.MessageEmbed()
            .setAuthor(user.tag, avatar)
            .setThumbnail(avatar)
            .setTimestamp()
            .setColor(0x7289DA)
            .addField("ID", user.id, true)
            .addField("Nickname", nickname, true)
            .addField("Created Account Date", `${createdate} \nsince ${created} day(s) ago`, true)
            .addField("Joined Guild Date", `${joindate} \nsince ${joined} day(s) ago`, true)
            .addField("Status", status, true)
            .addField("Game", game, true)
            .setFooter("test")

        message.channel.send(embed);
    }

    if (msg.startsWith(prefix + 'opserverinfo')) {
        let icon = message.guild.iconURL({ size: 2048 });

        const embed = new discord.MessageEmbed()
            .setColor("RAMDOM")
            .setThumbnail(icon)
            .setAuthor("nurjavier Team Server Info", icon)
            .addField("Server Name:", `nurjavier Team`)
            .addField("ID Server:", `560849779765149696`)
            .addField("Region:", `U.S. Central`)
            .addField("Date Created:", `28-03-2019 22:36:27`)
            .addField("Owner:", `@nurjavier8789#0109 (ID User: 376260756225785866)`)

        message.channel.send(embed);
    }

    if (msg.startsWith(prefix + 'coinflip')) {
        function doRandHT() {
            var rand = ['HEADS!', 'TAILS!'];

            return rand[Math.floor(Math.random() * rand.length)];
        }

        const m = await message.channel.send('Flipping...');
        return m.edit('Flipped! It is a ' + doRandHT());
    }

    if (msg.startsWith(prefix + 'diceroll')) {
        function Dice() {
            var rand = ['1!', '2!', '3!', '4!', '5!', '6!'];

            return rand[Math.floor(Math.random() * rand.length)];
        }

        const m = await message.channel.send('Rolling...');
        return m.edit('Done! You Got Number ' + Dice())
    }

    if (msg.startsWith(prefix + 'roles')) {
        let channel = client.channels.cache.get("772759284634746880");
        const embed = new discord.MessageEmbed()
            .setColor(0xffffff)
            .setTitle("Get Your Roles!")
            .setDescription(`1️⃣ [Minecrafter] \n\n2️⃣ [BanG Dreamers]`)
        channel.send(embed).then(async msg => {
            await msg.react("1️⃣");
            await msg.react("2️⃣");
        })
    }

})

KeepAlive()

// client.login("NzU1MzYyOTEyMDU4NjA1NjQ5.GD9AD4.Jnjzw7G3BeQV0_2LJtuEV4q-MQeXzLgea5LV40");
client.login(mySecret);