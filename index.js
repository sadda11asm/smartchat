const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2/promise");
const axios = require("axios");
const http = require("http");
const cron = require('cron');
var fs = require('fs');
const web_port = "cabinet.smartchat.kz"
var debug = require('debug')('smart_telegram_bot:server');
var express = require('express');

// var koa = new Koa();
// const roater = new Router();

var app = express();
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/photos', express.static('./photos'))
app.use('/audios',express.static('./audios')) 


  
var port = <port1>;
app.set('port', port);

var server = http.createServer(app);

app.get('/', function(req, res) {
    res.send('Hello!');
});

// const express = require('express')`
// var app = express()
const token = <token>;

// app.post('/' + token, function (req, res) {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });

const hello = "Hi! My name is Smarty. I am robot. I will help you to study English. So, let's start!\n Привет! Мое имя Смарти. Я робот.  Я помогу вам изучить английский язык. Итак, давайте начнем наше знакомство!"
var options = {
  webHook: {
    port: <port2>,
    }
};

var bot = new TelegramBot(token, options);

const commands = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [[{text: '/info'},{text: '/classes'}, {text: '/question'}],[{text: '/request'}, {text: '/start'},{text: '/pay'}],[{text: '/test'},{text: '/delete'}, {text: '/update'}, {text: '/exit'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    }
}
//     , {
//     webHook: {
//       port: 443,
//     //  key: `./key.pem`,  // Path to file with PEM private key
//       //cert: `./crt.pem`  // Path to file with PEM certificate
//     }
// }
// );

// bot.openWebHook();
// bot.setWebHook(`https://cabinet.smartchat.kz/wh/${token}`);
//    certificate: './fullchain.pem' 
// } // Path to your crt.pem}
// );
// var port = normalizePort(process.env.PORT || '8080');
// app.set('port', port);

var responses = {};

var tariffs = "Выберите интересующий Вас тариф:"
// var tariffs = "Выберите интересующий Вас тариф:\nТариф 1 - Бесплатный пробный урок. Стоимость: 0 тенге.\nТариф 2 - Безлимит 3/7. Посещение: 12 дней в месяц. Изучение английского языка в любое удобное время в течении дня 12 дней в месяц. Стоимость: 20000 тенге.\nТариф 3 - Безлимит 6/7. Посещение: 24 дня в месяц. Изучение английского языка в любое удобное время в течении дня 24 дней в месяц. Стоимость: 35000 тенге.\nТариф 4 - Индивидуально. Посещение: 12 занятий в месяц. Изучение английского языка 3 раза в неделю, в строго обозначенное время. Стоимость: 12000 тенге.\nТариф 5 - Групповое обучение 'Express Grammar'. Посещение: 12 занятий в месяц. Изучение грамматики английского языка в группах. Стоимость: 5000 тенге.\nТариф 6 - Групповое обучение 'English Mix'. Обучение английскому языку сотрудников компаний, в соответствии с поставленной задачей. Стоимость: 7000 тенге.\n Тариф 7 - Подготовка к IELTS TOEFL. Безлимит 3/7. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение в любое удобное время в течении дня 12 дней в месяц. Стоимость: 38500 тенге.\nТариф 8 - Индивидуальная рассылка. Посещение: 12 занятий в месяц. Индивидуальная рассылка материала для самоподготовке по сверхэффективной методике. Стоимость: 2000 тенге.\nТариф 9 - Подготовка к IELTS TOEFL Индивидуально. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение 1 час, в строго отведенное время. Стоимость: 32500 тенге."
// var tariff = ['']
var message = {
}
var results = {
    // chat_id: {
    //    correct:5
    // }
};

var shownTeachers = [];
var answerCallbacks = {

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

var freeLessons = {
    //chat_id: {
    //  group_type:fdsds;
        //queries:[{}]    
    //}
};
var free;
const update = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Имя"], ["Фамилия"], ["Номер"], ["Имейл"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};

const agechoice = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["10-17 лет"], ["18 лет или больше"]],
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
const main = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["/request"], ["/pay"], ["/"],[]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
const lesson = {
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Тариф 1',callback_data: '1'}],[{text: "Тариф 2",callback_data: '2'}],[{text: 'Тариф 3',callback_data: '3'}],[{text: 'Тариф 4',callback_data: '4'}],[{text: 'Тариф 5',callback_data: '5'}],[{text: 'Тариф 6',callback_data: '6'}],[{text: 'Тариф 7',callback_data: '7'}],[{text: 'Тариф 8',callback_data: '8'}],[{text: 'Тариф 9',callback_data: '9'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
};
var less = [{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать бесплатный урок!',callback_data: '1'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
}, 
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 1',callback_data: '2'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 2',callback_data: '3'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 3',callback_data: '4'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 4',callback_data: '5'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 5',callback_data: '6'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 6',callback_data: '7'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 7',callback_data: '8'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
},
{
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Выбрать тариф 8',callback_data: '9'}]]
        // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
}]
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
const dayopts = {
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'Понедельник',callback_data: 'monday'}], [{text: 'Вторник',callback_data: 'tuesday'}], [{text: 'Среда',callback_data: 'wednesday'}], [{text: 'Четверг',callback_data: 'thursday'}], [{text: 'Пятница',callback_data: 'friday'}], [{text: 'Суббота',callback_data: 'saturday'}], [{text: 'Воскресенье',callback_data: 'sunday'}], [{text: 'Уже выбрал все подходящие дни!',callback_data: 'end'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
};
const periodopts = {
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[{text: 'До обеда (7:00-14:00)',callback_data: 'am'}], [{text: 'После обеда (14:00-24:00)',callback_data: 'pm'}], [{text: 'Ночь (00:00-7:00)',callback_data: 'night'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    },
};
const timeopts = [{
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [[{text: '7:00'},{text: '8:00'}, {text: '9:00'},{text: '10:00'}],[{text: '11:00'},{text: '12:00'}, {text: '13:00'},{text: '14:00'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    }
}, {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [[{text: '14:00'},{text: '15:00'}, {text: '16:00'}],[{text: '17:00'},{text: '18:00'},{text: '19:00'}], [{text: '20:00'}, {text: '21:00'}, {text: '22:00'}],[{text: '23:00'}, {text: '24:00'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    }
}, {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [[{text: '00:00'},{text: '01:00'}, {text: '02:00'}],[{text: '03:00'},{text: '04:00'},{text: '05:00'}], [{text: '06:00'}, {text: '07:00'}]]
        // force_reply: true
        // resize_keyboard: true,
        // one_time_keyboard: true,
    }
}];
const lvldetect = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Beginner"], ["Elementary"], ["Pre-Intermediate"], ["Intermediate"], ["Upper-Intermediate"], ["Advanced"], ["Mastery"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
const feedback = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"],["8"],["9"],["10"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};

const ready = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["Yes"]],
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

const chosen = {
    //chatId: teacherId;
}
const weekdays = {};
async function connect(){
    let con = await mysql.createConnection({
        host: "localhost",
        //user:"finley",
        //password:"password",
        user:<user>,
        password: <password>,
        port:<port>,
        // host:'localhost',
        // user:"root",
        // password: "12345",
        database:<database>,
        insecureAuth: true
    });
    return con;
}

bot.onText(/\/edit/, async function onEditableText(msg) {
    await sendTest(msg.chat.id, 1);
});
  
  

  // Handle callback queries
bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    var db = await connect();
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id
    };
    var chatId = opts.chat_id;
    let text;
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (action == 'am') {
        await bot.editMessageText("Вы выбрали период до обеда для: " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]), opts);
        await bot.sendMessage(chatId, "Выберите начало промежутка:", timeopts[0]).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                var res = answer.text;
                await bot.sendMessage(chatId, "Выберите конец промежутка: ", timeopts[0]).then(() => {
                    answerCallbacks[chatId] = async function(answer2) {
                        var res2 = answer2.text;
                        console.log("DAY AM",weekdays[chatId][requests[chatId]["weekday"]]);
                        var response = await getRequest(chatId, weekdays[chatId][requests[chatId]["weekday"]], res, res2, requests[chatId]["group_type"], free);
                        if (response=='error') {
                            await bot.sendMessage(chatId, "Период введен неправильно! Введите заново: период для " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]) + ": ",periodopts);
                            return;
                        }
                        if (responses[chatId]==null) {
                            responses[chatId]=[];
                        }
                        responses[chatId].push(response);
                        requests[chatId]["weekday"]++;
                        if (requests[chatId]["weekday"]==weekdays[chatId].length) {
                            console.log("responsesss: " + responses);
                            await bot.sendMessage(chatId, "На основании вашего желанного времени занятий вам подобраны преподаватели по режиму работы.");
                            var teachers = await proposeTeacher(chatId, responses[chatId]);
                            requests[chatId]["teachers"] = teachers;
                            await sendRequest(chatId, 0);
                            return;
                        }
                        var rus = await russianday(weekdays[chatId][requests[chatId]["weekday"]])
                        await bot.sendMessage(chatId, "Период для " + rus + ": ",periodopts);
                    }
                })
            }
        });
        await db.end();
        return;
    }
    if (action == 'pm') {
        await bot.editMessageText("Вы выбрали период после обеда для: " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]), opts);
        await bot.sendMessage(chatId, "Выберите начало промежутка:", timeopts[1]).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                var res = answer.text;
                await bot.sendMessage(chatId, "Выберите конец промежутка: ", timeopts[1]).then(() => {
                    answerCallbacks[chatId] = async function(answer2) {
                        var res2 = answer2.text;
                        console.log("DAY PM", weekdays[chatId][requests[chatId]["weekday"]])
                        var response = await getRequest(chatId, weekdays[chatId][requests[chatId]["weekday"]], res, res2, requests[chatId]["group_type"], free);
                        if (response=='error') {
                            await bot.sendMessage(chatId, "Период введен неправильно! Введите заново: период для " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]) + ": ",periodopts);
                            return;
                        }
                        if (responses[chatId]==null) {
                            responses[chatId]=[];
                        }
                        responses[chatId].push(response);
                        requests[chatId]["weekday"]++;
                        if (requests[chatId]["weekday"]==weekdays[chatId].length) {
                            console.log("responsesss: " + responses);
                            await bot.sendMessage(chatId, "На основании вашего желанного времени занятий вам подобраны преподаватели по режиму работы.");
                            var teachers = await proposeTeacher(chatId, responses[chatId]);
                            requests[chatId]["teachers"] = teachers;
                            await sendRequest(chatId, 0);
                            return;
                        }
                        var rus = await russianday(weekdays[chatId][requests[chatId]["weekday"]])
                        await bot.sendMessage(chatId, "Период для " + rus + ": ",periodopts);
                    }
                })
            }
        });
        await db.end();
        return;
    }
    if (action == 'night') {
        await bot.editMessageText("Вы выбрали период ночь для: " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]), opts);
        await bot.sendMessage(chatId, "Выберите начало промежутка:", timeopts[2]).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                var res = answer.text;
                await bot.sendMessage(chatId, "Выберите конец промежутка: ", timeopts[2]).then(() => {
                    answerCallbacks[chatId] = async function(answer2) {
                        var res2 = answer2.text;
                        console.log("DAY NIGHT", weekdays[chatId][requests[chatId]["weekday"]])
                        var response = await  getRequest(chatId, weekdays[chatId][requests[chatId]["weekday"]], res, res2, requests[chatId]["group_type"], free);
                        if (response=='error') {
                            await bot.sendMessage(chatId, "Период введен неправильно! Введите заново: период для " + await russianday(weekdays[chatId][requests[chatId]["weekday"]]) + ": ",periodopts);
                            return;
                        }
                        if (responses[chatId]==null) {
                            responses[chatId]=[];
                        }
                        responses[chatId].push(response);
                        requests[chatId]["weekday"]++;
                        if (requests[chatId]["weekday"]==weekdays[chatId].length) {
                            console.log("responsesss: " + responses[chatId]);
                            await bot.sendMessage(chatId, "На основании вашего желанного времени занятий вам будут подобраны преподаватели по режиму работы.");
                            var teachers = await proposeTeacher(chatId, responses[chatId]);
                            requests[chatId]["teachers"] = teachers;
                            await sendRequest(chatId, 0);
                            return;
                        }
                        var rus = await russianday(weekdays[chatId][requests[chatId]["weekday"]])
                        await bot.sendMessage(chatId, "Период для " + rus + ": ",periodopts);
                    }
                })
            }
        });
        await db.end();
        return;
    }
    var str = "Выбранные дни: ";
    try {
        for (var x=0;x<weekdays[chatId].length;x++) {
            var rus = await russianday(weekdays[chatId][x]);
            str+=rus+", ";
        }
    } catch (err) {
        str="";
        weekdays[chatId]=[];
    }
    if (action=='end') {
        var infoo = await db.query('SELECT lessons from rate where rate_id = ?', [requests[chatId]["rate_id"]]);
        var num = infoo[0][0]["lessons"];
        console.log(weekdays[chatId].length, num/4);
        if (weekdays[chatId].length<num/4) {
            await bot.sendMessage(chatId, "Вы должны выбрать еще дни занятий по этому тарифу!");
            await bot.editMessageText(str + ". Выберите еще другой:",{
                chat_id:chatId,
                message_id: opts.message_id,
                reply_markup: {
                    inline_keyboard: [[{text: 'Понедельник',callback_data: 'monday'}], [{text: 'Вторник',callback_data: 'tuesday'}], [{text: 'Среда',callback_data: 'wednesday'}], [{text: 'Четверг',callback_data: 'thursday'}], [{text: 'Пятница',callback_data: 'friday'}], [{text: 'Суббота',callback_data: 'saturday'}], [{text: 'Воскресенье',callback_data: 'sunday'}], [{text: 'Уже выбрал все подходящие дни!',callback_data: 'end'}]]
                    // force_reply: true
                    // resize_keyboard: true,
                    // one_time_keyboard: true,
                }
            });
            await db.end();
            return;
        } 
        await bot.editMessageText(str, opts);
        await bot.sendMessage(chatId, "Теперь выберите удобные промежутки времени занятий для каждого дня:");
        requests[chatId]["weekday"] = 0;
        var rday = await russianday(weekdays[chatId][0])
        await bot.sendMessage(chatId, "Период для " + rday + ": ",periodopts);
        await db.end();
        return;
    }
    if (days.includes(action)) {
        if (weekdays[chatId].includes(action)) {
            await bot.editMessageText("Вы уже выбирали этот день! " + str +". Выберите еще другой:", {
                chat_id:chatId,
                message_id: opts.message_id,
                reply_markup: {
                    inline_keyboard: [[{text: 'Понедельник',callback_data: 'monday'}], [{text: 'Вторник',callback_data: 'tuesday'}], [{text: 'Среда',callback_data: 'wednesday'}], [{text: 'Четверг',callback_data: 'thursday'}], [{text: 'Пятница',callback_data: 'friday'}], [{text: 'Суббота',callback_data: 'saturday'}], [{text: 'Воскресенье',callback_data: 'sunday'}], [{text: 'Уже выбрал все подходящие дни!',callback_data: 'end'}]]
                    // force_reply: true
                    // resize_keyboard: true,
                    // one_time_keyboard: true,
                }
            });
            await db.end();
            return;
        } else {
            weekdays[chatId].push(action);
            console.log(weekdays[chatId]);
        }
        var rday = await russianday(action)
        await bot.editMessageText(str+ rday + ". Выберите еще другой:",{
            chat_id:chatId,
            message_id: opts.message_id,
            reply_markup: {
                inline_keyboard: [[{text: 'Понедельник',callback_data: 'monday'}], [{text: 'Вторник',callback_data: 'tuesday'}], [{text: 'Среда',callback_data: 'wednesday'}], [{text: 'Четверг',callback_data: 'thursday'}], [{text: 'Пятница',callback_data: 'friday'}], [{text: 'Суббота',callback_data: 'saturday'}], [{text: 'Воскресенье',callback_data: 'sunday'}], [{text: 'Уже выбрал все подходящие дни!',callback_data: 'end'}]]
                // force_reply: true
                // resize_keyboard: true,
                // one_time_keyboard: true,
            }
        });
        // bodyRequest(opts.chat_id, );
        await db.end();
        return;
    }
    if (action>='1' && action <='9') {
        if (requests[chatId]!=null && requests[chatId]["rate_id"]!=null) {
            await db.end();
            return;
        }
        // console.log(action);
        if (action=='1') {
            if (freeLessons[chatId]!=null && freeLessons[chatId]==3) {
                await bot.sendMesssage(chatId, "Вы уже использовали свои возможности на бесплатный урок! Теперь вам только открыты остальные 8 тарифов (/info). Подайте заявку заново по /request", commands);
                await db.end();
                return;
            }
            if(chosen[chatId]!=null) {
                await bot.sendMessage(chatId, "Вы уже выбрали преподавателя после бесплатного урока! Выберете другой тариф пожалуйста");
                await db.end();
                return;
            }
        }
        if (requests[chatId] == null) requests[chatId]={};
        requests[chatId]["rate_id"] = action; 
        console.log(action);
        if (action == '1') {
            await bot.sendMessage(chatId, "Вы выбрали бесплатный урок!");
        } else {
            await bot.sendMessage(chatId, "Вы выбрали Тариф " + (parseInt(action)-1) + '!');
        }
        await bodyRequest(opts.chat_id, action);
        // await console.log("ENTERED 2", requests[chatId]);
        await db.end();
        return;
    }
    if (requests[opts.chat_id]["teacher"]!=null && requests[opts.chat_id]["teachers"]!=null) {
        // console.log(requests);
        // console.log(chatId);
        var teachers = requests[chatId]["teachers"];
        // console.log("keys", keys);
        var i = requests[chatId]["teacher"];
        var keys = Object.keys(teachers[i]);
        var rate_id = requests[chatId]["rate_id"];
        console.log(rate_id)
        if (action == 'next') {
            await sendRequest(opts.chat_id, i+1);
            var studInfo = await db.query("SELECT lvl, student_id FROM student where chat_id = ?", [chatId]);
            var info = await db.query("SELECT login FROM teacher where teacher_id = ?", [keys[0]]);
            // console.log(teachers[i]["teacher_id"]);
            var login = info[0][0]["login"];
            bot.editMessageText("Вы пропустили преподавателя с ником " + login + '!', opts);
            return;
        } else if (action== 'yes'){
            var studInfo = await db.query("SELECT lvl, student_id FROM student where chat_id = ?", [chatId]);
            var info = await db.query("SELECT login FROM teacher where teacher_id = ?", [keys[0]]);
            // console.log(teachers[i]["teacher_id"]);
            var login = info[0][0]["login"];
            // console.log(login);
            var studLvl = studInfo[0][0]["lvl"];
            var studentId = studInfo[0][0]["student_id"];
            var keys2 = Object.keys(teachers[i][keys[0]]);
            for (var k=0;k<keys2.length;k++) {
                for (var j=0;j<teachers[i][keys[0]][keys2[k]].length;j++) {
                    var time = teachers[i][keys[0]][keys2[k]][j];
                    await db.query("INSERT INTO req (finish_time, start_time, student_id, nday, rate_id, teacher_id) VALUES (?,?,?,?,?,?)",[time["finish_time"], time["start_time"],studentId, keys2[k], rate_id, keys[0]]);
                }
            }
            requests[chatId]["lessons"] = 1;
            await sendNotice(chatId);
            bot.editMessageText("Вы выбрали преподавателя с ником " + login + '!', opts);
        } else {
            await bot.sendMessage(opts.chat_id, "Неправильный ввод! Повторите заявку по /request");
        }
    }
    await db.end();
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

    const callback = answerCallbacks[chatId];
    if (callback) {
        delete answerCallbacks[msg.chat.id];
        return callback(msg);
     }

    if (text === "/pay" || text === "/start" || text === "/update" ||  text === "/test" ||  text === "/request" ||  text === "/exit") {
        // console.log("Cannot!")
        return;
    }

    try{
        if (text!=null) {
            content = text;
        } else {
           // console.log("Not Text");
        }
    } catch(err) {
       // console.log("Not Text");
    }
    if (caption) {
        title = caption;
        console.log(title);
    }
    if (msg.photo) {
        photo = msg.photo[msg.photo.length-1]["file_id"];
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
            console.log("INSERTED");
            await database.query("INSERT INTO chat (group_id, sender_id, content, type, title) VALUES (?, ?, ?, ?, ?)", [stream[0][0]["group_id"], stream[0][0]["student_id"], content, type, title]);
        }//console.log(stream);
    } catch (err) {
        // console.log  (err);
    } finally {
        database.end();
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
        bot.sendMessage(chatId, "Приятно познакомиться, " + firstname + "! Теперь, можно узнать вашу фамилию?");
        return;
    }
    if (notlast && !notfirst) {
        var lastname = msg.text
        insert(chatId, "lastname", lastname);
        bot.sendMessage(chatId, "Теперь отправитьте пожайлуйста ваш имейл:");
        return;
    }
    if (notemail && !notlast) {
        var email = msg.text
        insert(chatId, "email", email);
        bot.sendMessage(chatId, "Пожалуйста, напишите свой номер телефона, чтобы мы могли вам перезвонить.");
        return;
    }
    if (notphone && !notemail) {
        var phone = msg.text
        insert(chatId, "phone", phone);
        await bot.sendMessage(chatId, "Спасибо!");
        await bot.sendMessage(chatId, "Давайте проверим Ваш уровень английского.")
        await bot.sendMessage(chatId, 'Я проведу сейчас письменный тест. Позже вы пройдете тест с преподавателем во время пробного урока!');
        var text1 = "Для того чтобы начать тест, скажите сколько вам лет."
        bot.sendMessage(chatId,text1, agechoice).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                //Code never executed when there are lots of people       
                var res = answer.text;
                var age=0, text2;
                // text2 = "Я задам вам 10 легких вопросов. Если дадите более 5 правильных ответов, перейдете на следующий уровень. И так далее. Пройдите по /test для начала теста.";    
                if (res == "10-17 лет"){
                    age = 0;
                    await bot.sendMessage(chatId, "Спасибо, теперь пройдите по /test чтобы начать тест!", commands) 
                }else if (res == "18 лет или больше"){
                    age = 1;
                    await bot.sendMessage(chatId, "Спасибо, теперь пройдите по /test чтобы начать тест!", commands) 
                } else {
                    await bot.sendMessage(chatId, "Вы не определили свой возраст! Пока у вас стоит возраст 10-17 лет. Для изменения пройдите по /update и затем по /test", commands);
                }
                database = await connect();
                await database.query("UPDATE student SET age = ? WHERE chat_id = ?", [age, chatId]);
                await database.end();
            };
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

