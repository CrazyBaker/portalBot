const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


// axios.get('https://auth.hrbox.io/auth/login?redirect_uri=https%3A%2F%2Fstart.hrbox.io&auth_tenant=start.hrbox.io').then(html => {
//     const $ = cheerio.load(html.data);
//     let text = '';
//     $('.odd > td').each((i, elem) => {
//         text += `${$(elem.text())}\n`
//     });
//     console.log(text);
// });

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 900})
    await page.goto('https://start.hrbox.io/');
    await page.focus('#loginform-email');
    await page.keyboard.type('a.zigunov@start.ru');
    await page.focus('#loginform-password');
    await page.keyboard.type('Sfers009');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 3000));
    await page.goto('https://start.hrbox.io/workflow/cabinet/approver');
    await new Promise(r => setTimeout(r, 4000));
    const elem = await page.$('nobr > a');
    const link = await elem.getProperty('href');
    const URL = await link.jsonValue();
    await page.goto('http://10.101.100.31/site/login');
    await page.focus('#LoginForm_username');
    await page.keyboard.type('a.zigunov');
    await page.focus('#LoginForm_password');
    await page.keyboard.type('Sfers009');
    await page.click('.btn');
    await new Promise(r => setTimeout(r, 3000));
    await page.goto('http://10.101.100.31/request/create');
    await new Promise(r => setTimeout(r, 1000));
    await page.focus('.select2-choice');
    await page.click('.select2-choice');
    await page.keyboard.type('HR');
    await page.keyboard.press('Enter');
    await page.click('#s2id_service');
    await page.keyboard.type('Выход / Увольнение сотрудник');
    await page.keyboard.press('Enter');
    await page.click('#Request_Name');
    await page.keyboard.type('Выход / Увольнение сотрудник');
    await page.click('.redactor-in-0');
    await page.keyboard.type(`воть ссылочка ${URL}`);
    await page.focus('.btn-primary');
    await page.click('.btn-primary');
  })();