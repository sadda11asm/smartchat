module.exports = {
    sendNotice: async function sendNotice(chatId) {
        if (requests[chatId]!=null && requests[chatId]["lessons"]!=null) {
            console.log("deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            await axios.post('http://192.168.1.102:3000/message', {
                    notice: 1
                }).then(function(res) {
                    //console.log(res);
                }).catch(function(err) {
                    console.log(err);
                })
            await bot.sendMessage(chatId,"Чтобы удалить заявку перейдите по /delete. Когда один из преподавателей добавит вас в свою группу мы Вам дадим знать!");
        } else {
            await bot.sendMessage(chatId,"Не нашлось больше преподавателей на ваше время либо Вы не выбрали не одного преподавателя из возможных! Пожалуйста подайте заявку еще раз и выберете вашего преподавателя!");
        }
    },
    sendRequests: async function sendRequests(chatId,studentId, rate_id, studLvl, teachers) {
        var database = await connect();
        for(var i = 0;i<teachers.length;i++) {
            var info = await database.query("SELECT login, lvl FROM teacher where teacher_id = ? ", [teachers[i]["teacher_id"]]);
            var lvl = info[0][0]["lvl"];
            var login = info[0][0]["login"];
            await sendRequest(chatId,studentId, rate_id, lvl, studLvl, login, i, teachers);
        }
        await database.close();
    }, 
    sendRequest: async function sendRequest(chatId, studentId, rate_id, lvl, studLvl, login, i, teachers) {
        var database = await connect();
        if (lvl>studLvl) {
            await bot.sendMessage(chatId, "Преподаватель с ником: " + login + "\n Уровень: " + lvl, lvlans);
            var answer3  = await once();
            var res3 = answer3.text;
            console.log(res3);
            if (res3 == "Yes") {
                console.log("i", i);
                try{
                    await database.query("INSERT INTO req (finish_time, start_time, student_id, nday, rate_id, teacher_id) VALUES (?,?,?,?,?,?)",[teachers[i]["finish_time"], teachers[i]["start_time"],studentId, teachers[i]["nday"], rate_id, teachers[i]["teacher_id"]]);
                } catch (err) {
                    console.log(err);
                }
                requests[chatId]["lessons"] = 1;
            } else {
                console.log("i", i);
                if (i==(teachers.length-1)) {
                    await database.close();
                }
            }
        }
    },
    proposeTeacher : async function proposeTeacher(chatId, req) {
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
    },  
    getNLes: async function getNLes(chatId) {
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
    }, 
    deleteGroup: async function deleteGroup(chatId) {
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
    },    
    sendNotification: async function sendNotification(studentId, groupId, groupName, teacherId, deleted) {
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
    },
    getPath: async function getPath(file_id) {
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
    },
    updateInfo: async function updateInfo(chatId, item, val) {
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
    },
    getMessage: async function getMessage(chatId, text, groupId) {
        await bot.sendMessage(chatId, text);
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
    },
    sendMessage: async function sendMessage(chatId, content, type, fromChat, messageId, fileId, caption) {
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
            student_id:student_id
        }).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        })
    },
    deleteRequests: async function deleteRequests(chatId) {
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
    },
    getId: async function getId(chatId) {
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
    },
    getGroup: async function getGroup(chatId) {
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
    },
    getRequest : async function  getRequest(chatId, day, startfull, finishfull, type, free) {
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
            console.log(ans);
            for (var i=0;i<ans.length;i++) {
                var st = ans[i].start_time;
                var fi = ans[i].finish_time;
                if (start>st && start<fi) {
                    db.close();
                    return "error";
                }
                if (finish>st && finish<fi) {
                    db.close();
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
    },
    sendQuestion: async function sendQuestion(i, chatId) {
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
    },
    getVariants: async function getVariants(i) {
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
    },
    getLevel: async function getLevel(chatId, res, num) {
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
    },
    setLevel: async function setLevel(chatId, set) {
        var db = await connect();
        let query = "UPDATE student SET lvl = " + set + " WHERE chat_id = " + chatId +";"
        console.log(query);
        await db.query(query);
        db.close();
    },
    getQuestion: async function getQuestion(i) {
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
    },
    checkAnswer: async function checkAnswer(i, res) {
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
    },
    insert: async function insert(chatId, item, value) {
        let db = await connect();
        var query = "UPDATE student SET " + item + " = '" + value + "' " + "WHERE chat_id = " + chatId + " ;"
        console.log("insert", query); 
        try {
            let res = await db.query(query);
        } catch (err) {
            console.log (err)
        }
        db.close();
    },
    notLevel: async function notLevel(chatId) {
        let db = await connect();
        var query = "SELECT * FROM student WHERE chat_id = ? AND lvl = 8";
        //console.log(query);
        var data = await db.query(query, [chatId]);
        //console.log("It is data " + chatId + ":", data);
        //console.log("check", data[0].length!=0)
        db.close();
        return (data[0].length>0);
    },
    notExists:async function notExists(chatId, item) {
        let res = await isExists(chatId, item);
        return (!res);
    },
    isExists: async function isExists(chatId, item) {
        let db = await connect();
        var query = "SELECT * FROM student WHERE chat_id = ? AND " + item + " IS NOT NULL";
        //console.log(query);
        var data = await db.query(query, [chatId]);
        //console.log("It is data " + chatId + ":", data);
        //console.log("check", data[0].length!=0)
        db.close();
        return (data[0].length>0);
    },
    isPhotoExists : async function isPhotoExists(i) {
        let db = await connect();
        var query = "SELECT * FROM test1 WHERE quest_id = ? AND photo IS NOT NULL";
        //console.log(query);
        var data = await db.query(query, [i]);
        //console.log("It is data " + chatId + ":", data);
        //console.log("check", data[0].length!=0)
        db.close();
        return (data[0].length>0);
    },
    isAudioExists : async function isAudioExists(i) {
        let db = await connect();
        var query = "SELECT * FROM test1 WHERE quest_id = ? AND audio IS NOT NULL";
        //console.log(query);
        var data = await db.query(query, [i]);
        //console.log("It is data " + chatId + ":", data);
        //console.log("check", data[0].length!=0)
        db.close();
        return (data[0].length>0);
    },
    setAva: async function setAva(chatId) {
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
    
}