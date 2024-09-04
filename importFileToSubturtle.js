const puppeteer = require("puppeteer");
const fs = require("fs");

// Read the JSON file
const vocabularies = JSON.parse(fs.readFileSync("vocabularies.json", "utf8"));
const websiteAddress =
  "https://www.subturtle.app/dashboard/bundles/6630e5fcda2347001cd296ba";
async function launch() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(websiteAddress, {
    waitUntil: "networkidle2",
  });

  return { page, browser };
}

(async () => {
  const { page, browser } = await launch();
  await page.click("#submit-button");

  for (let vocab of vocabularies) {
    // Select the input fields and fill them with the vocabulary data
    await page.type("#english-input", vocab.word); // Replace with the actual selector for the English word input field
    await page.type("#meaning-input", vocab.meaning); // Replace with the actual selector for the meaning input field

    // Submit the form or click the add button
    await page.click("#submit-button"); // Replace with the actual selector for the submit button

    // Wait for any necessary delay or page reload
    await page.waitForTimeout(1000); // Adjust the delay as needed
  }

  // Close the browser
  await browser.close();
})();