bot.onText(/\/classes/, async function (msg, match) {
    var chatId = msg.chat.id;
    var check =  await notExists(msg.chat.id, "group_id");
    await bot.sendMessage(chatId, "Занятия проходят путем отправки сообщений. Каждый урок мы проходим новый материал. Основной упор делается на постоянную практику нового материала. Чтобы понимание было лучше, вы будете получать тексты для чтения, к которым будете писать ответы. Тем самым тренируя навыки чтения и письма. Вы также будете получать и отправлять аудио сообщения, чтобы тренировать слух и разговорную речь. Преподаватель будет подсказывать, как правильно произносить слова и учить, как строить целые предложения без ошибок. Все это будет проходить индивидуально, чтобы вы без стеснения задавали вопросы. Вы также сможете отвечать на вопросы не боясь ошибиться.");
});

bot.onText(/\/question/, async function (msg, match) {
    var chatId = msg.chat.id;
    var check =  await notExists(msg.chat.id, "group_id");
    await bot.sendMessage(chatId, "Напишите сюда вопрос и я передам его своему создателю! Я вам пришлю ответ максимально скоро как это будет возможно!:)").then (async function () {
        answerCallbacks[chatId] = async function(answer) {
            var res = answer.text;
            var db = await connect();
            var info = await db.query("SELECT firstname from student where chat_id = ?", [chatId]);
            var name = info[0][0]["firstname"];
            await bot.sendMessage(chatId, "Вопрос успешно отправлен!")
            bot.sendMessage(247532533, "Студент `" + name + "` отправил вопрос:\n" + res + "\nОтветьте на это сообщение в этом чате!", {
                parse_mode: "Markdown",
                reply_markup: {
                    // inline_keyboard: [[{text: 'Yes',callback_data: "yes"}],[{text: "No",callback_data: 'next'}]]
                    // keyboard: [["Тариф 1"], ["Тариф 2"], ["Тариф 3"], ["Тариф 4"], ["Тариф 5"], ["Тариф 6"], ["Тариф 7"], ["Тариф 8"], ["Тариф 9"]],
                    force_reply: true
                    // resize_keyboard: true,
                    // one_time_keyboard: true,
                },
            }).then (async function () {
                answerCallbacks[247532533] = async function(ans) {
                    var res2 = ans.text;
                    bot.sendMessage(chatId, "Создатель ответил:\n" + res2 + "\nОтправьте /question чтобы отправить новый вопрос!")
                    bot.sendMessage(247532533, "Ответ успешно отправлен!");
                }
            })
            db.end();
        }
    })
});


