const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

let newEmployee = null;
let dismissalEmployee = null;
let ticketType = ""; // new or dismissal

if (ticketType === "new") {
  newEmployee = {
    fullName: null,
    fullNameLatin: null,
    department: null,
    supervisor: null,
    job: null,
    workingMode: null,
    releaseDate: null,
    telegram: null,
    requiredSoftware: null,
    distributionGroups: null,
    phone: null,
  };
}

if (ticketType === "dismissal") {
  dismissalEmployee = {
    fullName: null,
    dismissalDate: null,
    telegram: null,
  };
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  await page.goto("https://start.hrbox.io/");
  await page.focus("#loginform-email");
  await page.keyboard.type("a.zigunov@start.ru");
  await page.focus("#loginform-password");
  await page.keyboard.type("");
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 3000));
  await page.goto("https://start.hrbox.io/workflow/cabinet/approver");
  await new Promise((r) => setTimeout(r, 4000));
  const elem = await page.$("nobr > a");
  const link = await elem.getProperty("href");
  const URL = await link.jsonValue();
  await page.goto("http://10.101.100.31/site/login");
  await page.focus("#LoginForm_username");
  await page.keyboard.type("a.zigunov");
  await page.focus("#LoginForm_password");
  await page.keyboard.type("");
  await page.click(".btn");
  await new Promise((r) => setTimeout(r, 3000));
  await page.goto("http://10.101.100.31/request/create");
  await new Promise((r) => setTimeout(r, 1000));
  await page.focus(".select2-choice");
  await page.click(".select2-choice");
  await page.keyboard.type("HR");
  await page.keyboard.press("Enter");
  await page.click("#s2id_service");
  await page.keyboard.type("Выход / Увольнение сотрудник");
  await page.keyboard.press("Enter");
  await page.click("#Request_Name");
  await page.keyboard.type("Выход / Увольнение сотрудник");
  await page.click(".redactor-in-0");
  await page.keyboard.type(`воть ссылочка ${URL}`);
  await new Promise((r) => setTimeout(r, 1000));
  await page.focus(".btn-primary");
  await page.click(".btn-primary");
})();
