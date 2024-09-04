const puppeteer = require("puppeteer");

const websiteAddress = "https://www.youtube.com/";
async function launch() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(websiteAddress, {
    waitUntil: "networkidle2",
  });

  return { page, browser };
}

// Take page screenshot
async function takeScreenshot() {
  const { page, browser } = await launch();
  await page
    .screenshot({
      path: "screenshot.png",
    })
    .then((_) => {
      console.log("It is done");
    });

  await browser.close();
}
// takeScreenshot()

// count buttons in the page
async function countButton() {
  const page = await launch();
  const buttons = await page.$$("#search-icon-legacy");
  console.log(buttons.length);
}
//countButton();

//screenshot by searching
async function searchResultScreenshot() {
  const { page, browser } = await launch();
  await page.type("[name='search_query']", "react js");
  await page.click("#search-icon-legacy");
  setTimeout(async () => {
    await page.screenshot({
      path: "seachResult.png",
    });
    await browser.close();
  }, 4000);
}
searchResultScreenshot();
