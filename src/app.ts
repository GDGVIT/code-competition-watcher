import { Telegraf } from 'telegraf'
import { upcomingContestsCodeforces } from './api/codeforces/codeforces'
import { getCodeforcesString, getCodeChefString } from './api/apiConstants'
import { upcomingContestsCodeChef } from './api/codechef/codechef'
import { constants } from './constants'
import dotenv from 'dotenv'
dotenv.config()

let bot
if (process.env.TOKEN != null) {
  bot = new Telegraf(process.env.TOKEN)
} else {
  process.exit(2)
}

bot.start((ctx) => ctx.reply(constants.startMessage))
bot.help((ctx) => ctx.reply(constants.helpMessage))

// RESULTS
// For Codeforces:
bot.hears('1', async (ctx) => {
  const result = await upcomingContestsCodeforces()
  console.log(result.result)
  let s = ''
  for (const i of result.result) {
    s = s + '\n\n' + getCodeforcesString(i.name, i.startTimeSeconds)
  }
  ctx.reply(constants.codeforcesReply + s)
})

// For Codechef:
bot.hears('2', async (ctx) => {
  const events = await upcomingContestsCodeChef()
  console.log(events.result)
  let s = ''
  for (const i of events.result) {
    s = s + '\n\n' + getCodeChefString(i.name, i.startTime, i.startDate)
  }
  ctx.reply(constants.codeChefReply + s)
})

// Launching the bot
bot.launch()
