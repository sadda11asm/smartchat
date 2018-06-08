const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2/promise");
const axios = require("axios");
const http = require("http");
const cron = require('cron');
var fs = require('fs');

var debug = require('debug')('smart_telegram_bot:server');
var express = require('express');

var app = express();
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/photos', express.static('./photos'))
app.use('/audios',express.static('./audios')) 

  
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

app.get('/', function(req, res) {
    res.send('Hello!');
});
// const express = require('express')`
// var app = express()
const token = '618188164:AAEiVdGaCpgjYef62YKSfLyAO5dxJTvq6vk';
const hello = "Вас приветствует Smartchat Bot! Я буду Вашим проводником и помощником во время обучения по по английскому языку! Итак, давайте начнем наше знакомство! Прошу, скажите ваше имя:"
const bot = new TelegramBot(token, {polling: true});

// var port = normalizePort(process.env.PORT || '8080');
// app.set('port', port);

var tariffs = "Выберите интересующий Вас тариф:\nТариф 1 - Бесплатный пробный урок. Стоимость: 0 тенге.\nТариф 2 - Безлимит 3/7. Посещение: 12 дней в месяц. Изучение английского языка в любое удобное время в течении дня 12 дней в месяц. Стоимость: 20000 тенге.\nТариф 3 - Безлимит 6/7. Посещение: 24 дня в месяц. Изучение английского языка в любое удобное время в течении дня 24 дней в месяц. Стоимость: 35000 тенге.\nТариф 4 - Индивидуально. Посещение: 12 занятий в месяц. Изучение английского языка 3 раза в неделю, в строго обозначенное время. Стоимость: 12000 тенге.\nТариф 5 - Групповое обучение 'Express Grammar'. Посещение: 12 занятий в месяц. Изучение грамматики английского языка в группах. Стоимость: 5000 тенге.\nТариф 6 - Групповое обучение 'English Mix'. Обучение английскому языку сотрудников компаний, в соответствии с поставленной задачей. Стоимость: 7000 тенге.\n Тариф 7 - Подготовка к IELTS TOEFL. Безлимит 3/7. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение в любое удобное время в течении дня 12 дней в месяц. Стоимость: 38500 тенге.\nТариф 8 - Индивидуальная рассылка. Посещение: 12 занятий в месяц. Индивидуальная рассылка материала для самоподготовке по сверхэффективной методике. Стоимость: 2000 тенге.\nТариф 9 - Подготовка к IELTS TOEFL Индивидуально. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение 1 час, в строго отведенное время. Стоимость: 32500 тенге."
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

