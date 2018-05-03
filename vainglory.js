var Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require("fs");
var _ = require("underscore");
var Vainglory = require("vainglory");
var schedule = require('node-schedule');

// database
const sql = require("sqlite");
sql.open("./username_database.sqlite");

// vainglory api
// import Vainglory from 'vainglory';

// Defaults
const options = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  title: 'semc-vainglory',
};

const vainglory = new Vainglory('APITOKEN HERE', options);


// verify
bot.on("message", msg => {
  let prefix = ".";
  if(!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;
  if(msg.type === 'dm') return;
  if (msg.content.startsWith (prefix + "update")) {

    var playerName = [];
    sql.get(`SELECT * FROM username_database WHERE userID = "${msg.author.id}"`).then(row => {
      removeRole(msg); // remove previous roles
      if (!row) { // can't find the row, user defaults
        if (msg.member.nickname === null) {
          console.log("Using username: " + msg.author.username)
          var playerName = [msg.author.username];
          assign_skillTier(msg, playerName);
          } else {
          console.log("Using nickname: " + msg.member.nickname)
          var playerName = [msg.member.nickname];
          assign_skillTier(msg, playerName);
          }
        } else { // found the row
          console.log("Found the row!")
          sql.get(`SELECT gameName FROM username_database WHERE userID = "${msg.author.id}"`).then(row => {
          var playerName = [row.gameName];
          assign_skillTier(msg, playerName);
          });
        }
      });

    // clear the playerName variable, probably a more elegant way to do this but you know me
    var playerName = undefined;

    };
  });

bot.on("message", msg => {
    let prefix = ".";
    if(!msg.content.startsWith(prefix)) return;
    if(msg.author.bot) return;
    if(msg.type === 'dm') return;
    if (msg.content.startsWith (prefix + "set")) {
      let args = msg.content.split(" ").slice(1);
      let username_set = args[0];
      // let username_id = msg.author.id;
      /*
      let entry = {
        Username: msg.author.username,
        Nickname: msg.author.nickname,
        ID: msg.author.id,
        VG Name: username_set
      };
      */

      sql.get(`SELECT * FROM username_database WHERE userID = "${msg.author.id}"`).then(row => {
        // if doesn't exist
        if (!row) { // can't find the row.
            sql.run("INSERT INTO username_database (userName, userNickname, userID, gameName, skillTier) VALUES (?, ?, ?, ?, ?)", [msg.author.username, msg.member.nickname, msg.author.id, , skillTier]);
            console.log("User SET in-game name: " + msg.author.username + " = " + username_set);
            usernameEmbed(msg, username_set);
          } else { // found the row
            sql.run(`UPDATE username_database SET userName = "${msg.author.username}", userNickname = "${msg.member.nickname}", gameName = "${username_set}" WHERE userID = "${msg.author.id}"`);
            usernameEmbed(msg, username_set);
            console.log("User UPDATED in-game name: " + msg.author.username + " = " + username_set);
          }

      }).catch(() => {
        console.error;
        // create table , one time command lols but lets leave it
        sql.run("CREATE TABLE IF NOT EXISTS username_database (userName TEXT, userNickname TEXT, userID TEXT, gameName TEXT, skillTier INT)").then(() => {
        sql.run("INSERT INTO username_database (userName, userNickname, userID, gameName, skillTier) VALUES (?, ?, ?, ?, ?)", [msg.author.username, msg.author.nickname, msg.author.id, username_set, 0]);
        });
      });

  }});

// auto update scheduler
var rule = new schedule.RecurrenceRule();
//rule.second = 35;
rule.hour = 3;
rule.minute = 0;

  // remove roles
var autoUpdate = schedule.scheduleJob(rule, function() {
  RautoTracker = 1;
  AautoTracker = 1;
  var SBguild = bot.guilds.find("id", "249599230010720257");

  console.log('[AUTO] Auto-update initialized');
  var RautoUpdateInterval = setInterval( function() {
  sql.get(`SELECT * FROM username_database WHERE rowid = ${RautoTracker}`).then(row => {
    if (!row) { // can't find the row, user defaults
      console.log("[AUTO] !!! End of removing !!!");
      clearInterval(RautoUpdateInterval);
      } else { // found the row
        console.log("[AUTO] Removing role for: " + row.userName);
        AUTO_removeRole(SBguild, row.userID);
        RautoTracker++;
      }
      });
  }, 2000);

  // add roles
  var AautoUpdateInterval = setInterval( function() {
  sql.get(`SELECT * FROM username_database WHERE rowid = ${AautoTracker}`).then(row => {
    if (!row) { // can't find the row, user defaults
      console.log("[AUTO] !!! End of updating !!!");
      clearInterval(AautoUpdateInterval);
      } else { // found the row
        console.log("[AUTO] Updating! " + row.userName);
        AUTOassign_skillTier(SBguild, row.userID, row.gameName);
        AautoTracker++;
      }
      });
  }, 10000);
});


// clear all previous roles , brute forcing this because im too lazy to find an elegant solution
var removeRole = function (msg) {

    let remove_role27 = msg.guild.roles.find("id", "374587978737123328");
    if (msg.member.roles.has(remove_role27.id)) {
      msg.member.removeRole(remove_role27).catch(console.error);
    }

    let remove_role26 = msg.guild.roles.find("id", "374589274177273858");
    if (msg.member.roles.has(remove_role26.id)) {
      msg.member.removeRole(remove_role26).catch(console.error);
    }

    let remove_role25 = msg.guild.roles.find("id", "372861723109228564");
    if (msg.member.roles.has(remove_role25.id)) {
      msg.member.removeRole(remove_role25).catch(console.error);
    }

    let remove_role24 = msg.guild.roles.find("id", "372861774887649292");
    if (msg.member.roles.has(remove_role24.id)) {
      msg.member.removeRole(remove_role24).catch(console.error);
    }

    let remove_role23 = msg.guild.roles.find("id", "374588354391441408");
    if (msg.member.roles.has(remove_role23.id)) {
      msg.member.removeRole(remove_role23).catch(console.error);
    }

    let remove_role22 = msg.guild.roles.find("id", "374587945388343297");
    if (msg.member.roles.has(remove_role22.id)) {
      msg.member.removeRole(remove_role22).catch(console.error);
    }

    let remove_role21 = msg.guild.roles.find("id", "372861823998885889");
    if (msg.member.roles.has(remove_role21.id)) {
      msg.member.removeRole(remove_role21).catch(console.error);
    }

    let remove_role20 = msg.guild.roles.find("id", "374588451980574721");
    if (msg.member.roles.has(remove_role20.id)) {
      msg.member.removeRole(remove_role20).catch(console.error);
    }

    let remove_role19 = msg.guild.roles.find("id", "374588446162812929");
    if (msg.member.roles.has(remove_role19.id)) {
      msg.member.removeRole(remove_role19).catch(console.error);
    }

    let remove_role18 = msg.guild.roles.find("id", "374588338021203969");
    if (msg.member.roles.has(remove_role18.id)) {
      msg.member.removeRole(remove_role18).catch(console.error);
    }

    let remove_role17 = msg.guild.roles.find("id", "374588598877683713");
    if (msg.member.roles.has(remove_role17.id)) {
      msg.member.removeRole(remove_role17).catch(console.error);
    }

    let remove_role16 = msg.guild.roles.find("id", "372861876356251648");
    if (msg.member.roles.has(remove_role16.id)) {
      msg.member.removeRole(remove_role16).catch(console.error);
    }

    let remove_role15 = msg.guild.roles.find("id", "372862062537474048");
    if (msg.member.roles.has(remove_role15.id)) {
      msg.member.removeRole(remove_role15).catch(console.error);
    }

    let remove_role14 = msg.guild.roles.find("id", "374588619291230209");
    if (msg.member.roles.has(remove_role14.id)) {
      msg.member.removeRole(remove_role14).catch(console.error);
    }

    let remove_role13 = msg.guild.roles.find("id", "374588610789507082");
    if (msg.member.roles.has(remove_role13.id)) {
      msg.member.removeRole(remove_role13).catch(console.error);
    }

    let remove_role12 = msg.guild.roles.find("id", "372862102274048000");
    if (msg.member.roles.has(remove_role12.id)) {
      msg.member.removeRole(remove_role12).catch(console.error);
    }

    let remove_role11 = msg.guild.roles.find("id", "374588644784078858");
    if (msg.member.roles.has(remove_role11.id)) {
      msg.member.removeRole(remove_role11).catch(console.error);
    }

    let remove_role10 = msg.guild.roles.find("id", "374588628044742676");
    if (msg.member.roles.has(remove_role10.id)) {
      msg.member.removeRole(remove_role10).catch(console.error);
    }

    let remove_role9 = msg.guild.roles.find("id", "372862377819111424");
    if (msg.member.roles.has(remove_role9.id)) {
      msg.member.removeRole(remove_role9).catch(console.error);
    }

    let remove_role8 = msg.guild.roles.find("id", "374588674261909505");
    if (msg.member.roles.has(remove_role8.id)) {
      msg.member.removeRole(remove_role8).catch(console.error);
    }

    let remove_role7 = msg.guild.roles.find("id", "374588663180296192");
    if (msg.member.roles.has(remove_role7.id)) {
      msg.member.removeRole(remove_role7).catch(console.error);
    }

    let remove_role6 = msg.guild.roles.find("id", "372862420890419210");
    if (msg.member.roles.has(remove_role6.id)) {
      msg.member.removeRole(remove_role6).catch(console.error);
    }

    let remove_role5 = msg.guild.roles.find("id", "374588685418627092");
    if (msg.member.roles.has(remove_role5.id)) {
      msg.member.removeRole(remove_role5).catch(console.error);
    }

    let remove_role4 = msg.guild.roles.find("id", "374588696483069952");
    if (msg.member.roles.has(remove_role4.id)) {
      msg.member.removeRole(remove_role4).catch(console.error);
    }

    let remove_role3 = msg.guild.roles.find("id", "374588706499198977");
    if (msg.member.roles.has(remove_role3.id)) {
      msg.member.removeRole(remove_role3).catch(console.error);
    }

    let remove_role2 = msg.guild.roles.find("id", "374588806155993098");
    if (msg.member.roles.has(remove_role2.id)) {
      msg.member.removeRole(remove_role2).catch(console.error);
    }

    let remove_role1 = msg.guild.roles.find("id", "372805840970711040");
    if (msg.member.roles.has(remove_role1.id)) {
      msg.member.removeRole(remove_role1).catch(console.error);
    }

}

var updateSQLskillTier = function (msg, skillTier) {
  sql.get(`SELECT * FROM username_database WHERE userID = "${msg.author.id}"`).then(row => {
    if (!row) { // can't find the row, user defaults
      if (msg.member.nickname === null) {
        var playerName = [msg.author.username];
        sql.run("INSERT INTO username_database (userName, userNickname, userID, gameName, skillTier) VALUES (?, ?, ?, ?, ?)", [msg.author.username, msg.member.nickname, msg.author.id, msg.author.username, skillTier]);
        } else {
        var playerName = [msg.member.nickname];
        sql.run("INSERT INTO username_database (userName, userNickname, userID, gameName, skillTier) VALUES (?, ?, ?, ?, ?)", [msg.author.username, msg.member.nickname, msg.author.id, msg.member.nickname, skillTier]);
        }
      } else { // found the row
        sql.get(`SELECT skillTier FROM username_database WHERE userID = "${msg.author.id}"`).then(row => {
        var playerName = [row.gameName];
        sql.run(`UPDATE username_database SET userName = "${msg.author.username}", userNickname = "${msg.member.nickname}", skillTier = "${skillTier}" WHERE userID = "${msg.author.id}"`);
        });
      }
    });
}

var AUTOupdateSQLskillTier = function (userID, skillTier) {
  sql.get(`SELECT * FROM username_database WHERE userID = "${userID}"`).then(row => {
    if (row) { // found the row
        sql.run(`UPDATE username_database SET skillTier = "${skillTier}" WHERE userID = "${userID}"`);
      }
    });
}

assign_skillTier = function (msg, playerName) {
  // get skillTier
  // var skill_Tier = "";

  //use the api wrapper
  vainglory.players.getByName(playerName).then(players => {
    // console.log(players.data[0].attributes.stats['skillTier']);
    var skill_Tier = players.data[0].attributes.stats['skillTier'];
    // console.log(players);
    if (skill_Tier === 29) {
      let add_role = msg.guild.roles.find("id", "372805840970711040");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Vainglorious Gold!")
    }
    else if (skill_Tier === 28) {
      let add_role = msg.guild.roles.find("id", "374588806155993098");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Vainglorious Silver!")
    }
    else if (skill_Tier === 27) {
      let add_role = msg.guild.roles.find("id", "374588706499198977");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Vainglorious Bronze!")
    }
    else if (skill_Tier === 26) {
      let add_role = msg.guild.roles.find("id", "374588696483069952");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Pinnacle of Awesome Gold!")
    }
    else if (skill_Tier === 25) {
      let add_role = msg.guild.roles.find("id", "374588685418627092");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Pinnacle of Awesome Silver!")
    }
    else if (skill_Tier === 24) {
      let add_role = msg.guild.roles.find("id", "372862420890419210");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Pinnacle of Awesome Bronze!")
    }
    else if (skill_Tier === 23) {
      let add_role = msg.guild.roles.find("id", "374588663180296192");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Simply Amazing Gold!")
    }
    else if (skill_Tier === 22) {
      let add_role = msg.guild.roles.find("id", "374588674261909505");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Simply Amazing Silver!")
    }
    else if (skill_Tier === 21) {
      let add_role = msg.guild.roles.find("id", "372862377819111424");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Simply Amazing Bronze!")
    }
    else if (skill_Tier === 20) {
      let add_role = msg.guild.roles.find("id", "374588628044742676");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "The Hotness Gold!")
    }
    else if (skill_Tier === 19) {
      let add_role = msg.guild.roles.find("id", "374588644784078858");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "The Hotness Silver!")
    }
    else if (skill_Tier === 18) {
      let add_role = msg.guild.roles.find("id", "372862102274048000");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "The Hotness Bronze!")
    }
    else if (skill_Tier === 17) {
      let add_role = msg.guild.roles.find("id", "374588610789507082");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Credible Threat Gold!")
    }
    else if (skill_Tier === 16) {
      let add_role = msg.guild.roles.find("id", "374588619291230209");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Credible Threat Silver!")
    }
    else if (skill_Tier === 15) {
      let add_role = msg.guild.roles.find("id", "372862062537474048");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Credible Threat Bronze!")
    }
    else if (skill_Tier === 14) {
      let add_role = msg.guild.roles.find("id", "372861876356251648");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Got Swagger Gold!")
    }
    else if (skill_Tier === 13) {
      let add_role = msg.guild.roles.find("id", "374588598877683713");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Got Swagger Silver!")
    }
    else if (skill_Tier === 12) {
      let add_role = msg.guild.roles.find("id", "374588338021203969");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Got Swagger Bronze!")
    }
    else if (skill_Tier === 11) {
      let add_role = msg.guild.roles.find("id", "374588446162812929");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Worthy Foe Gold!")
    }
    else if (skill_Tier === 10) {
      let add_role = msg.guild.roles.find("id", "374588451980574721");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Worthy Foe Silver!")
    }
    else if (skill_Tier === 9) {
      let add_role = msg.guild.roles.find("id", "372861823998885889");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Worthy Foe Bronze!")
    }
    else if (skill_Tier === 8) {
      let add_role = msg.guild.roles.find("id", "374587945388343297");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Rock Solid Gold!")
    }
    else if (skill_Tier === 7) {
      let add_role = msg.guild.roles.find("id", "374588354391441408");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Rock Solid Silver!")
    }
    else if (skill_Tier === 6) {
      let add_role = msg.guild.roles.find("id", "372861774887649292");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Rock Solid Bronze!")
    }
    else if (skill_Tier === 5) {
      let add_role = msg.guild.roles.find("id", "372861723109228564");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Getting There Gold!")
    }
    else if (skill_Tier === 4) {
      let add_role = msg.guild.roles.find("id", "374589274177273858");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Getting There Silver!")
    }
    else if (skill_Tier === 3) {
      let add_role = msg.guild.roles.find("id", "374587978737123328");
      msg.member.addRole(add_role).catch(console.error);
      updateEmbed(msg, "Getting There Bronze!")
    }
    updateSQLskillTier(msg, skill_Tier);

  }).catch((errors) => {
    // console.log(errors);
    // if we couldn't find their rank
    usernameFailedEmbed(msg, playerName);
  });
};

