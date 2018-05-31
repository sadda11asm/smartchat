const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2/promise");
const axios = require("axios");
const http = require("http");
var debug = require('debug')('smart_telegram_bot:server');

const app = require('./app');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

// const express = require('express')
// var app = express()
const token = '618188164:AAEiVdGaCpgjYef62YKSfLyAO5dxJTvq6vk';
const hello = "Вас приветствует Smartchat Bot! Я буду Вашим проводником и помощником во время обучения по по английскому языку! Итак, давайте начнем наше знакомство! Прошу, скажите ваше имя:"
const bot = new TelegramBot(token, {polling: true});

// var port = normalizePort(process.env.PORT || '8080');
// app.set('port', port);
var message = {
}
var results = {
    // chat_id: {
    //    correct:5
    // }
};

var test = {
    //247532533:true
}
var chat = {
    //247532533:true
    //chat_id: true
}

var requests = {
    //chat_id: {
    //  group_type:fdsds;
        //queries:[{}]    
    //}
};

const update = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Имя"], ["Фамилия"], ["Номер"], ["Имейл"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
const lvlans = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Yes"], ["No"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
const lesson = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Групповые занятия"], ["Индивидуальные занятия"]],
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
        host: "192.168.1.102",
        user:"user",
        password:"mysql",
        // host:'localhost',
        // user:"root",
        // password: "12345",
        database:"smartchat",
        insecureAuth: true
    });
    return con;
}

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (chat[chatId]!=null && chat[chatId]==true) {
        await sendMessage(chatId, text);
        return;
    }
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

bot.onText(/\/request/, async function (msg, match) {
    const chatId = msg.chat.id;
    var check = await isExists(chatId, "chat_id");
    if (!check) {
        bot.sendMessage(chatId, "Пожалуйста для начала пройдите регистрацию по /start!");
        return;
    }
    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
        bot.sendMessage(chatId, "Ваша заявка уже присутствует в базе! Пожалуйста удалите предыдущую заявку по /delete и затем попробуйте снова!");
        return;
    }
    bot.sendMessage(chatId, "Итак, чтобы оставить заявку на групповые/индивидуальные занятия нужно будет заполнить кое-какую информацию: ");
    bot.sendMessage(chatId, "Какой вид занятий для вас будет удобен?", lesson).then(async function() {
        bot.once('message', async function (answer) {
            var res = answer.text;
            if (res=="Индивидуальные занятия") {
                requests[chatId]={}
                requests[chatId]["group_type"] = 1;
            } else {
                requests[chatId]={}
                requests[chatId]["group_type"] = 0;
            }
            bot.sendMessage(chatId, "Теперь введите пожалуйста все дни и все удобные промежутки времени когда Вам будет удобно заниматься, в следующем формате: \nПонедельник 18:00-20:00\nПонедельник 13:00-17:00\nВоскресенье 14:00-18:00 и т.д.\nЗаметьте, начало и конец промежутка времени только целое значение часов (формат 18:30 не разрешается)").then(async function() {
                bot.once('message', async function (answer2) {
                    var feedback="Ваша заявка принята! Добавлены следующие слоты удобоных для вас занятий:\n"
                    var res2 = answer2.text;
                    var arr = res2.split("\n");
                    for (var i=0;i<arr.length;i++) {
                        try{
                            var dayntime = arr[i].split(" ");
                            var time = dayntime[1].split("-");
                        } catch (err) {
                            bot.sendMessage(chatId, "Неверный формат заявки " + arr[i] + "! Подайте заявку заново!");
                        }
                        // try {
                        //     data = await db.query("SELECT start_time, finish_time from req WHERE student_id = ? AND nday = ?", [studentId, nday]);
                        //     var ans = data[0];
                        //     console.log(ans);
                        //     for (var i=0;i<ans.length;i++) {
                        //         var st = ans[i].start_time;
                        //         var fi = ans[i].finish_time;
                        //         console.log(st, fi);
                                
                        //     }
                        // } catch (err) {
                        //     console.log(err);
                        // }    
                        var response = await sendRequest(chatId,dayntime[0],time[0], time[1]);
                        feedback+=dayntime[0] + time[0]
                        if (response=="success"){
                            bot.sendMessage(chatId, "Ваша заявка принята! Добавлены следующие удобные слоты времени для занятий:\n" + arr[i]);
                            requests[chatId]["lessons"] = 1;
                        } else {
                            bot.sendMessage(chatId, "Неверный формат заявки " + arr[i] + "! Подайте заявку заново!");
                        }
                    }
                    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
                        bot.sendMessage(chatId,"Чтобы удалить заявку перейдите по /delete. Когда один из преподавателей добавит вас в свою группу мы Вам дадим знать!");
                    }
                })
            })
        })
    })
});
bot.onText(/\/test/, async function (msg, match) {
    const chatId = msg.chat.id;
    var check = await isExists(chatId, "chat_id");
    if (!check) {
        bot.sendMessage(chatId, "Пожалуйста для начала пройдите регистрацию по /start!");
        return;
    }
    if (test[chatId]!= null && test[chatId]==true) {
        bot.sendMessage(chatId, "Ваш уровень уже определен! Вы не можете повторно пройти уровневый тест!");
        return;
    }
    //must check whether he finished this test!
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
bot.onText(/\/delete/, async function(msg, match) {
    const chatId = msg.chat.id;
    var check = await isExists(chatId, 'chat_id');
    if (!check) {
        bot.sendMessage(chatId, "Пожалуйста для начала пройдите регистрацию по /start!");
        return;       
    }
    await deleteRequests(chatId);
    requests[chatId]={}
    bot.sendMessage(chatId, "Ваша заявка удалена! Можете отправить новую заявку по /request!")



})

bot.onText(/\/update/, async function(msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage (chatId, "Что вы хотите изменить?", update).then (async function () {
        bot.once('message',  async function (answer) {
            var res = answer.text;
            var item;
            if (res=="Имя") item = "firstname"
            if (res=="Фамилия") item = "lastname"
            if (res=="Номер") item = "phone"
            if (res=="Имейл") item = "email"
            bot.sendMessage(chatId, "Введите новое значение:").then (async function () {
                bot.once('message', async function (answer2) {
                    var res2 = answer2.text;
                    await updateInfo(chatId,item, res2);
                })
            })
        }) 
    })
})

async function updateInfo(chatId, item, val) {
    var db = await connect();
    var query = "UPDATE student SET " + item + " = '" + val + "' WHERE chat_id = " + chatId + ";"
    console.log(query);
    try {
        await db.query(query);
        await bot.sendMessage(chatId, "Успешно изменено!")
    } catch(err) {
        console.log(err);
    } finally {
        db.close();
    }
}
async function sendMessage(chatId, text) {
    var student_id = await getId(chatId);
    var group_id = await getGroup(chatId);

    //     axios.po('/192.168.1.102:3000/chat')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    await axios.post('http://192.168.1.102:3000/message', {
        text : text,
        group_id:group_id,
        student_id:student_id
    }).then(function(res) {
        console.log(res);
    }).catch(function(err) {
        console.log(err);
    })
}