bot.onText(/\/pay/, async function (msg, match) {
    var chatId = msg.chat.id;
    var check =  await notExists(msg.chat.id, "group_id");
    if (check) {
        await bot.sendMessage(chatId, "Для начала подайте заявку на занятия по /request");
        return;
    }
    var db = await connect();
    var group = await db.query("SELECT group_id FROM student where chat_id = ?", [chatId]);
    var rate = await db.query('SELECT rate_id FROM gr WHERE group_id = ?', [group[0][0]["group_id"]]);
    var amount = await db.query('SELECT rate_cost, rate_name, rate_title FROM rate WHERE rate_id = ?', [rate[0][0]["rate_id"]]);
    var cost = amount[0][0]["rate_cost"]*100;
    var name = amount[0][0]["rate_name"];
    var title = amount[0][0]["rate_title"];
    await db.end();
    bot.sendInvoice(msg.chat.id, "Оплата за курс", title , "foo", "381764678:TEST:5737", 'foo', 'RUB', [{label: name , amount: cost}])
        .then( (res) => {
            console.log("\n\norder:")
            console.log(res);
            bot.sendMessage(msg.chat.id, "ok");
        })
        .catch( (error) => {
            console.log(error);
        });
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

bot.on('successful_payment', async function (ctx) {
    var chatId = ctx.chat.id;
    await bot.sendMessage(chatId, "Вы успешно оплатили ваши курсы! Доступ к уроку будет успешно открыт! Спасибо за оплату!");
    var db = await connect();
    var group = await db.query("SELECT group_id FROM student where chat_id = ?", [chatId]);
    var rate = await db.query('SELECT rate_id FROM gr WHERE group_id = ?', [group[0][0]["group_id"]]);
    var lessons = await db.query('SELECT lessons FROM rate WHERE rate_id = ?', [rate[0][0]["rate_id"]]);
    var data = await db.query("UPDATE student SET nles = ? WHERE chat_id = ?", [lessons[0][0]["lessons"], chatId]); 
    console.log("\n\nsuccess:");
    console.log(ctx);
    await db.end();
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
        } finally {
            await db.end();
        }
        await bot.sendMessage(chatId, hello);
        await bot.sendMessage(chatId, "Прошу, скажите ваше имя:");
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
    const chatId = msg.chat.id;
    requests[chatId] ={};
    weekdays[chatId]=[];
    responses[chatId]=[];
    var check = await isExists(chatId, "chat_id");
    var check2;
    if (!check) {
        bot.sendMessage(chatId, "Пожалуйста для начала пройдите регистрацию по /start!");
        return;
    }
    var db;
    try {
        db = await connect();
    } catch (err) {
        console.log(err);
    }
    try {
        var group = await db.query("SELECT COUNT(*) as cnt FROM student WHERE group_id > 0 AND chat_id = ?", [chatId]);
        var student = await db.query('SELECT student_id FROM student WHERE chat_id = ?', [chatId]);
        var req = await db.query("SELECT COUNT(*) as cnt FROM req WHERE student_id = ?", [student[0][0]["student_id"]]);
        check = group[0][0]["cnt"]>0;
        check2 = req[0][0]["cnt"]>0;
        console.log(check)
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
    if (check) {
        bot.sendMessage(chatId, "Вы уже состоите в одной из групп! Для того чтобы выйти из существующей группа вам нужно пройти по /exit . Однако имейте ввиду что в этом случае вам нужно будет подать заявку и ждать согласие преподавателя заново. Также возврат средств не возможен! ", commands);
        return;
    }
    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null || check2) {
        bot.sendMessage(chatId, "Ваша заявка уже присутствует в базе! Пожалуйста удалите предыдущую заявку по /delete и затем попробуйте снова!", commands);
        return;
    }
    if(requests[chatId]!=null && requests[chatId]["rate_id"]) {
        requests[chatId]["rate_id"]=null;
    }
    await bot.sendMessage(chatId, "Итак, чтобы оставить заявку на бесплатные/групповые/индивидуальные занятия нужно будет заполнить кое-какую информацию.");
    var tarifs = "Список тарифов и их стоимость:\nПройдите индивидуальный бесплатный пробный урок! Стоимость: 0 тенге.\nТариф 1 - Безлимит 3/7. Посещение: 12 дней в месяц. Изучение английского языка в любое удобное время в течении дня 12 дней в месяц. Стоимость: 20000 тенге.\nТариф 2 - Безлимит 6/7. Посещение: 24 дня в месяц. Изучение английского языка в любое удобное время в течении дня 24 дней в месяц. Стоимость: 35000 тенге.\nТариф 3 - Индивидуально. Посещение: 12 занятий в месяц. Изучение английского языка 3 раза в неделю, в строго обозначенное время. Стоимость: 12000 тенге.\nТариф 4 - Групповое обучение 'Express Grammar'. Посещение: 12 занятий в месяц. Изучение грамматики английского языка в группах. Стоимость: 5000 тенге.\nТариф 5 - Групповое обучение 'English Mix'. Обучение английскому языку сотрудников компаний, в соответствии с поставленной задачей. Стоимость: 7000 тенге.\n Тариф 6 - Подготовка к IELTS TOEFL. Безлимит 3/7. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение в любое удобное время в течении дня 12 дней в месяц. Стоимость: 38500 тенге.\nТариф 7 - Индивидуальная рассылка. Посещение: 12 занятий в месяц. Индивидуальная рассылка материала для самоподготовке по сверхэффективной методике. Стоимость: 2000 тенге.\nТариф 8 - Подготовка к IELTS TOEFL Индивидуально. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение 1 час, в строго отведенное время. Стоимость: 32500 тенге.";
    // var chatId = msg.chat.id;
    var arr = tarifs.split('\n');
    await bot.sendMessage(chatId, tariffs);
    for (var i=0;i<arr.length-1;i++) {
        await bot.sendMessage(chatId, arr[i+1], less[i]);
    }
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
    check = await isExists(chatId, "group_id");
    // if (check) {
    //     await bot.sendMessage(chatId, "Вы уже состоите в группе и не можете сменить уровень!");
    //     return;
    // }
    if (test[chatId]!= null && test[chatId]==true) {
        bot.sendMessage(chatId, "Ваш уровень уже определен! Вы не можете повторно пройти уровневый тест!");
        return;
    }
    //must check whether he finished this test!
    bot.sendMessage(chatId, "Итак, давайте начнем!");
    bot.sendMessage(chatId, "Я задам вам 10 легких вопросов. Если дадите более 5 правильных ответов, перейдете на следующий уровень. И так далее. Удачи!");
    await sendQuestion(1, chatId);
});
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
    var db = await connect();
    try {
        var info = await db.query('SELECT student_id FROM student where chat_id = ?', [chatId])
        var student_id = info[0][0]["student_id"];
        var data = await db.query('SELECT teacher_id FROM req where student_id = ?', [student_id]);
        var teacher_id = data[0][0]["teacher_id"];
    } catch (err) {
        // console.log(err);
        await bot.sendMessage(chatId, "У вас нету действующей заявки!")
        return;
    } finally {
        await db.end();
    }
    await axios.post('https://'+web_port+'/message', {
                notice: 3,
                student_id: student_id,
                teacher_id: teacher_id
            }).then(function(res) {
                console.log(res);
            }).catch(function(err) {
                console.log(err);
            })
    await deleteRequests(chatId);
    requests[chatId]={}
    weekdays[chatId]=[];
    await bot.sendMessage(chatId, "Ваша заявка удалена! Можете отправить новую заявку по /request!")



})

