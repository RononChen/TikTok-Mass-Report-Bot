import fetch from "node-fetch"
import HttpsProxyAgent from "https-proxy-agent"
import chalk from 'chalk'
import fs from 'fs'
import gradient from 'gradient-string'
import readline from 'readline'

console.error = function() {}
process.on('uncaughtException' || "unhandledRejection", function (err) {
  null
});

function ascii() {
  console.clear()
  const ascii = gradient.vice(`
              ▄▄▄▄▄▪  ▄ •▄ ▄▄▄▄▄      ▄ •▄     ▄▄▄▄· ▄• ▄▌▄▄▌  ▄ •▄     ▄▄▄  ▄▄▄ . ▄▄▄·      ▄▄▄  ▄▄▄▄▄
              •██  ██ █▌▄▌▪•██  ▪     █▌▄▌▪    ▐█ ▀█▪█▪██▌██•  █▌▄▌▪    ▀▄ █·▀▄.▀·▐█ ▄█▪     ▀▄ █·•██  
              ▐█.▪▐█·▐▀▀▄· ▐█.▪ ▄█▀▄ ▐▀▀▄·    ▐█▀▀█▄█▌▐█▌██▪  ▐▀▀▄·    ▐▀▀▄ ▐▀▀▪▄ ██▀· ▄█▀▄ ▐▀▀▄  ▐█.▪
              ▐█▌·▐█▌▐█.█▌ ▐█▌·▐█▌.▐▌▐█.█▌    ██▄▪▐█▐█▄█▌▐█▌▐▌▐█.█▌    ▐█•█▌▐█▄▄▌▐█▪·•▐█▌.▐▌▐█•█▌ ▐█▌·
              ▀▀▀ ▀▀▀·▀  ▀ ▀▀▀  ▀█▄▀▪·▀  ▀    ·▀▀▀▀  ▀▀▀ .▀▀▀ ·▀  ▀    .▀  ▀ ▀▀▀ .▀    ▀█▄▀▪.▀  ▀ ▀▀▀                                                        
  `)
  console.log(ascii)
  console.log(chalk.grey('----------------------------------------------------------------------------------------------------------------------'))
  console.log(chalk.white('    https://github.com/Lorenzik/TMRB'),chalk.grey(" | "),chalk.white('https://github.com/Lorenzik/TMRB'),)
  console.log(chalk.grey('----------------------------------------------------------------------------------------------------------------------\n'))
}

ascii()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`${chalk.gray(`${new Date().toLocaleTimeString()} `) + chalk.grey(`[`) + chalk.cyan.bold(`?`) + chalk.grey(`]`)} Enter the request URL from Inspect Element: `, async function (answer) {

  ascii()

  var reportCount = 1
  var text = fs.readFileSync('proxies.txt','utf8')
  var proxies = text.split(/\r?\n/)

  for(let proxy of proxies) {
    setInterval(async() => {
            const proxyAgent = new HttpsProxyAgent(`http://${proxy}`);
            const url = await fetch(answer, { agent: proxyAgent});
            const json = await url.json();
            console.log(chalk.gray(`           ${new Date().toLocaleTimeString()}  `) + gradient.vice(` Send report with ID: ${json.extra.logid} | Report count: ${reportCount}`))
            reportCount++
        }, 400);
  }

})