var freerequests = {
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
        inline_keyboard: [[{text: 'Тариф 1',callback_data: '1'}],[{text: "Тариф 2",callback_data: '2'}],[{text: 'Тариф 3',callback_data: '3'}],[{text: 'Тариф 4',callback_data: '4'}],[{text: 'Тариф 5',callback_data: '5'}],[{text: 'Тариф 5',callback_data: '5'}],[{text: 'Тариф 6',callback_data: '6'}],[{text: 'Тариф 7',callback_data: '7'}],[{text: 'Тариф 8',callback_data: '8'}],[{text: 'Тариф 9',callback_data: '9'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
};

const confirm_teacher = {
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Yes',callback_data: 'teacher_yes'}],[{text: "No",callback_data: 'teacher_no'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
};
const opts = {
    parse_mode: "Markdown",
    reply_markup: {
        force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
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

bot.onText(/\/editable/, function onEditableText(msg) {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Edit Text',
               // we shall check for this value when we listen
               // for "callback_query"
              callback_data: 'edit'
            }
          ],
          [
              {
                  text: "Tarif 1",
                  callback_data: '1'
              }
          ]
        ]
      }
    };
    bot.sendMessage(msg.from.id, 'Original Text', opts);
  });
  
  
  // Handle callback queries
  bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    var db = await connect();
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    var chatId = opts.chat_id;
    let text;
    if (action>='0' && action <='9') {
        bodyRequest(opts.chat_id, action);
        requests[opts.chat_id]["rate_id"] = action; 
        // console.log("ENTERED 2");
        bot.editMessageText("Вы выбрали Тариф " + action + '!', opts);
    }
    if (requests[opts.chat_id]["teacher"]!=null && requests[opts.chat_id]["teachers"]!=null) {
        console.log(requests);
        console.log(chatId);
        var teachers = requests[chatId]["teachers"];
        var i = requests[chatId]["teacher"];
        var rate_id = requests[chatId]["rate_id"];
        if (action == 'next') {
            await sendRequest(opts.chat_id, i+1);
            return;
        } else if (action== 'yes'){
            var studInfo = await db.query("SELECT lvl, student_id FROM student where chat_id = ?", [chatId]);
            var info = await db.query("SELECT login FROM teacher where teacher_id = ?", [teachers[i]["teacher_id"]]);
            // console.log(teachers[i]["teacher_id"]);
            var login = info[0][0]["login"];
            // console.log(login);
            var studLvl = studInfo[0][0]["lvl"];
            var studentId = studInfo[0][0]["student_id"];
            await db.query("INSERT INTO req (finish_time, start_time, student_id, nday, rate_id, teacher_id) VALUES (?,?,?,?,?,?)",[teachers[i]["finish_time"], teachers[i]["start_time"],studentId, teachers[i]["nday"], rate_id, teachers[i]["teacher_id"]]);
            requests[chatId]["lessons"] = 1;
            await sendNotice(chatId);
            bot.editMessageText("Вы выбрали преподавателя с ником " + login + '!', opts);
        } else {
            await bot.sendMessage(opts.chat_id, "Неправильный ввод! Повторите заявку по /request");
        }
    }
    db.close();
    // bot.sendMessage(opts.chat_id, text);
  });
  

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    // console.log("\n\n");
    // console.log(msg);
    const text = msg.text;
    var photo;
    var audio;
    var document;
    var content;
    var title;
    var fromChat = msg.chat.id;
    var messageId = msg.message_id;
    var fileId = null;
    var caption = msg.caption;

    var video;

    if (text === "/pay" || text === "/start" || text === "/update" ||  text === "/test" ||  text === "/request" ||  text === "/exit") {
        console.log("Cannot!")
        return;
    }

    try{
        if (text!=null) {
            content = text;
            title = text;
        } else {
           // console.log("Not Text");
        }
    } catch(err) {
       // console.log("Not Text");
    }

    if (msg.photo) {
        photo = msg.photo[3]["file_id"];
        fileId = photo;
         var path = await getPath(photo);
        content = path;
        console.log("photo")
    }
    if (msg.voice) {
        audio = msg.voice["file_id"];
        fileId = audio;
        console.log(audio);
        content = await getPath(audio);
    } 
    if (msg.document) {
        document = msg.document["file_id"];
        fileId = document;
        content = await getPath(document);
        console.log("doc")
    } 
    if (msg.video) {
        video = msg.video["file_id"];
        console.log("video")
        fileId = video;
        content = await getPath(video);
    } 
    var type;
    if (text!=null) {
        type = 0;
    }
    if (photo!=null) {
        type = 1;
    }
    if (audio!=null) {
        type = 2;
    }
    if (document!=null) {
        type = 3;
    }
    if (video!=null){
        type = 4;
    }
    console.log(type);
    var database = await connect();
    var stream;
    try {
        stream = await database.query("SELECT stream, student_id, group_id FROM student WHERE chat_id = ?", [chatId]);
        if (stream[0][0]["stream"]!=null && stream[0][0]["stream"]==1) {
            await database.query("INSERT INTO chat (group_id, sender_id, content, type) VALUES (?, ?, ?, ?)", [stream[0][0]["group_id"], stream[0][0]["student_id"], content, type]);
        }//console.log(stream);
    } catch (err) {
        // console.log  (err);
    } finally {
        database.close();
    }
    //console.log(stream + " sdfdsf");
    if (stream[0][0]["stream"]!=null && stream[0][0]["stream"] ==1) {
        // console.log(content);

        await sendMessage(chatId, content, type, fromChat, messageId, fileId, caption, title);
        return;
    }
    
    var notfirst = await notExists(chatId, "firstname");
    var ischat_id = await isExists(chatId, "chat_id");
    var notlast = await notExists(chatId, "lastname");
    var notemail = await notExists(chatId, "email")
    var notphone = await notExists(chatId, "phone")
    var notlvl = await notLevel(chatId)

    //  console.log("notlvl", notlvl);

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
                                        if (res=="Beginner") insert(chatId, "lvl", 1);
                                        if (res=="Elementary") insert(chatId, "lvl", 2);
                                        if (res=="Pre-Intermediate") insert(chatId, "lvl", 3);
                                        if (res=="Intermediate") insert(chatId, "lvl", 4);
                                        if (res=="Upper-Intermediate") insert(chatId, "lvl", 5); 
                                        if (res=="Advanced") insert(chatId, "lvl", 6);
                                        if (res=="Mastery") insert(chatId, "lvl", 7);
                                    bot.sendMessage(chatId, "Отлично! Ваш уровень записан успешно! Теперь отправьте заявку для записи на групповое либо индивидуальное занятие  с помощью /request. Ввм нужно будет заполнить удобные для вас дни и время! ")
                                    test[chatId]=true;
                                });
                            })
                      }
             });
       });
        return;
    }
    // if (notlvl && !notphone) {
    //     var lvl = msg.text

    //     insert(chatId, "lvl", lvl);
    //     bot.sendMessage(chatId, "Спасибо! Данные сохранены. Перейдем уже к определению вашей группы!");
    //     console.log(user[chatId]);
    //     return;
    // }
});


