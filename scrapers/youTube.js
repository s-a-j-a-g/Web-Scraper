import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: "false" });
  const page = await browser.newPage();

  await page.goto("https://www.youtube.com");

  await page.waitForSelector("#search");

  await page.evaluate(() => {
    const searchInput = document.querySelector("#search");
    searchInput.value = "Baby Shark";
  });

  await page.click("#search-icon-legacy");

  await page.waitForNavigation();

  // Perform further actions with the search results if needed

  await browser.close();
})();

// import puppeteer from "puppeteer";

// (async () => {
//   const browser = await puppeteer.launch({ headless: "false" });
//   const page = await browser.newPage();

//   await page.goto("https://developer.chrome.com/");

//   // Set screen size
//   await page.setViewport({ width: 1080, height: 1024 });

//   // Type into search box
//   await page.type(".search-box__input", "automate beyond recorder");

//   // Wait and click on first result
//   const searchResultSelector = ".search-box__link";
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     "text/Customize and automate"
//   );
//   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);

//   await browser.close();
// })();