async function deleteRequests(chatId) {
    var query = "DELETE FROM req WHERE student_id = ?";
    var db  = await connect();
    var student_id = await getId(chatId);
    try {
        await db.query(query, [student_id]);
    } catch (err) {
        console.log(err)
    } finally{
        db.close();
    }
}
async function getId(chatId) {
    var db = await connect();
    var data;
    try{
        data = await db.query("SELECT student_id from student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err)
        return "error";
    }
    var studentId = data[0][0].student_id;
    return studentId;
}
async function getGroup(chatId) {
    var db = await connect();
    var data;
    try{
        data = await db.query("SELECT group_id from student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err)
        return "error";
    }
    var groupId = data[0][0].group_id;
    return groupId;
}
async function sendRequest(chatId, day, startfull, finishfull) {
    //console.log(day, startfull,finishfull );
    var nday;
    try {
        var arr = startfull.split(":");
        var arr2 = finishfull.split(":");
    } catch  (err) {
        console.log(err);
        return "error";
    }
    var start = arr[0];
    var finish = arr2[0];
    if (start==finish) {
        return "error";
    }
    // switch (day) {
    //     case 'Понедельник': nday=1;
    //     case "Вторник": nday=2;
    //     case "Среда": nday=3;
    //     case "Четверг": nday=4;
    //     case "Пятница": nday=5;
    //     case "Суббота": nday=6; 
    //     default: nday=7;
    // }
    if (day=="Понедельник") nday =1;
    else if (day=="Вторник") nday =2;
    else if (day=="Среда") nday =3;
    else if (day=="Четверг") nday =4;
    else if (day=="Пятница") nday =5;
    else if (day=="Суббота") nday =6;
    else if (day=="Воскресенье") nday =7;
    else {
        return "error";
    }
    console.log(nday);
    var db = await connect();
    var data;
    try{
        data = await db.query("SELECT student_id from student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err)
        return "error";
    }
    var studentId = data[0][0].student_id;
    try{
        await db.query("INSERT INTO req (finish_time, start_time, student_id, nday) VALUES (?,?,?,?)",[finish, start,studentId, nday]);
    } catch(err) {
        console.log(err);
        return "error";
    }
    db.close();
    return "success";
}
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
    check = await isAudioExists(i);
    path = './audios/' + i + '.mp3'
    if (check) {
        let b =await bot.sendAudio(chatId, path);
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
                bot.sendMessage(chatId, "Теперь отправьте заявку для записи на групповое либо индивидуальное занятие  с помощью /request. Ввм нужно будет заполнить удобные для вас дни и время! ")
                test[chatId]=true;
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
    var arr= data[0][0].ans.split("%%");
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

async function isAudioExists(i) {
    let db = await connect();
    var query = "SELECT * FROM test1 WHERE quest_id = ? AND audio IS NOT NULL";
    //console.log(query);
    var data = await db.query(query, [i]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    db.close();
    return (data[0].length>0);
}




function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  

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


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);