bot.onText(/\/update/, async function(msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage (chatId, "Что вы хотите изменить?", update).then (async function () {
        answerCallbacks[chatId] = async function(answer) {
            var res = answer.text;
            var item;
            if (res=="Имя") item = "firstname"
            if (res=="Фамилия") item = "lastname"
            if (res=="Номер") item = "phone"
            if (res=="Имейл") item = "email"
            bot.sendMessage(chatId, "Введите новое значение:").then (async function () {
                answerCallbacks[chatId] = async function(answer2) {
                    var res2 = answer2.text;
                    await updateInfo(chatId,item, res2);
                }
            })
        }
    })
})
bot.onText(/\/exit/, async function (msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage (chatId, "Вы уверены что хотите выйти из вашей группы? В данном случае возврат средств на оплаченные уроки будет не возможен!", lvlans).then (async function () {
        answerCallbacks[chatId] = async function(answer) {
            var res = answer.text;
            if (res=="No") {
                bot.sendMessage(chatId, "Отлично. Данные не изменены!")
                return;
            }
            if (res=="Yes"){
                if (requests[chatId]) {
                    requests[chatId]["group_type"] = null;
                    requests[chatId]["lessons"] = null
                    weekdays[chatId]=[];
                }
                await deleteGroup(chatId);
                await nullNLes(chatId);
                await bot.sendMessage(chatId, "Теперь вы не состоите ни в одной из групп и у вас не имеются заявок на обучение. Для того чтобы начать обучение подайте заявку заново по /request!", commands);
            } 
        }
    })
})

