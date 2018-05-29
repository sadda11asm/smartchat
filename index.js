const TelegramBot = require('node-telegram-bot-api');
var mysql = require("mysql2/promise");

const token = '618188164:AAEiVdGaCpgjYef62YKSfLyAO5dxJTvq6vk';

const hello = "Вас приветствует Smartchat Bot! Я буду Вашим проводником и помощником во время обучения по по английскому языку! Итак, давайте начнем наше знакомство! Прошу, скажите ваше имя:"


const bot = new TelegramBot(token, {polling: true});

var message = {
}
var results = {
    // chat_id: {
    //    correct:5
    // }
};

const lvlans = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Yes"], ["No"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
const lvldetect = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Beginner"], ["Elementary"], ["Pre-Intermediate"], ["Intermediate"], ["Upper-Intermediate"], ["Advanced"], ["Mastery"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};

const begin = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Hello!"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
async function connect(){
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
    var notlvl = await notLevel(chatId)

    console.log("notlvl", notlvl);

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
        var text1 =  "Спасибо! Теперь нужно определить ваш уровень английского языка если вы его не знаете. Знаете ли вы свой уровень английского языка?"
        bot.sendMessage(chatId,text1, lvlans).then(() => {
            bot.once('message', (answer) => {
               //Code never executed when there are lots of people       
               var res = answer.text;
                     if (res == "No"){
                         var text2 = "Тогда давайте пройдем тест! Как будете готовы, отправьте /test и приготовьтесь к ответу на 30 вопросов! Будет дан только 1 шанс, так что уделите на это должное количество времени! Удачи!"
                        bot.sendMessage(chatId, text2) 
                        return;
                      }else if (res == "Yes"){
                            bot.sendMessage(chatId, "Выберите из списка:", lvldetect).then(() => {
                                bot.once('message', (ans) => {
                                    var res = ans.text;
                                    switch(res) {
                                        case "Beginner" : insert(chatId, "lvl", 1);
                                        case "Elementary" : insert(chatId, "lvl", 2);
                                        case "Pre-Intermediate" : insert(chatId, "lvl", 3);
                                        case "Intermediate" : insert(chatId, "lvl", 4);
                                        case "Upper-Intermediate" : insert(chatId, "lvl", 5); 
                                        case "Advanced" : insert(chatId, "lvl", 6);
                                        case "Mastery" : insert(chatId, "lvl", 7);
                                    }
                                });
                            })
                      }
             });
       });
        return;
    }/*
    if (notlvl && !notphone) {
        var lvl = msg.text

        insert(chatId, "lvl", lvl);
        bot.sendMessage(chatId, "Спасибо! Данные сохранены. Перейдем уже к определению вашей группы!");
        console.log(user[chatId]);
        return;
    }*/
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
        try {
            let res = await db.query("INSERT INTO student (chat_id, lvl) VALUES (?, ?)",[chatId, 8]);
        } catch (err) {
            console.log(err)
        }
        bot.sendMessage(chatId, hello);
        db.close();
        // console.log(sqlite.run('SELECT * FROM students'))
    }
 
});

bot.onText(/\/test/, async function (msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Итак, давайте начнем!");
    bot.sendMessage(chatId, "Hello!", begin).then(() => {
        bot.once('message', (answer) => {
            //Code never executed when there are lots of people       
            var res = answer.text;
            if (res=="Hello!") {
                bot.sendMessage(chatId, "Do you speak English?", lvlans).then(async function () {
                    bot.once('message', async function (answer2) {
                        var res2 = answer2.text;
                        if (res2=="Yes") {
                            bot.sendMessage(chatId, "Great!");
                            let res = await sendQuestion(1, chatId);
                        } else {
                            bot.sendMessage(chatId, "No problem! We will teach you! So, let's start out test.")
                            let res = await sendQuestion(1, chatId);
                        }
                    })
                })
            }
        });
   });
})
// bot.on('polling_error', (error) => {
//     console.log(error.code);  // => 'EFATAL'
//   });

const choice = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["A"], ["B"], ["C"], ["D"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
async function sendQuestion(i, chatId) {
    var data = await getQuestion(i);
    var variants = await getVariants(i)
    let a = await bot.sendMessage(chatId, data);
    var path = './photos/' + i + '.png'
    var check = await isPhotoExists(i);
    if (check) {
        let b = await bot.sendPhoto(chatId, path);
    }
    console.log(path);
    bot.sendMessage(chatId, variants, choice).then(async function () {
        bot.once('message', async function (answer) {
            var res = answer.text;
            var check = await checkAnswer(i, res);
            if (i==1) {
                results[chatId]={};
                results[chatId].correct = 0;
            }
            if (check) {
                results[chatId]["correct"]++;
            }
            if (i<4) {
                sendQuestion(i+1, chatId);
            } else {
                bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                let result = results[chatId]["correct"];
                results[chatId] = null;
                bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + i);
                let lvl = await getLevel(chatId, result, i);
                bot.sendMessage(chatId, "Ваш уровень: " + lvl);
            }
        })
    })
    return "yes";
}

async function getVariants(i) {
    db = await connect();
    let data;
    try {
        data = await db.query("SELECT variants as ans FROM test1 WHERE quest_id = ?;", [i]);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    var arr= data[0][0].ans.split("$");
    var ans = "\n";
    for (var i=0;i<arr.length;i++) {
        ans += (i+1) + " " + arr[i]+"\n";
    }
    db.close();
    return ans;
}

async function getLevel(chatId, res, num) {
    var percent = res * 100 *1.0/num;
    var ans;
    var set;
    if (percent>=95) {
        ans = "Advanced";
        set=6;
    } else if (percent>=85){
        ans = "Upper-Intermediate"
        set=5;
    } else if (percent>=75) {
        ans = "Intermediate";
        set=4;
    } else if (percent>=65) {
        ans = "Pre-Intermediate";
        set=3;
    } else if (percent>=55) {
        ans = "Elementary";
        set=2;
    } else {
        ans = "Beginner";
        set=1;
    }
    await setLevel(chatId,set);
    return ans;
} 

async function setLevel(chatId, set) {
    var db = await connect();
    let query = "UPDATE student SET lvl = " + set + " WHERE chat_id = " + chatId +";"
    console.log(query);
    await db.query(query);
    db.close();
}
async function getQuestion(i) {
    db = await connect();
    let data;
    try {
        data = await db.query("SELECT quest_title as ans FROM test1 WHERE quest_id = ?;", [i]);
        //console.log(data);
    } catch (err) {
        console.log(err);
    }
    var arr="";
    arr+= i + "th question:\n" + data[0][0].ans;
    db.close();
    return arr;
}
async function checkAnswer(i, res) {
    var db = await connect();
    let data;
    try{
        data  = await db.query("SELECT correct as ans FROM test1 WHERE quest_id = ?;", [i]);
        //console.log(data[0][0]);
    } catch (err) {
        console.log(err);
    }
    var ans = data[0][0].ans;
    db.close();
    if (ans==res) {
        return true;
    }                   
    return false;
}
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
async function notLevel(chatId) {
    let db = await connect();
    var query = "SELECT * FROM student WHERE chat_id = ? AND lvl = 8";
    //console.log(query);
    var data = await db.query(query, [chatId]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    db.close();
    return (data[0].length>0);
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
async function isPhotoExists(i) {
    let db = await connect();
    var query = "SELECT * FROM test1 WHERE quest_id = ? AND photo IS NOT NULL";
    //console.log(query);
    var data = await db.query(query, [i]);
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
