/*CMD
  command: *
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

if(!message){ return }

let admin_tg_id = 519829299;

list = [
   { keywords: ['use this token to access the http api:'], 
       answer: 'Seems do you send private token to public chat now?🤦‍♂️\n\nYou need to reset it!' },

   { keywords: [ 'master command'], answer: "Hey! I am bot 🤖 and I was created with Master Command only. See me in the Store.",
       answerToAdmin: true }, 

   { keywords: [ 'what is bjs', 'what is the bjs'], answer: "BJS it is Bot Java Script. You can add any logic to your bot with it. See more in help",
      url: "help.bots.business/scenarios-and-bjs"
   }, 

   { url: "help.bots.business", keywords: [ 'help me', 'i need help', 'who can help' ], answer: 'I am robo 🤖\nI can help you! /teaching' },
   { url: "help.bots.business/howto", keywords: [ 'howto', "how to", "faq" ], answer: 'Seems you need HowTo?' },
   { url: "help.bots.business", keywords: [ 'admin', '@bots.business' ], answer: 'Do you really need admin?\nI can help too. I am good robo 🤖' },
   { url: "help.bots.business", keywords: [ 'help', 'i dont understand', "i don't understand" ], answer: 'Seems you need help' },
   
   { url: "https://telegra.ph/X-not-working-02-04",
     keywords: [ "not work" ], answer: 'It seems something is not working?\n Please give full issue description. ' },

   { keywords: [ 'start' ], answer: 'Do you want to /teaching?', exact:true },
   { keywords: [ 'php ', ' php' ], answer: 'PHP? Really? I love BJS only' },
   { keywords: [ 'data.' ], answer: 'Do not use data.XXX in BJS.\nDeprecated!' },

   { keywords: [ 'good morning' ], answer: 'Hello 😴' },
   { keywords: [ 'looks good', 'look good', 'looking good', 'good!', 'good news', 'good job', 'good app',
                 'really good', 'good project', 'like a good', ' is good', 'sounds good', 'so a good',
                 'great'
               ],
        answer: 'Good? Please put me 5 stars ⭐⭐⭐⭐⭐', url: 'play.google.com/store/apps/details?id=bb_app.com.bots.business' },
  
   { keywords: [ ' spam' ], answer: '@BotsBusinessAdmin, seems we have same spam' },
   { url: "status.bots.business", keywords: [ 'status' ], answer: 'Seems do you need to know uptime status?' },
]

helpLinks = [
   { url: "status.bots.business", keywords: [ 'status' ], exact:true, answerToAdmin: true },
   { url: "play.google.com/store/apps/details?id=bb_app.com.bots.business", keywords: [ 'download', 'market' ], exact:true, answerToAdmin: true },
   { url: "help.bots.business", keywords: [ 'help' ], exact:true, answerToAdmin: true },
   { url: "app.bots.business", keywords: [ 'app', 'web' ], exact:true, answerToAdmin: true },
   
   { url: "help.bots.business/scenarios-and-bjs/api-functions", keywords: [ 'api' ], exact:true, answerToAdmin: true },
   { url: "help.bots.business/scenarios-and-bjs", keywords: [ 'bjs' ], exact:true, answerToAdmin: true },
   
   { url: "telegra.ph/X-not-working-02-04",
     answer: "It seems the admin does not understand your question 🤔.\n" + 
              "\nPlease be a little more precise." +
              "\n\nAs a rule, there is enough:\n -error screen from *Error Tab* from the App\n-your *BJS code*",
     keywords: [ '?', '😥','😢','😭' ],
     reply_to_parent_reply: true,
     exact:true, answerToAdminOnly: true },

    { url: "telegra.ph/How-to-create-and-launch--the-rocket-02-12",
      answer: "It seems the admin has a very big question. See answer here",
      keywords: [ 'rocket', '🚀' ],
      exact:true, answerToAdminOnly: true,
      reply_to_parent_reply: true
    },

    { url: "help.bots.business", keywords: [ 'teach me', '/teaching' ],
        answer: 'Hey! I start the first lesson just now!\n1. Please see this Help.'+ 
                '\n2. Please see demo bots in the Store.  We have good bots and you can copy theys!'+
                '\n3. Ask good and smart questions in this chat. \nThank you!\n' },
    { keywords: [ 'hi!', 'hello', 'salom' ], answer: 'Hey!' }
]

storeBotsList = [
  { bot: 'DemoFromTableBot', keywords: ['table bot', 'tablebot'] },
  { bot: 'TalkWithAdminBot', keywords: ['talk with admin', 'with admin'] },
  { bot: 'DemoInlineKeyboardBot', keywords: ['keyboard bot'] },
  { bot: 'DemoReferalTrackingBot', keywords: ['referal bot', 'referal tracking bot', 'refferal bot', 'referral bot'] },
  { bot: 'DemoUserDataBot', keywords: ['user data bot'] },
  { bot: 'WelcomeBBBot', keywords: ['welcome bot'] },
  { bot: 'DemoStatBot', keywords: ['stat bot'] },
  { bot: 'DemoCurrencyConverterBot', keywords: ['converter bot', 'currency bot', 'currency convert'] },
  { bot: 'DemoResBot', keywords: ['res bot', 'resources bot'] },
  { bot: 'BBHelpBot', keywords: ['help bot'] },
  { bot: 'BotFather', keywords: ['father'] },
  { bot: 'DemoBlockIOBot', keywords: ['blockio bot', 'block bot'] }
]

let stext = message.toLowerCase();

function haveAnyKeyword(item){
  for(var ind in item.keywords){
    if(item.exact){
      // exact searching
      if(stext==item.keywords[ind]){ return true }
      continue;
    }

    if(stext.indexOf(item.keywords[ind])>-1){ return true }
  }
}

function getAnswerFor(item){
  let options = { is_reply: true }
  let isAdmin = (user.telegramid==admin_tg_id);
  let answerToAdmin = (item.answerToAdmin||item.answerToAdminOnly);
  
  if(isAdmin&&(!answerToAdmin)){
     // no any answer for admin
     return;
  }
  
  let answer = item.answer;
  if(!answer){ answer = "" }

  if(item.url){
    answer = answer + "\nhttp://" + item.url
  }
  
  if(!isAdmin&&(item.answerToAdminOnly)){ return }

  if(item.reply_to_parent_reply){
    if(request.reply_to_message){
       options = { reply_to_message_id: request.reply_to_message.message_id }
    }
  }
  return {text: answer, options: options}
}

function doSearch(searchList){
  let item, answer;
  for(var ind in searchList){
    item = searchList[ind];
    if(!haveAnyKeyword(item)){ continue }
    if(item.bot){
      return "We have such bot: @" + item.bot;
    }
    return getAnswerFor(item);
  }
}

function isNeedAnswer(){
  // send message no more than once every 5 minutes
  let lastAnswer = Bot.getProperty("LastAnswerInChat" + chat.chatid);
  if(lastAnswer){
    let duration = Date.now() - lastAnswer;
    if(duration < 300000){ return false }
  }
  
  return true;
}

let answer = doSearch(storeBotsList);
if(!answer){ answer = doSearch(helpLinks) }

if(!answer){
  if(isNeedAnswer()){
    answer = doSearch(list)
  }
}

if(answer){
  Bot.setProperty("LastAnswerInChat" + chat.chatid, Date.now(), "float");
  Bot.sendMessage(answer.text, answer.options);
}