bot.onText(/\/info/, async function (msg, match) {
    var tarifs = "Список тарифов и их стоимость:\n Бесплатный пробный индивидуальный урок. Стоимость: 0 тенге!\nТариф 1 - Безлимит 3/7. Посещение: 12 дней в месяц. Изучение английского языка в любое удобное время в течении дня 12 дней в месяц. Стоимость: 20000 тенге.\nТариф 2 - Безлимит 6/7. Посещение: 24 дня в месяц. Изучение английского языка в любое удобное время в течении дня 24 дней в месяц. Стоимость: 35000 тенге.\nТариф 3 - Индивидуально. Посещение: 12 занятий в месяц. Изучение английского языка 3 раза в неделю, в строго обозначенное время. Стоимость: 12000 тенге.\nТариф 4 - Групповое обучение 'Express Grammar'. Посещение: 12 занятий в месяц. Изучение грамматики английского языка в группах. Стоимость: 5000 тенге.\nТариф 5 - Групповое обучение 'English Mix'. Обучение английскому языку сотрудников компаний, в соответствии с поставленной задачей. Стоимость: 7000 тенге.\n Тариф 6 - Подготовка к IELTS TOEFL. Безлимит 3/7. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение в любое удобное время в течении дня 12 дней в месяц. Стоимость: 38500 тенге.\nТариф 7 - Индивидуальная рассылка. Посещение: 12 занятий в месяц. Индивидуальная рассылка материала для самоподготовке по сверхэффективной методике. Стоимость: 2000 тенге.\nТариф 8 - Подготовка к IELTS TOEFL Индивидуально. Посещение: 12 занятий в месяц. Подготовка к международным экзаменам IELTS, TOEFL. Обучение 1 час, в строго отведенное время. Стоимость: 32500 тенге.";
    var chatId = msg.chat.id;
    var arr = tarifs.split('\n');
    for (var i=0;i<arr.length;i++) {
        await bot.sendMessage(chatId, arr[i]);
    }
    await bot.sendMessage(chatId, "Теперь подайте по одному из данных тарифов по /request!");
})
async function bodyRequest(chatId, action) {
    if (action=='1' || action=='2' || action=='3' || action=='4' || action=='7' || action=='8' || action=='9' ) {
        //console.log("individual")
        if (requests[chatId]==null) requests[chatId]={}
        requests[chatId]["group_type"] = 1;
    } else if (action=='5' || action=='6'){
        if (requests[chatId]==null) requests[chatId]={}
        requests[chatId]["group_type"] = 0;
    } else {
        bot.sendMessage(chatId, "Не правильно введен тип занятий! Пожалуйта, подайте заявку заново!");
        return;
    }
    var db = await connect();
    var info = await db.query('SELECT lessons from rate where rate_id = ?', [action]);
    var num = info[0][0]["lessons"];
    requests[chatId]["num"] = num;
    if (action=='1') {
        free = 1;
    } else {
        free = 0;
    }
    await db.end();
    await bot.sendMessage(chatId, "Выберите пожалуйста все дни и все удобные промежутки времени когда Вам будет удобно заниматься. Вам нужно будет выбрать минимум " + num/4 + " дней в неделю!", dayopts);        
            // await bot.sendMessage(chatId, str);
            // await bot.sendMessage(chatId, "На основании вашего желанного времени занятий вам подобраны преподаватели по режиму работы.");
            // var teachers = await proposeTeacher(chatId, responses);
            // console.log(teachers);  
            // console.log(teachers);
            // requests[chatId]["teachers"] = teachers;
            // console.log(requests[chatId]["teachers"]);
            //console.log("teachers :", teachers);
            // await sendRequest(chatId, 0);
    // }
}