var updateEmbed = function (msg, rank) {
  var embed = new Discord.RichEmbed()
    .setTitle(":thinking: Success!")
    .setColor(0x00AE86)
    .setDescription("Your rank is " + rank)
    .setTimestamp()
  msg.channel.send({embed})
  .catch(err => console.log(err));
};

var usernameEmbed = function (msg, username) {
  var embed = new Discord.RichEmbed()
    .setTitle(":smiley: Success!")
    .setColor(0x00AE86)
    .setDescription("Your in-game name is set: " + username)
    .setTimestamp()
  msg.channel.send({embed})
  .catch(err => console.log(err));
};

var usernameFailedEmbed = function (msg, username) {
  var embed = new Discord.RichEmbed()
    .setTitle(":cold_sweat: Not found")
    .setColor(0x00AE86)
    .setDescription("No stats found for your username: " + username + "\n\nTry setting a username using \".set <username>\"")
    .setTimestamp()
  msg.channel.send({embed})
  .catch(err => console.log(err));
};

var AUTO_removeRole = function (guild, userID) {

    var member = guild.member(userID);

    let remove_role27 = guild.roles.find("id", "374587978737123328");
    if (member.roles.has(remove_role27.id)) {
      member.removeRole(remove_role27).catch(console.error);
    }

    let remove_role26 = guild.roles.find("id", "374589274177273858");
    if (member.roles.has(remove_role26.id)) {
      member.removeRole(remove_role26).catch(console.error);
    }

    let remove_role25 = guild.roles.find("id", "372861723109228564");
    if (member.roles.has(remove_role25.id)) {
      member.removeRole(remove_role25).catch(console.error);
    }

    let remove_role24 = guild.roles.find("id", "372861774887649292");
    if (member.roles.has(remove_role24.id)) {
      member.removeRole(remove_role24).catch(console.error);
    }

    let remove_role23 = guild.roles.find("id", "374588354391441408");
    if (member.roles.has(remove_role23.id)) {
      member.removeRole(remove_role23).catch(console.error);
    }

    let remove_role22 = guild.roles.find("id", "374587945388343297");
    if (member.roles.has(remove_role22.id)) {
      member.removeRole(remove_role22).catch(console.error);
    }

    let remove_role21 = guild.roles.find("id", "372861823998885889");
    if (member.roles.has(remove_role21.id)) {
      member.removeRole(remove_role21).catch(console.error);
    }

    let remove_role20 = guild.roles.find("id", "374588451980574721");
    if (member.roles.has(remove_role20.id)) {
      member.removeRole(remove_role20).catch(console.error);
    }

    let remove_role19 = guild.roles.find("id", "374588446162812929");
    if (member.roles.has(remove_role19.id)) {
      member.removeRole(remove_role19).catch(console.error);
    }

    let remove_role18 = guild.roles.find("id", "374588338021203969");
    if (member.roles.has(remove_role18.id)) {
      member.removeRole(remove_role18).catch(console.error);
    }

    let remove_role17 = guild.roles.find("id", "374588598877683713");
    if (member.roles.has(remove_role17.id)) {
      member.removeRole(remove_role17).catch(console.error);
    }

    let remove_role16 = guild.roles.find("id", "372861876356251648");
    if (member.roles.has(remove_role16.id)) {
      member.removeRole(remove_role16).catch(console.error);
    }

    let remove_role15 = guild.roles.find("id", "372862062537474048");
    if (member.roles.has(remove_role15.id)) {
      member.removeRole(remove_role15).catch(console.error);
    }

    let remove_role14 = guild.roles.find("id", "374588619291230209");
    if (member.roles.has(remove_role14.id)) {
      member.removeRole(remove_role14).catch(console.error);
    }

    let remove_role13 = guild.roles.find("id", "374588610789507082");
    if (member.roles.has(remove_role13.id)) {
      member.removeRole(remove_role13).catch(console.error);
    }

    let remove_role12 = guild.roles.find("id", "372862102274048000");
    if (member.roles.has(remove_role12.id)) {
      member.removeRole(remove_role12).catch(console.error);
    }

    let remove_role11 = guild.roles.find("id", "374588644784078858");
    if (member.roles.has(remove_role11.id)) {
      member.removeRole(remove_role11).catch(console.error);
    }

    let remove_role10 = guild.roles.find("id", "374588628044742676");
    if (member.roles.has(remove_role10.id)) {
      member.removeRole(remove_role10).catch(console.error);
    }

    let remove_role9 = guild.roles.find("id", "372862377819111424");
    if (member.roles.has(remove_role9.id)) {
      member.removeRole(remove_role9).catch(console.error);
    }

    let remove_role8 = guild.roles.find("id", "374588674261909505");
    if (member.roles.has(remove_role8.id)) {
      member.removeRole(remove_role8).catch(console.error);
    }

    let remove_role7 = guild.roles.find("id", "374588663180296192");
    if (member.roles.has(remove_role7.id)) {
      member.removeRole(remove_role7).catch(console.error);
    }

    let remove_role6 = guild.roles.find("id", "372862420890419210");
    if (member.roles.has(remove_role6.id)) {
      member.removeRole(remove_role6).catch(console.error);
    }

    let remove_role5 = guild.roles.find("id", "374588685418627092");
    if (member.roles.has(remove_role5.id)) {
      member.removeRole(remove_role5).catch(console.error);
    }

    let remove_role4 = guild.roles.find("id", "374588696483069952");
    if (member.roles.has(remove_role4.id)) {
      member.removeRole(remove_role4).catch(console.error);
    }

    let remove_role3 = guild.roles.find("id", "374588706499198977");
    if (member.roles.has(remove_role3.id)) {
      member.removeRole(remove_role3).catch(console.error);
    }

    let remove_role2 = guild.roles.find("id", "374588806155993098");
    if (member.roles.has(remove_role2.id)) {
      member.removeRole(remove_role2).catch(console.error);
    }

    let remove_role1 = guild.roles.find("id", "372805840970711040");
    if (member.roles.has(remove_role1.id)) {
      member.removeRole(remove_role1).catch(console.error);
    }
}

