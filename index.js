const TelegramBot = require('node-telegram-bot-api');
var mysql = require("mysql2/promise");

const token = '618188164:AAEiVdGaCpgjYef62YKSfLyAO5dxJTvq6vk';

const hello = "Вас приветствует Smartchat Bot! Я буду Вашим проводником и помощником во время обучения по по английскому языку! Итак, давайте начнем наше знакомство! Прошу, скажите ваше имя:"


const bot = new TelegramBot(token, {polling: true});

var message = {
}
var user = {
    // chat_id: {
    //     firstname:0,
    //     lastname:0,
    //     email:0,
    //     phone:0,
    //     level:0
    // }
};

async function connect()
{
    let con = await mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"12345",
        database:"smartchat",
        insecureAuth: true
    });
    return con;
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, JSON.stringify(msg));
});

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        console.log("Cannot!")
        return;
    }
    var notfirst = await notExists(chatId, "firstname");
    var ischat_id = await isExists(chatId, "chat_id");
    var notlast = await notExists(chatId, "lastname");
    var notemail = await notExists(chatId, "email")
    var notphone = await notExists(chatId, "phone")
    var notlvl = await notExists(chatId, "lvl")

    // send a message to the chat acknowledging receipt of their message
    if (notfirst && ischat_id) {
        var firstname = msg.text
        insert(chatId, "firstname", firstname);
        bot.sendMessage(chatId, "Теперь, можно узнать вашу фамилию?");
        return;
    }
    if (notlast && !notfirst) {
        var lastname = msg.text
        insert(chatId, "lastname", lastname);
        bot.sendMessage(chatId, "Можете теперь отправить ваш имейл?");
        return;
    }
    if (notemail && !notlast) {
        var email = msg.text
        insert(chatId, "email", email);
        bot.sendMessage(chatId, "Можете теперь отправить ваш номер?");
        return;
    }
    if (notphone && !notemail) {
        var phone = msg.text
        insert(chatId, "phone", phone);
        bot.sendMessage(chatId, "Можете теперь отправить ваш уровень английского языка?");
        return;
    }
    if (notlvl && !notphone) {
        var level = msg.text
        insert(chatId, "lvl", lvl);
        bot.sendMessage(chatId, "Спасибо! Данные сохранены. Перейдем уже к определению вашей группы!");
        console.log(user[chatId]);
        return;
    }
});
bot.onText(/\/start/, async function (msg, match) {

    const chatId = msg.chat.id;
    // console.log("start");
    // console.log("Is exists?? ", isExists(chatId, "chat_id"));
    var check = await isExists(chatId, "chat_id");
    console.log(check);
    if (check) {
        //console.log("Exists!");
        bot.sendMessage(chatId, "Вы уже зарегистрированы!");  
        //updateNumber(0, chatId)
    } else {
        //console.log("Does not exist!");
        let db = await connect();
        let res = await db.query("INSERT INTO student (chat_id) VALUES (?)",[chatId])
        bot.sendMessage(chatId, hello);
        db.close();
        // console.log(sqlite.run('SELECT * FROM students'))
    }
 
});

// bot.on('polling_error', (error) => {
//     console.log(error.code);  // => 'EFATAL'
//   });

async function insert(chatId, item, value) {
    let db = await connect();
    var query = "UPDATE student SET " + item + " = '" + value + "' " + "WHERE chat_id = " + chatId + " ;"
    console.log("insert", query); 
    try {
        let res = await db.query(query);
    } catch (err) {
        console.log (err)
    }
    db.close();
}
async function notExists(chatId, item) {
    let res = await isExists(chatId, item);
    return (!res);
}
async function isExists(chatId, item) {
    let db = await connect();
    var query = "SELECT * FROM student WHERE chat_id = ? AND " + item + " IS NOT NULL";
    //console.log(query);
    var data = await db.query(query, [chatId]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    db.close();
    return (data[0].length>0);
}
// function handleResult(err, res) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     // console.log(res);
//     return res;
// }
function getInfo(chatId) {
    var data;
    sqlite.run("SELECT * FROM students WHERE `key` = ? LIMIT 1", [chatId], function(res) {
        console.log(res);
        data = res[0].number;
    });
    return data;
    //console.log(data[0]);
}
/*function getId(chatId) {
    var data;
    sqlite.run("SELECT * FROM students WHERE `key` = ? LIMIT 1", [chatId], function(res) {
        console.log(res);
        data = res[0].id;
    });
    return data;
}*/

function updateNumber(number, chatId) {
    var rows_modified = sqlite.update("students",{"number":number},{key:chatId}, function(res) {
        console.log("UPDATE: " + res)
    });   
}
function updateLateness(chatId, n) {
    var rows_modified = sqlite.update("students",{"late":n},{key:chatId}, function(res) {
        console.log("UPDATE: " + res)
    });   
}
// Listen for any kind of message. There are different kinds of
// messages.









function sendReminder(chatId) {
    if (isLate(chatId)) {
        bot.sendMessage(chatId, "The deadline is here! Are you ready?");
    }
}
function isLate(chatId) {
    var data;
    sqlite.run("SELECT * FROM students WHERE `key` = ? LIMIT 1", [chatId], function(res) {
        console.log(res);
        data = res[0].late;
    });
    return data==1;
}