async function russianday(day) {
    switch (day) {
        case 'monday': return "Понедельник";
        case 'tuesday': return "Вторник";
        case 'wednesday': return "Среда";
        case 'thursday': return "Четверг";
        case 'friday': return "Пятница";
        case 'saturday': return "Суббота";
        case 'sunday': return "Воскресенье";
    }
}
async function sendNotice(chatId) {
    var db = await connect();
    var info = await db.query("SELECT student_id FROM student WHERE chat_id = ?", [chatId]);
    var student_id = info[0][0]["student_id"];
    if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
        console.log("deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        await axios.post('https://' + web_port + '/message', {
                notice: 1,
                student_id: student_id
            }).then(function(res) {
                console.log(res);
            }).catch(function(err) {
                console.log(err);
            })
        await bot.sendMessage(chatId,"Чтобы удалить заявку перейдите по /delete. Когда один из преподавателей добавит вас в свою группу мы Вам дадим знать!", commands);
    } else {
        await bot.sendMessage(chatId,"К сожалению, не нашлось преподавателей на ваше время либо вы не выбрали не одного преподавателя из передложенных! Пожалуйста подайте заявку еще раз!", commands);
    }
    await db.end();
    requests[chatId] = {};
    weekdays[chatId]=[];
}
// async function sendRequests(chatId,studentId, rate_id, studLvl, teachers) {
//     // await database.end();
// }
async function sendRequest(chatId, i) {
    var teachers = requests[chatId]["teachers"];
    console.log(teachers);
    requests[chatId]["teacher"] = i;
    // console.log(requests);
    if (i==teachers.length) {
        // console.log("ENTERED");
        await sendNotice(chatId);
        shownTeachers = [];
        return;
    }
    var keys = Object.keys(teachers[i]);
    console.log(teachers[i][keys[0]]["num"],requests[chatId]["num"]/4);
    if (teachers[i][keys[0]]["num"]<requests[chatId]["num"]/4) {
        await sendRequest(chatId, i+1);
        return;
    }
    // console.log("keys", keys);
    var database = await connect();
    var studInfo = await database.query("SELECT lvl, student_id FROM student where chat_id = ?", [chatId]);
    var studLvl = studInfo[0][0]["lvl"];
    var studentId = studInfo[0][0]["student_id"];
    var info = await database.query("SELECT login, lvl FROM teacher where teacher_id = ? ", keys[0]);
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
        } else {
            await sendRequest(chatId, i+1);
        }    
    await database.end();
}
async function proposeTeacher(chatId, req) {
    var teachers = [];
    // console.log("req", req);
    var db = await connect();
    try {
        // var data = await db.query("SELECT student_id FROM student WHERE chat_id = ?", [chatId]);
        var studentId = req[0]["student_id"];
        var num =0;
        // var req = await db.query("SELECT start_time, finish_time, nday FROM req where student_id = ?", [studentId]);
        for (var ind = 0; ind<req.length;ind++) {
            var left = req[ind]["start_time"];
            var right = req[ind]["finish_time"];
            var day = req[ind]["nday"];
            console.log("ДЕНЬ НЕДЕЛИ:",day);
            var info;
            if (chosen[chatId]!=null) {
                info = await db.query("SELECT teacher_id,nday, start_time, finish_time FROM graph WHERE teacher_id = ?", [chosen[chatId]]);
                var obj = {};
                var start = info[0][0]["start_time"];
                var finish = info[0][0]["finish_time"];
                var teacher_id = chosen[chatId];
                var time = {
                    "start_time": Math.max(parseInt(start),parseInt(left)),
                    "finish_time": Math.min(parseInt(right), parseInt(finish))
                }
                // obj["teacher_id"] = teacher_id;
                // obj["start_time"] = Math.max(start, left);
                // obj["finish_time"] = Math.min(right, finish);
                // obj["nday"] = day;
                // teachers.push(obj);
                var d = {};
                d[day] = [];
                d[day].push(time);
                var de = {
                }   
                de[teacher_id] = d;  
                teachers.push(de);
                return teachers;
            }
            info = await db.query("SELECT teacher_id,nday, start_time, finish_time FROM graph WHERE nday = ?", [day]);
            for (var j = 0;j<info[0].length;j++) {
                var start = info[0][j]["start_time"];
                var finish = info[0][j]["finish_time"];
                if (parseInt(start)>=parseInt(right) || parseInt(finish)<=parseInt(left)) {
                    continue;
                } else {
                    // var de = {}
                    var teacherId = info[0][j]["teacher_id"];
                    // de["teacher_id"] = teacherId;
                    // de["time"] = [];

                    // de["start_time"] = Math.max(start, left);
                    // de["finish_time"] = Math.min(right, finish);
                    // de["nday"] = day;
                    var found = false;
                    var cnt;
                    for(var i = 0; i < teachers.length; i++) {
                        if (teachers[i][teacherId]!=null) {
                            found = true;
                            cnt = i;
                            break;
                        }
                    }
                    if (requests[chatId]["rate_id"]==1) {
                        var past = await db.query("SELECT free_id FROM free where chat_id = ? AND teacher_id = ?", [chatId, teacherId]);
                        // for (var k = 0;k<past[0].length;k++) {
                        //     if (teachers.includes(past[0][k])) {
                        //         delete teachers
                        //     }
                        // }
                        if (past[0].length>0) {
                            continue;
                        }
                    }
                    var time = {
                        "start_time": Math.max(parseInt(start),parseInt(left)),
                        "finish_time": Math.min(parseInt(right), parseInt(finish))
                    }
                    if (found) {
                        console.log("FOUND!");
                        teachers[cnt][teacherId]["num"]++;
                        if (teachers[cnt][teacherId][day]==null) {
                            teachers[cnt][teacherId][day]=[];
                            teachers[cnt][teacherId][day].push(time);
                        } else {
                            if (teachers[cnt][teacherId][day][0].start_time!=time.start_time || teachers[cnt][teacherId][day][0].finish_time!=time.finish_time) {
                                teachers[cnt][teacherId][day].push(time);                         
                            }
                        }
                    } else {
                        var d = {};
                        d[day] = [];
                        d[day].push(time);
                        d["num"]=1;
                        var de = {
                        }   
                        de[teacherId] = d;  
                        teachers.push(de);
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }   
    console.log("teachers", teachers);
    return teachers;
}

async function nullNLes(chatId) {
    var db = await connect();
    var nles;
    try {
        await db.query("UPDATE student SET nles = 0 WHERE chat_id = ?", chatId); 
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
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
        db.end();
    }
}

async function sendNotification(studentId, groupId, groupName, teacherId, deleted) {
    await axios.post('https://' + web_port + '/message', {
        notice: 2,
        student_id: studentId,
        deleted : deleted,
        group_id : groupId,
        group_name:groupName,
        teacher_id:teacherId
    }).then(function(res) {
        // console.log(res);
    }).catch(function(err) {
        // console.log(err);
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
        await db.end();
    }
}

async function getMessage(notice, chatId, text, groupId) {
    if (notice!=6) {
        await bot.sendMessage(chatId, text);
    }
    if (notice==3 || notice==2) {
        requests[chatId]={};
        return;
    }
    var db = await connect();
    var teacher = await db.query('SELECT teacher_id FROM gr where group_id = ?', [groupId]);
    var teacherId = teacher[0][0]["teacher_id"];
    //await db.query('INSERT INTO free (chat_id, teacher_id) VALUES (?,?)', [chatId, teacherId]);
    var chart = "Расписание занятий:\n"
    try {
        var data = await db.query("SELECT * FROM chart where group_id = ? ORDER BY day", groupId);
        for (var i = 0;i<data[0].length;i++) {
            var info = data[0][i]; 
            var dayfull = info["day"].toString();
            //console.log(dayfull)
            var day = dayfull.split(" ");
            chart+="День " + (i+1) + ": " + day[0] + " " + day[1] + " " + day[2] + " \nВремя: " + info["start_time"] + ":00-" + info["finish_time"] + ":00\n";
        }
        chart+="\nРежим чата будет открыт ровно в момент начала урока! Все ваши сообщения будут отправлены преподавателю и всем членам группы (если занятие групповое)";
        //console.log(data);
        bot.sendMessage(chatId, chart);
        var is = await db.query("SELECT rate_id FROM gr WHERE group_id = ?", [groupId]);
        var rate_id = is[0][0]["rate_id"];
        if (rate_id!=1) {
            await bot.sendMessage(chatId, "Также напоминаем что вам нужно будет оплатить занятия через /pay до начала 1го урока иначе доступ к уроку будет закрыт!", commands);
        } else {
            await db.query("INSERT INTO free (chat_id, teacher_id) VALUES (?,?)", [chatId, teacherId]);
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
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
                    await bot.sendPhoto(chatS, fileId, { caption: name+": "+title });
                } catch (err) {
                    console.log(err);
                }
            }

            if (type == 2) {
                console.log("HEREEEEEEEEEE")
                // await bot.sendMessage(chatS, name + ':');
                console.log(fileId);
                try{
                    await bot.sendVoice(chatS, fileId, { caption: name+": "+title });
                } catch (es) {
                    console.log(es);
                }
                
            }
            if (type == 3) {
                //TO DO
                //bot.send
                // await bot.sendMessage(chatS, name + ':');
                await bot.sendDocument(chatS, fileId, { caption: name+": "+title });
            }
            if (type == 4) {
                // await bot.sendMessage(chatS, name + ':');
                await bot.sendVideo(chatS, fileId, { caption: name+": "+title });
                //bot.forwardMessage(chatS, fromChat, messageId);
            }
        }
    } catch (err) {
        //console.log(err);
    } finally {
        db.end();
    }



    await axios.post('https://' + web_port + '/message', {
        notice: 0,
        content : content,
        type: type,
        group_id:group_id,
        student_id:student_id,
        title: title
    }).then(function(res) {
        // console.log(res);
    }).catch(function(err) {
        // console.log(err);
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
        await db.end();
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
        await db.end();
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
        await db.end();
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
        // console.log(err);
        return "error";
    }
    var start = arr[0];
    var finish = arr2[0];
    console.log(start, finish);
    if (parseInt(start)<0 || parseInt(start) >24) {
        return "error";
    }
    if (parseInt(start)>=parseInt(finish)) {
        return "error";
    }
    if (day=="monday") nday =1;
    else if (day=="tuesday") nday =2;
    else if (day=="wednesday") nday =3;
    else if (day=="thursday") nday =4;
    else if (day=="friday") nday =5;
    else if (day=="saturday") nday =6;
    else if (day=="sunday") nday =0;
    else {
        // console.log(day);
        return "error";
    }
    console.log("NDAY", nday, startfull, finishfull, type, free);
    console.log(nday);
    var db = await connect();
    var data;
    try{
        data = await db.query("SELECT student_id from student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        // console.log(err)
        await db.end();
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
                // console.log(err);
                return "error";
            }
            await db.end();
            return req;
        }
        console.log(ans);
        for (var i=0;i<ans.length;i++) {
            var st = ans[i].start_time;
            var fi = ans[i].finish_time;
            if (parseInt(start)>parseInt(st) && parseInt(start)<parseInt(fi)) {
                await db.end();
                console.log(st);
                return "error";
            }
            if (finish>st && finish<fi) {
                await db.end();
                console.log("err");
                return "error";
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
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
    db.end();
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
const choices = {
    parse_mode: "Markdown",
    reply_markup: {
        keyboard: [["a"], ["b"], ["c"], ["d"]],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
async function sendQuestion(i, chatId) {
    var data = await getQuestion(i, chatId);
    var variants = await getVariants(i, chatId)
    let a = await bot.sendMessage(chatId, data);
    var path = './photos/' + i + '.png'
    var check = await isPhotoExists(i, chatId);
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
        answerCallbacks[chatId] = async function (answer) {
            var res = answer.text;
            var check = await checkAnswer(i, res, chatId);
            if (i==1) {
                if (results[chatId]==null) results[chatId]={};
                results[chatId].correct = 0;
            }
            if (check) {
                results[chatId]["correct"]++;
                await bot.sendMessage(chatId, "Правильно!:)")
            } else {
                await bot.sendMessage(chatId, "Не правильно!:(")
            }
            if (i==10) {
                if (results[chatId].correct<5) {
                    await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                    let result = results[chatId]["correct"];
                    results[chatId] = null;
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10);
                    }, 1000);
                    let lvl = await getLevel(chatId, result, i);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш уровень: " + 1 + "\nДля того чтобы точно определить ваш уровень, вам следует пройти бесплатный урок с преподавателем.");
                    }, 1000);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Узнайте наши цены по /info ! Узнайте как проходят наши занятия по /classes ! И задайте вопрос моему создателю по /question !", commands)
                    }, 2000);
                    test[chatId]=true;   
                    return;
                } else {
                    let result = results[chatId]["correct"];
                    await bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10 + " Переходим на следующий уровень!");
                    results[chatId].correct = 0;   
                }
            }
            if (i==20) {
                if (results[chatId].correct<5) {
                    await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                    let result = results[chatId]["correct"];
                    results[chatId] = null;
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10);
                    }, 1000);
                    let lvl = await getLevel(chatId, result, i);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш уровень: " + 2 + "\nДля того чтобы точно определить ваш уровень, вам следует пройти бесплатный урок с преподавателем.");
                    }, 1000);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Узнайте наши цены по /info ! Узнайте как проходят наши занятия по /classes ! И задайте вопрос моему создателю по /question !", commands)
                    }, 2000);
                    test[chatId]=true;   
                    return;
                } else {
                    let result = results[chatId]["correct"];
                    await bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10 + " Переходим на следующий уровень!");
                    results[chatId].correct = 0;   
                }
            }
            if (i==30) {
                if (results[chatId].correct<5) {
                    await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                    let result = results[chatId]["correct"];
                    results[chatId] = null;
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10);
                    }, 1000);
                    let lvl = await getLevel(chatId, result, i);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш уровень: " + 3 + "\nДля того чтобы точно определить ваш уровень, вам следует пройти бесплатный урок с преподавателем.");
                    }, 1000);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Узнайте наши цены по /info ! Узнайте как проходят наши занятия по /classes ! И задайте вопрос моему создателю по /question !", commands)
                    }, 2000);
                    test[chatId]=true;
                    return;
                } else {
                    let result = results[chatId]["correct"];
                    await bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10 + " Переходим на следующий уровень!");
                    results[chatId].correct = 0;   
                }
            }
            if (i==40) {
                if (results[chatId].correct<5) {
                    await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                    let result = results[chatId]["correct"];
                    results[chatId] = null;
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10);
                    }, 1000);
                    let lvl = await getLevel(chatId, result, i);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш уровень: " + 4 + "\nДля того чтобы точно определить ваш уровень, вам следует пройти бесплатный урок с преподавателем.");
                    }, 1000);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Узнайте наши цены по /info ! Узнайте как проходят наши занятия по /classes ! И задайте вопрос моему создателю по /question !", commands)
                    }, 2000);
                    test[chatId]=true;   
                    return;
                } else {
                     await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
                    let result = results[chatId]["correct"];
                    results[chatId] = null;
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш результат : " + result + " правильных ответов из " + 10);
                    }, 1000);
                    let lvl = await getLevel(chatId, result, i);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Ваш уровень: " + 5 + "\nДля того чтобы точно определить ваш уровень, вам следует пройти бесплатный урок с преподавателем.");
                    }, 1000);
                    await setTimeout(function() {
                        bot.sendMessage(chatId, "Узнайте наши цены по /info ! Узнайте как проходят наши занятия по /classes ! И задайте вопрос моему создателю по /question !", commands)
                    }, 2000);
                    test[chatId]=true;     
                }    
            }
            if (i<40) {
                await setTimeout(function() {
                    sendQuestion(i+1, chatId);
                }, 1000);
            }
        };
    })
    return "yes";
}