AUTOassign_skillTier = function (guild, userID, playerName) {

  var member = guild.member(userID);
  // change it into an array to work with the api
  var playerName = [playerName];

  //use the api wrapper
  vainglory.players.getByName(playerName).then(players => {
    // console.log(players);
    // console.log(players.data[0].attributes.stats['skillTier']);

    var skill_Tier = players.data[0].attributes.stats['skillTier'];

    if (skill_Tier === 29) {
      let add_role = guild.roles.find("id", "372805840970711040");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 28) {
      let add_role = guild.roles.find("id", "374588806155993098");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 27) {
      let add_role = guild.roles.find("id", "374588706499198977");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 26) {
      let add_role = guild.roles.find("id", "374588696483069952");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 25) {
      let add_role = guild.roles.find("id", "374588685418627092");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 24) {
      let add_role = guild.roles.find("id", "372862420890419210");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 23) {
      let add_role = guild.roles.find("id", "374588663180296192");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 22) {
      let add_role = guild.roles.find("id", "374588674261909505");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 21) {
      let add_role = guild.roles.find("id", "372862377819111424");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 20) {
      let add_role = guild.roles.find("id", "374588628044742676");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 19) {
      let add_role = guild.roles.find("id", "374588644784078858");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 18) {
      let add_role = guild.roles.find("id", "372862102274048000");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 17) {
      let add_role = guild.roles.find("id", "374588610789507082");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 16) {
      let add_role = guild.roles.find("id", "374588619291230209");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 15) {
      let add_role = guild.roles.find("id", "372862062537474048");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 14) {
      let add_role = guild.roles.find("id", "372861876356251648");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 13) {
      let add_role = guild.roles.find("id", "374588598877683713");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 12) {
      let add_role = guild.roles.find("id", "374588338021203969");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 11) {
      let add_role = guild.roles.find("id", "374588446162812929");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 10) {
      let add_role = guild.roles.find("id", "374588451980574721");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 9) {
      let add_role = guild.roles.find("id", "372861823998885889");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 8) {
      let add_role = guild.roles.find("id", "374587945388343297");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 7) {
      let add_role = guild.roles.find("id", "374588354391441408");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 6) {
      let add_role = guild.roles.find("id", "372861774887649292");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 5) {
      let add_role = guild.roles.find("id", "372861723109228564");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 4) {
      let add_role = guild.roles.find("id", "374589274177273858");
      member.addRole(add_role).catch(console.error);
    }
    else if (skill_Tier === 3) {
      let add_role = guild.roles.find("id", "374587978737123328");
      member.addRole(add_role).catch(console.error);
    }
    AUTOupdateSQLskillTier(userID, skill_Tier);
  }).catch((errors) => {
    console.log("Error updating: " + playerName);
    // console.log(errors);
  });
};

// im ready
bot.on('ready', () => {
 console.log('Aegis Vainglory Bot, ready!');
});


bot.login("TOKEN GOES HERE");