bot.onText(/\/pay/, async function (msg, match) {
    bot.sendInvoice(msg.chat.id, "Title", "Description", "foo", "381764678:TEST:5737", 'foo', 'RUB', [{label: "Lessons", amount: '10000'}])
        .then( (res) => {
            console.log("\n\norder:")
            console.log(res);
            bot.sendMessage(msg.chat.id, "ok");
        })
        .catch( (error) => {
            console.log(error);
        })
});

bot.on('pre_checkout_query', (checkout) => {
    console.log("\n***\npre hceck out");
    console.log(checkout);
    try {
        bot.answerPreCheckoutQuery(checkout.id, true);
    } catch (ex) {
        console.log("\n");
        console.log(ex);
    }
    
})

bot.on('successful_payment', (ctx) => {
    console.log("\n\nsuccess:");
    console.log(ctx);
})

bot.onText(/\/start/, async function (msg, match) {

    const chatId = msg.chat.id;
    // console.log("start");
    // console.log("Is exists?? ", isExists(chatId, "chat_id"));
    var check = await isExists(chatId, "chat_id");
    //console.log(check);
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
        await setAva(chatId); 
        // console.log(sqlite.run('SELECT * FROM students'))
    }
 
});

async function once(payload) {
    try {
    // console.log("fdddsf");
        return new Promise( (resolve, reject) =>{
            try {
                // console.log("fdsfd");
                const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg  => {
                    bot.removeReplyListener(replyListenerId);
                    resolve(msg);
                })
            } catch (err) {
                reject(err);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

bot.onText(/\/request/, async function (msg, match) {
    // var chatId = msg.chat.id;
    /*try {
        var payload = await bot.sendMessage(chatId, "Dai otvet");
        var res = await once(payload);
        console.log(res.text);
    } catch (err) {
        console.log(err);
    }*/
    const chatId = msg.chat.id;
    var check = await isExists(chatId, "chat_id");
    if (!check) {
        bot.sendMessage(chatId, "Пожалуйста для начала пройдите регистрацию по /start!");
        return;
    }
    var db = await connect();
    try {
        group = await db.query("SELECT COUNT(*) as cnt FROM student WHERE group_id > 0 AND chat_id = ?", [chatId]);
        check = group[0][0]["cnt"]>0;
        console.log(check)
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
    if (check) {
        bot.sendMessage(chatId, "Вы уже состоите в одной из групп! Для того чтобы выйти из существующей группа вам нужно пройти по /exit . Однако имейте ввиду что в этом случае вам нужно будет подать заявку и ждать согласие преподавателя заново. (Ваша действующая оплата на количество уроков остается неизменна) ");
        return;
    }
    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
        bot.sendMessage(chatId, "Ваша заявка уже присутствует в базе! Пожалуйста удалите предыдущую заявку по /delete и затем попробуйте снова!");
        return;
    }
    await bot.sendMessage(chatId, "Итак, чтобы оставить заявку на групповые/индивидуальные занятия нужно будет заполнить кое-какую информацию: ");
    await bot.sendMessage(chatId, tariffs, lesson);
        // .then(payload => {
        //     bot.onReplyToMessage(payload.chat.id, payload.message_id, msg  => {
        //         // bot.removeReplyListener(replyListenerId);
        //         console.log(msg);
        //     })
        // })
       
                // bot.removeReplyListener(replyListenerId)
    // return;
        // var answer = await once(payload);
    // console.log(answer);    
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
    // await axios.post('http://192.168.1.102:3000/message', {
    //             notice: 1,
    //             student_id: student_id
    //         }).then(function(res) {
    //             //console.log(res);
    //         }).catch(function(err) {
    //             console.log(err);
    //         })
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
bot.onText(/\/exit/, async function (msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage (chatId, "Вы уверены что хотите выйти из вашей группы?", lvlans).then (async function () {
        bot.once('message', async function (answer) {
            var res = answer.text;
            if (res=="No") {
                bot.sendMessage(chatId, "Отлично. Данные не изменены!")
                return;
            }
            if (res=="Yes"){
                if (requests[chatId]) {
                    requests[chatId]["group_type"] = null;
                    requests[chatId]["lessons"] = null
                }
                await deleteGroup(chatId);
                var nles = await getNLes(chatId);
                await bot.sendMessage(chatId, "Теперь вы не состоите ни в одной из групп и у вас не имеются заявок на обучение. Для того чтобы начать обучение подайте заявку заново по /request! Количество оплаченных уроков на данный момент : " + nles);
            } 
        })
    })
})

async function bodyRequest(chatId, action) {
    if (action=='1' || action=='2' || action=='3' || action=='4' || action=='7' || action=='8' || action=='9' ) {
        //console.log("individual")
        requests[chatId]={}
        requests[chatId]["group_type"] = 1;
    } else if (action=='5' || action=='6'){
        requests[chatId]={}
        requests[chatId]["group_type"] = 0;
    } else {
        bot.sendMessage(chatId, "Не правильно введен тип занятий! Пожалуйта, подайте заявку заново!");
        return;
    }
    var free;
    if (action=='1') {
        free = 1;
    } else {
        free = 0;
    }
    var payload = await bot.sendMessage(chatId, "Теперь введите пожалуйста все дни и все удобные промежутки времени когда Вам будет удобно заниматься, в следующем формате: \nПонедельник 18:00-20:00\nПонедельник 13:00-17:00\nВоскресенье 14:00-18:00 и т.д.\nЗаметьте, начало и конец промежутка времени только целое значение часов (формат 18:30 не разрешается)", opts);
    var answer = await once(payload);
    var feedback="Вы добавили следующие слоты удобоных для вас занятий:\n"
    var res = answer.text;
    var arr = res.split("\n");
    var responses = [];
    for (var j=0;j<arr.length;j++) {
        try{
            var dayntime = arr[j].split(" ");
            var time = dayntime[1].split("-");
        } catch (err) {
            await bot.sendMessage(chatId, "Неверный формат заявки " + arr[j] + "! Подайте заявку заново!");
            console.log(err);
            return;
        }    
        var response = await getRequest(chatId,dayntime[0],time[0], time[1], requests[chatId]["group_type"], free); 
        responses.push(response);
        feedback+=dayntime[0] + time[0]
        if (response!="error"){
            await bot.sendMessage(chatId, "Вы добавили следующий удобный слот времени для занятий:\n" + arr[j]);
        } else { 
            await bot.sendMessage(chatId, "Неверный формат заявки " + arr[j] + "! Подайте заявку заново!");
            // console.log("de");
            return;
        }
    }
    await bot.sendMessage(chatId, "На основании вашего желанного времени занятий вам подобраны преподавателя по режиму работы. Теперь выберете с кем вы хотите заниматься:");
    var teachers = await proposeTeacher(chatId, responses);
    // console.log(teachers);
    requests[chatId]["teachers"] = teachers;
    // console.log(requests[chatId]["teachers"]);
    //console.log("teachers :", teachers);
    await sendRequest(chatId, 0);
}
async function sendNotice(chatId) {
    var db = await connect();
    var info = await db.query("SELECT student_id FROM student WHERE chat_id = ?", [chatId]);
    var student_id = info[0][0]["student_id"];
    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
        console.log("deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        await axios.post('http://192.168.1.102:3000/message', {
                notice: 1,
                student_id: student_id
            }).then(function(res) {
                //console.log(res);
            }).catch(function(err) {
                console.log(err);
            })
        await bot.sendMessage(chatId,"Чтобы удалить заявку перейдите по /delete. Когда один из преподавателей добавит вас в свою группу мы Вам дадим знать!");
    } else {
        await bot.sendMessage(chatId,"Не нашлось больше преподавателей на ваше время либо Вы не выбрали не одного преподавателя из возможных! Пожалуйста подайте заявку еще раз и выберете вашего преподавателя!");
    }
    requests[chatId]["teacher"] = null;
}
async function sendRequests(chatId,studentId, rate_id, studLvl, teachers) {
    // await database.close();
}
async function sendRequest(chatId, i) {
    var teachers = requests[chatId]["teachers"];
    requests[chatId]["teacher"] = i;
    console.log(requests);
    if (i==teachers.length) {
        // console.log("ENTERED");
        await sendNotice(chatId);
        return;
    }
    var database = await connect();
    var studInfo = await database.query("SELECT lvl, student_id FROM student where chat_id = ?", [chatId]);
    var studLvl = studInfo[0][0]["lvl"];
    var studentId = studInfo[0][0]["student_id"];
    var info = await database.query("SELECT login, lvl FROM teacher where teacher_id = ? ", [teachers[i]["teacher_id"]]);
    var lvl = info[0][0]["lvl"];
    var login = info[0][0]["login"];
    // await sendRequest(chatId,studentId, rate_id, lvl, studLvl, login, i, teachers);
    if (lvl>studLvl) {
        await bot.sendMessage(chatId, "Преподаватель с ником: " + login + "\n Уровень: " + lvl,
        {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [[{text: 'Yes',callback_data: "yes"}],[{text: "No",callback_data: 'next'}]]
                // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
                // force_reply: true
                // resize_keyboard: true,
                // one_time_keyboard: true,
            },
        });
    }    
}
async function proposeTeacher(chatId, req) {
    var teachers = [];
    var db = await connect();
    try {
        // var data = await db.query("SELECT student_id FROM student WHERE chat_id = ?", [chatId]);
        var studentId = req[0]["student_id"];
        // var req = await db.query("SELECT start_time, finish_time, nday FROM req where student_id = ?", [studentId]);
        for (var ind = 0; ind<req.length;ind++) {
            var left = req[ind]["start_time"];
            var right = req[ind]["finish_time"];
            var day = req[ind]["nday"];
            
            var info = await db.query("SELECT teacher_id,nday, start_time, finish_time FROM graph WHERE teacher_id >0", [teacherId]);
            for (var j = 0;j<info[0].length;j++) {
                var nday = info[0][j]["nday"];
                if (nday==day) {
                    var start = info[0][j]["start_time"];
                    var finish = info[0][j]["finish_time"];
                    if (start>=right || finish<=left) {
                        continue;
                    } else {
                        var de = {}
                        var teacherId = info[0][j]["teacher_id"];
                        de["teacher_id"] = teacherId;
                        de["start_time"] = Math.max(start, left);
                        de["finish_time"] = Math.min(right, finish);
                        de["nday"] = day;
                        teachers.push(de);
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
    db.close();
    return teachers;
}

async function getNLes(chatId) {
    var db = await connect();
    var nles;
    try {
        var data = await db.query("SELECT nles FROM student WHERE chat_id = ?", chatId);
        nles = data[0][0]["nles"];
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
        return nles;
    }
}
async function deleteGroup(chatId) {
    var db = await connect();
    try {
        var group = await db.query("SELECT group_id, student_id FROM student WHERE chat_id = ?", [chatId]);
        var groupId = group[0][0]["group_id"];
        var studentId = group[0][0]["student_id"];
        var groupInfo = await db.query("SELECT teacher_id, group_name FROM gr WHERE group_id = ?", groupId);
        var groupName = groupInfo[0][0]["group_name"];
        var teacherId = groupInfo[0][0]["teacher_id"];

        await db.query("UPDATE student SET group_id = 0 WHERE chat_id = ?", [chatId]);
        var data = await db.query("SELECT group_id from gr where group_id not in (select group_id from student)");
        //console.log(data[0])
        var deleted = false;
        for (var i=0;i<data[0].length;i++) {
            await db.query("DELETE FROM chart where group_id = ?", [data[0][i]["group_id"]]);
            await db.query("DELETE FROM gr where group_id = ?", [groupId]);
            if (data[0][i]["group_id"]==groupId) {
                deleted = true;
            }
        }
        await sendNotification(studentId, groupId, groupName, teacherId, deleted);

    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
}

async function sendNotification(studentId, groupId, groupName, teacherId, deleted) {
    await axios.post('http://192.168.1.102:3000/message', {
        notice: 2,
        student_id: studentId,
        deleted : deleted,
        group_id : groupId,
        group_name:groupName,
        teacher_id:teacherId
    }).then(function(res) {
        console.log(res);
    }).catch(function(err) {
        console.log(err);
    })
}

async function getPath(file_id) {
    var path = "";
    //console.log('https://api.telegram.org/bot' + token + "/getFile?file_id=" + file_id);
    await axios.get('https://api.telegram.org/bot' + token + "/getFile?file_id=" + file_id)
    .then (async function(response) {
        //console.log(response.data);
        var res=response.data;
        
        // var res = JSON.stringify(response);
        path = "https://api.telegram.org/file/bot" + token + "/" + res["result"]["file_path"];
    })
    .catch(async function(err) {
        console.log(err);
    })
    return path;
}

async function updateInfo(chatId, item, val) {
    var db = await connect();
    var query = "UPDATE student SET " + item + " = '" + val + "' WHERE chat_id = " + chatId + ";"
    //console.log(query);
    try {
        await db.query(query);
        await bot.sendMessage(chatId, "Успешно изменено!")
    } catch(err) {
        console.log(err);
    } finally {
        db.close();
    }
}

async function getMessage(notice, chatId, text, groupId) {
    requests[chatId]={}
    await bot.sendMessage(chatId, text);
    if (notice==3) {
        return;
    }
    var chart = "Расписание ваших занятий:\n"
    var db = await connect();
    try {
        var data = await db.query("SELECT * FROM chart where group_id = ? ORDER BY day", groupId);
        for (var i = 0;i<data[0].length;i++) {
            var info = data[0][i]; 
            var dayfull = info["day"].toString();
            //console.log(dayfull)
            var day = dayfull.split(" ");
            chart+="День " + (i+1) + ": " + day[0] + " " + day[1] + " " + day[2] + " Время: " + info["start_time"] + ":00-" + info["finish_time"] + ":00\n";
        }
        chart+="Заметьте что первый урок у вас бесплатный! В последствии придется оплатить за 1 час до начала второго урока! В противном случае доступ к уроку будет закрыт! ";
        //console.log(data);
        bot.sendMessage(chatId, chart);
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
}
async function sendMessage(chatId, content, type, fromChat, messageId, fileId, captio, title) {
    var student_id = await getId(chatId);
    var group_id = await getGroup(chatId);

    var db = await connect();
    try {
        var nameInfo = await db.query("SELECT firstname, lastname FROM student WHERE chat_id = ?", [chatId]);
        var name = nameInfo[0][0]["firstname"] + " " + nameInfo[0][0]["lastname"];
        var students = await db.query("SELECT chat_id FROM student WHERE group_id = ? AND chat_id <> ?", [group_id, chatId]);
        for (var i=0;i<students[0].length;i++) {
            var chatS = students[0][i]["chat_id"];

            console.log("send message type: "+type);

            if (type == 0) {
                await bot.sendMessage(chatS, name + ':\n' + content);
            }
            if (type==1) {
                try {
                    console.log(content);
                    // await bot.sendMessage(chatS, name + ':');
                    await bot.sendPhoto(chatS, fileId, { caption: name+": "+caption });
                } catch (err) {
                    console.log(err);
                }
            }

            if (type == 2) {
                console.log("HEREEEEEEEEEE")
                // await bot.sendMessage(chatS, name + ':');
                console.log(fileId);
                try{
                    await bot.sendVoice(chatS, fileId, { caption: name+": "+caption });
                } catch (es) {
                    console.log(es);
                }
                
            }
            if (type == 3) {
                //TO DO
                //bot.send
                // await bot.sendMessage(chatS, name + ':');
                await bot.sendDocument(chatS, fileId, { caption: name+": "+caption });
            }
            if (type == 4) {
                // await bot.sendMessage(chatS, name + ':');
                await bot.sendVideo(chatS, fileId, { caption: name+": "+caption });
                //bot.forwardMessage(chatS, fromChat, messageId);
            }
        }
    } catch (err) {
        //console.log(err);
    } finally {
        db.close();
    }



    await axios.post('http://192.168.1.102:3000/message', {
        notice: 0,
        content : content,
        type: type,
        group_id:group_id,
        student_id:student_id,
        title: title
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
    } finally {
        db.close();
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
    } finally {
        db.close();
    }
    var groupId = data[0][0].group_id;
    return groupId;
}
async function getRequest(chatId, day, startfull, finishfull, type, free) {
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
    console.log(start, finish);
    if (start<0 || start >24) {
        return "error";
    }
    if (start>=finish) {
        return "error";
    }
    if (day=="Понедельник") nday =1;
    else if (day=="Вторник") nday =2;
    else if (day=="Среда") nday =3;
    else if (day=="Четверг") nday =4;
    else if (day=="Пятница") nday =5;
    else if (day=="Суббота") nday =6;
    else if (day=="Воскресенье") nday =0;
    else {
        console.log(day);
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
    try {
        data = await db.query("SELECT start_time, finish_time from req WHERE student_id = ? AND nday = ?", [studentId, nday]);
        var ans = data[0];
        if (data[0][0]=={}) {
            var req = {};
            try{
                req["student_id"] = studentId;
                req["finish_time"] = finish;
                req["start_time"] = start;
                req["nday"] = nday;
                req["type"] = type;
                req["free"] = free;
            } catch(err) {
                console.log(err);
                return "error";
            }
            db.close();
            return req;
        }
        console.log(ans);
        for (var i=0;i<ans.length;i++) {
            var st = ans[i].start_time;
            var fi = ans[i].finish_time;
            if (start>st && start<fi) {
                db.close();
                console.log(st);
                return "error";
            }
            if (finish>st && finish<fi) {
                db.close();
                console.log("err");
                return "error";
            }
        }
    } catch (err) {
        console.log(err);
    }
    var req = {};
    try{
        req["student_id"] = studentId;
        req["finish_time"] = finish;
        req["start_time"] = start;
        req["nday"] = nday;
        req["type"] = type;
        req["free"] = free;
    } catch(err) {
        console.log(err);
        return "error";
    }
    db.close();
    return req;
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
    //check = await isAudioExists(i);
    //path = './audios/' + i + '.mp3'
    // if (check) {
    //     let b =await bot.sendAudio(chatId, path);
    // }
    // console.log(path);
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
                bot.sendMessage(chatId, "Теперь вам предоставляется возможность на бесплатный урок. Отправьте заявку для записи на бесплатное групповое либо индивидуальное занятие  с помощью /freeLesson. Вам нужно будет заполнить удобные для вас дни и время! ")
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

async function setAva(chatId) {
    var user_profile = await bot.getUserProfilePhotos(chatId).then (async function(res) {
        var photo_id = res.photos[0][0].file_id;
        var photo = await bot.getFile(photo_id).then( async function (result) {
            var db = await connect();
            var file_path = result.file_path;
            var photo_url = `https://api.telegram.org/file/bot${token}/${file_path}`
            try {
                await db.query("UPDATE student SET ava = ? where chat_id = ?", [photo_url, chatId]);
            } catch (err) {
                console.log(err);
            } finally {
                db.close();
            }
        });

    });

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
  

app.post('/message', async function (req, res) {
    console.log(req.body);
    var notice = req.body.notice;
    if (notice == 0) {
        if (req.body.text==null || req.body.group_id==null) {
            res.json({success: false, msg: 'ERROR OCCURED'});
        } else {
            var database = await connect();
            try{
                var info = await database.query("SELECT chat_id FROM student WHERE group_id = ?", [req.body.group_id]);
                var chats = info[0];
                for (var i=0;i<chats.length;i++) {
                    await bot.sendMessage(chats[i], req.body.text);
                }
                await bot.sendMessage(chatId, text);
            } catch(err) {
                console.log(err)
            } finally {
                database.close();
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice == 1) {
        if (req.body.group_id==null || req.body.content==null || req.body.type==null || !req.body.teacher_name) {
            console.log("Нету чего-то из данных!");
            res.json({success: false, msg:'ERROR OCCURED'});
        } else {
            var groupId = req.body.group_id;
            var content = req.body.content;
            var type = req.body.type;
            var teacherName = req.body.teacher_name;
            var db = await connect();
            try {
                var students = await db.query("SELECT chat_id FROM student WHERE group_id = ? AND stream = 1", [groupId]);
                for (var i=0;i<students[0].length;i++) {
                    if (type==0) {
                        await bot.sendMessage(students[0][i]["chat_id"], teacherName + ':\n' + content);
                    } else if (type==1) {
                        await bot.sendPhoto(students[0][i]["chat_id"], content);
                    } else if (type==2) {
                        await bot.sendAudio(students[0][i]["chat_id"], content);
                    } else if (type ==3) {
                        ///TO DO
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                db.close();
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice == 2) {
        if (req.body.text==null || req.body.chat_id==null) {
            res.json({success: false, msg: 'ERROR OCCURED'});
        } else {
            try{
                await getMessage(notice, req.body.chat_id, req.body.text, req.body.group_id);
            } catch(err) {
                console.log(err)
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice ==3) {
        if (req.body.text==null || req.body.chat_id==null) {
            res.json({success: false, msg: 'ERROR OCCURED'});
        } else {
            try{
                await getMessage(notice, req.body.chat_id, req.body.text, null);
            } catch(err) {
                console.log(err)
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    }
})
server.listen(port, "192.168.1.159");
server.on('error', onError);
server.on('listening', onListening);