async function getVariants(i, chatId) {
    db = await connect();
    let ageinfo;
    try {
        ageinfo = await db.query("SELECT age FROM student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err.message);
    }
    let age = ageinfo[0][0]["age"];
    var test;
    if (age==0) {
        test = "test0"; 
    } else {
        test = "test1";
    }

    let data;
    try {
        data = await db.query("SELECT variants as ans FROM " + test + " WHERE quest_id = ?;", [i]);
        console.log(data);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
    console.log(data[0][0].ans);
    var arr= data[0][0].ans.split("%%");
    var ans = "\n";
    for (var i=0;i<arr.length;i++) {
        ans += arr[i]+"\n";
    }
    db.end();
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
    await db.end();
}
async function getQuestion(i, chatId) {
    db = await connect();
    let ageinfo;
    try {
        ageinfo = await db.query("SELECT age FROM student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err.message);
    }
    let age = ageinfo[0][0]["age"];
    console.log(age);
    var test;
    if (age==0) {
        test = "test0"; 
    } else {
        test = "test1";
    }
    let data;
    try {
        data = await db.query("SELECT quest_title as ans FROM " + test + " WHERE quest_id = ?;", [i]);
        console.log(data[0][0]);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
    var arr="";
    arr+=data[0][0].ans;
    db.end();
    return arr;
}
async function checkAnswer(i, res, chatId) {
    var db = await connect();
    let ageinfo;
    try {
        ageinfo = await db.query("SELECT age FROM student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err.message);
    }
    let age = ageinfo[0][0]["age"];
    console.log(age);
    var test;
    if (age==0) {
        test = "test0"; 
    } else {
        test = "test1";
    }
    let data;
    try{
        data  = await db.query("SELECT correct as ans FROM " + test + " WHERE quest_id = ?;", [i]);
        //console.log(data[0][0]);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
    var ans = data[0][0].ans;
    db.end();
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
    } finally {
        await db.end();
    }
    // db.end();
}
async function notLevel(chatId) {
    let db = await connect();
    var query = "SELECT * FROM student WHERE chat_id = ? AND lvl = 8";
    //console.log(query);
    var data = await db.query(query, [chatId]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    await db.end();
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
    await db.end();
    return (data[0].length>0);
}
async function isPhotoExists(i, chatId) {
    let db = await connect();
     let ageinfo;
    try {
        ageinfo = await db.query("SELECT age FROM student WHERE chat_id = ?", [chatId]);
    } catch (err) {
        console.log(err.message);
    }
    let age = ageinfo[0][0]["age"];
    var test;
    if (age==0) {
        test = "test0"; 
    } else {
        test = "test1";
    }
    var query = "SELECT * FROM " + test + " WHERE quest_id = ? AND photo IS NOT NULL";
    //console.log(query);
    var data = await db.query(query, [i]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    await db.end();
    return (data[0].length>0);
}

async function isAudioExists(i) {
    let db = await connect();
    var query = "SELECT * FROM test1 WHERE quest_id = ? AND audio IS NOT NULL";
    //console.log(query);
    var data = await db.query(query, [i]);
    //console.log("It is data " + chatId + ":", data);
    //console.log("check", data[0].length!=0)
    await db.end();
    return (data[0].length>0);
}

async function setAva(chatId) {
    var user_profile = await bot.getUserProfilePhotos(chatId).then (async function(res) {
        console.log(res.photos);
        var photo_id = res.photos[0][res.photos[0].length-1].file_id;
        var photo = await bot.getFile(photo_id).then( async function (result) {
            console.log(result)
            var db = await connect();
            var file_path = result.file_path;
            var photo_url = `https://api.telegram.org/file/bot${token}/${file_path}`
            try {
                await db.query("UPDATE student SET ava = ? where chat_id = ?", [photo_url, chatId]);
            } catch (err) {
                console.log(err);
            } finally {
                await db.end();
            }
        });

    });

}

async function getFeedback(chatId, teacherId) {
    var db = await connect();
    var info = await db.query("SELECT nles, student_id FROM student WHERE chat_id = ?",[chatId]);
    // if (info[0][0]["nles"]!=0) {
    //     return;
    // }
    var studentId = info[0][0]["student_id"];
    // var data = await db.query('SELECT rate_id from gr WHERE group_id = ?', [groupId]);
    var rateId = requests[chatId]["rate_id"];
    console.log(rateId);
    if (rateId==1) {
        if (freeLessons[chatId]==null) freeLessons[chatId]=0;
        await bot.sendMessage(chatId, "Вы только что закончили бесплатный урок с преподавателем! Хотите ли вы продолжить обучение с данным преподавателем?", lvlans).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                var res = answer.text;
                if (res == 'No') {
                    var txt = "";
                    if (freeLessons[chatId]==3) {
                        txt="У вас больше нету возможности пройти бесплатный урок. Вы уже прошли 3 бесплатных урока,"
                    } else {
                        freeLessons[chatId]++;
                        txt = "У вас будет возможность еще на " + (3-freeLessons[chatId]) + " пробных уроков,"
                    }
                    await bot.sendMessage(chatId, "В таком случае подайте заявку заново. " + txt+ " для этого подайте заявку по /request.", commands);
                    db.query('UPDATE student SET nles = 1 WHERE chat_id = ?', [chatId]);
                } else {
                    //should take teacher id
                    var teacher = await db.query('SELECT teacher_id, free_id from free where chat_id = ?', [chatId]);
                    var max = 0;
                    var teacherId;
                    for (var i =0;i<teacher[0].length;i++) {
                        if (teacher[0][i]["free_id"]>max) {
                            max = teacher[0][i]["free_id"];
                            teacherId = teacher[0][i]["teacher_id"];
                        }
                    }
                    chosen[chatId] = teacherId;
                    await bot.sendMessage(chatId, tariffs, lesson);
                }
            }
        })

    } else {
        await bot.sendMessage(chatId, "Оцените вашего преподавателя по 10-бальной шкале:", feedback).then(() => {
            answerCallbacks[chatId] = async function(answer) {
                var res = answer.text;
                await db.query('INSERT INTO rating (student_id, teacher_id) VALUES (?, ?)', [studentId, teacherId]); 
                await bot.sendMessage(chatId, "Спасибо большое за оценку! Вы вносите большой вклад в улучшение качества занятий! Подавайте заявку на следующие занятия по /request и узнавайте про тарифы на /info!", commands);
            }
        })
    }
    await db.end();
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
  

async function sendTest(chatId, teacherId) {
    await bot.sendMessage(chatId, "Теперь для получения сертификата вам осталось пройти заключительный тест! Готовы начать тест?", ready).then(() =>{
        answerCallbacks[chatId] = async function(answer) {
            if (answer.text!="Yes") {
                await sendTest(chatId, teacherId);
                return;
            }
            var db = await connect();
            var info = await db.query("SELECT lvl from student where chat_id = ?", [chatId]);
            var data = await db.query("SELECT test_id from test where teacher_id = ? and test_lvl = ?", [teacherId, info[0][0]["lvl"]]);
            await db.end();
            await sendQuest(1, data[0][0]["test_id"],chatId, 0);
        }
    })
}

async function getQuest(i, testId, min) {
    db = await connect();
    var data;
    try {
        data = await db.query("SELECT quest_title as ans, min(quest_id), variants, correct, weight FROM question WHERE quest_id>? and test_id = ?;", [min, testId]);
        console.log(data);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
    var arr={};
    if (data[0][0]["ans"]==null) return null;
    var text = "";
    text+= i + "th question:\n" + data[0][0].ans;
    arr["text"] = text;
    arr["min"] = data[0][0]["min(quest_id)"];
    var varr= data[0][0]["variants"].split("%%");
    arr["variants"]=""
    for (var j=0;j<varr.length-1;j++) {
        arr["variants"]+= String.fromCharCode(97 + j) + ") " + varr[j] +'\n';
    }
    arr["correct"] = data[0][0]["correct"];
    arr["weight"] = data[0][0]["weight"];
    db.end();
    console.log(arr);
    return arr;
}

async function sendQuest(i, testId, chatId, min) {
    var arr = await getQuest(i, testId, min);
    if (arr==null) {
        await bot.sendMessage(chatId, "Тест завершен, поздравляем!");
        let result = results[chatId]["correct"];
        let overall = results[chatId].overall;
        results[chatId] = null;
        await bot.sendMessage(chatId, "Ваш результат : " + result + " баллов из " + overall);
        await bot.sendMessage(chatId, "Вы успешно прошли курс! Спасибо за то что были с нами, с любовью Smartchat<3.\n Под конец вашего курса просим оценить вашего преподавателя!");
        var db = await connect();
        var data = await db.query('SELECT teacher_id FROM test where test_id = ?', [testId]);
        var info = await db.query('SELECT student_id FROM student where chat_id = ?', [chatId]);
        var studentId = info[0][0]["student_id"];
        var teacherId = data[0][0]["teacher_id"];
        await db.query('INSERT INTO result (student_id, test_id, count) VALUES (?,?,?)', [studentId, testId, result]);
        try {
            await axios.post('https://' + web_port + '/message', {
                notice: 4,
                student_id:studentId
            }).then(function(res) {
                // console.log(res);
            }).catch(function(err) {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        } finally {
            await db.end();
        }
        await getFeedback(chatId, teacherId);
        // bot.sendMessage(chatId, "Ваш уровень: " + lvl);
        // bot.sendMessage(chatId, "Отлично! Узнайте наши тарифы по /info и отправьте заявку для записи на бесплатное/групповое/индивидуальное занятие  с помощью /request. Ввм нужно будет заполнить удобные для вас дни и время! ")
        // test[chatId]=true;
        return;
    }
    // console.log(arr["text"]);
    await bot.sendMessage(chatId, arr["text"]);
    await bot.sendMessage(chatId, arr["variants"], choices).then(async function () {
        answerCallbacks[chatId] = async function (answer) {
            var res = answer.text;
            var check = (arr["correct"]==res);
            if (i==1) {
                if (results[chatId]==null) results[chatId]={};
                results[chatId].correct = 0;
                results[chatId].overall = 0;
            }
            results[chatId].overall+=arr["weight"];
            if (check) {
                results[chatId]["correct"]+=arr["weight"];
            }
            await sendQuest(i+1, testId, chatId, arr["min"]);
        };
    });
    return "yes";
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

// app.post('/bot', ctx => {
//     console.log(ctx);
//     ctx.status = 200;
//     var body = ctx.req.body;
//     bot.processUpdate(body);
// })
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
                    console.log(chats[i]["chat_id"], req.body.text);
                    await bot.sendMessage(chats[i]["chat_id"], req.body.text);
                }
                // await bot.sendMessage(chatId, text);
            } catch(err) {
                console.log(err)
            } finally {
                await database.end();
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice == 1) {
        if (req.body.group_id==null || req.body.content==null || req.body.type==null || !req.body.teacher_name) {
            console.log("Нету чего-то из данных!");
            res.json({success: false, msg:'ERROR OCCURED 1'});
        } else {
            var groupId = req.body.group_id;
            var content = req.body.content;
            var type = req.body.type;
            var teacherName = req.body.teacher_name;
            var db = await connect();
            try {
                var students = await db.query("SELECT chat_id FROM student WHERE group_id = ?", [groupId]);
                for (var i=0;i<students[0].length;i++) {
                    if (type==0) {
                        await bot.sendMessage(students[0][i]["chat_id"], `${teacherName}` + ':\n' + content);
                    } else if (type==1) {
                        await bot.sendPhoto(students[0][i]["chat_id"], content);
                    } else if (type==2) {
                        await bot.sendAudio(students[0][i]["chat_id"], content);
                    } else if (type==3) {
                        await bot.sendDocument(students[0][i]["chat_id"], content);
                    } else if (type==4) {
                        await bot.sendVideo(students[0][i]["chat_id"], content);
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                await db.end();
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice == 2) {
        if (req.body.text==null || req.body.chat_id==null) {
            res.json({success: false, msg: 'ERROR OCCURED 2'});
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
            res.json({success: false, msg: 'ERROR OCCURED 3'});
        } else {
            try{
                await getMessage(notice, req.body.chat_id, req.body.text, null);
            } catch(err) {
                console.log(err)
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice==4) {
        if (req.body.chats == null || req.body.teacher_id == null) {
            res.json({success: false, msg: 'ERROR OCCURED 4'});
        } else {
            var chats = req.body.chats;
            try {
                for (var j=0;j<chats.length;j++) {
                    console.log(requests[chats[j]["chat_id"]]["rate_id"]);
                    if (requests[chats[j]["chat_id"]]["rate_id"]!=1) {
                        await sendTest(chats[j]["chat_id"], req.body.teacher_id);
                    }
                    if (requests[chats[j]["chat_id"]]["rate_id"]==1) {
                        await getFeedback(chats[j]["chat_id"], req.body.teacher_id);
                    }
                }
            } catch (err) {
                console.log(err);
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    } else if (notice==5) {
        if (!req.body.content || !req.body.title || !req.body.chat_id) {
            res.json({success: false, msg: "ERROR OCCURED 5"});
        } else {
            var chatId = req.body.chat_id;
            try {
                await bot.sendMessage(chatId, req.body.title);
                await bot.sendDocument(chatId, req.body.content);
            } catch (err) {
                console.log('ERROR 5 WITH CONTENT OR TITLE!');
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.title});
        }
    } else if (notice==6) {
        if (req.body.group_id==null) {
            res.json({success: false, msg: 'ERROR OCCURED 6'});
        } else {
            var db = await connect();
            try{
                var data = await db.query('SELECT chat_id from student where group_id = ?', [req.body.group_id]);
                var chats = data[0];
                for (var j=0;j<chats.length;j++) {
                    await getMessage(notice, chats[j]["chat_id"], null, req.body.group_id);
                }
            } catch(err) {
                console.log(err)
            }
            res.json({success: true, msg: 'Successfuly got a message from user.', text: "The text is :" + req.body.text});
        }
    }
})

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
