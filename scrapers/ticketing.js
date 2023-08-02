const puppeteer = require("puppeteer");

const scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  // Get Title of the Home Page
  const [title] = await page.$x(`/html/body/nav/div/div[1]/a`);
  const title_txt = await (await title.getProperty("textContent")).jsonValue();
  console.log("[HOMEPAGE]\nTitle: ", title_txt);

  const [coverImage] = await page.$x(`//*[@id="imagecover"]/img`);
  const coverImageSrc = await (await coverImage.getProperty("src")).jsonValue();
  console.log("Cover Image URL: ", coverImageSrc);

  const [userNameField] = await page.$x('//*[@id="userId"]');
  await userNameField.type(process.env.User);

  const [passwordField] = await page.$x('//*[@id="password"]');
  await passwordField.type(process.env.Password);

  const [loginButton] = await page.$x('//*[@id="formElem"]/div[4]/button');
  await loginButton.click();
  await page.waitForNavigation();

  console.log("[NEW PAGE]");
  const [agencyManagement] = await page.$x(
    `//*[@id="formElem"]/div/div/ul/a[3]`
  );
  const agencyManagement_txt = await (
    await agencyManagement.getProperty("textContent")
  ).jsonValue();
  console.log("Click: ", agencyManagement_txt);
  await agencyManagement.click();
  await page.waitForNavigation();

  console.log("[NEW PAGE]");
  const [salesAgent] = await page.$x(`//*[@id="sddm"]/li[2]/a`);
  const salesAgent_txt = await (
    await salesAgent.getProperty("textContent")
  ).jsonValue();
  console.log("Hover: ", salesAgent_txt);
  await salesAgent.hover(); // we need to do this since the agencyRegistration is not visible until we hover salesAgent

  const [agencyRegistration] = await page.$x(`//*[@id="m1"]/a[1]`);
  const agencyRegistration_txt = await (
    await agencyRegistration.getProperty("textContent")
  ).jsonValue();
  console.log("Click: ", agencyRegistration_txt);
  await agencyRegistration.click();
  await page.waitForNavigation();

  console.log("[NEW PAGE]");
  const [agency] = await page.$x(
    `//*[@id="createusr"]/table/tbody/tr[1]/td[1]`
  );
  const agency_txt = await (
    await agency.getProperty("textContent")
  ).jsonValue();
  console.log("Title: ", agency_txt);

  let agencyData = [];
  for (let index = 1; index <= 20; index++) {
    //20 represents the no. of rows in the table
    const [agency] =
      await page.$x(`//*[@id="createusr"]/table/tbody/tr[2]/td[4]/div/table/tbody/tr[${index}]/td[2]/a
    `);
    await agency.click();
    await page.waitForNavigation();

    // AGENCY ID
    const [agencyID] = await page.$x(`//*[@id="dbuser"]`);
    const agency_ID = await (await agencyID.getProperty("value")).jsonValue();

    // AGENCY NAME
    const [agencyName] = await page.$x(`//*[@id="dbusername"]`);
    const agency_Name = await (
      await agencyName.getProperty("value")
    ).jsonValue();

    // AGENCY ADDRESS
    const [agencyAddress] = await page.$x(`//*[@id="address"]`);
    const agency_Address = await (
      await agencyAddress.getProperty("value")
    ).jsonValue();

    agencyData.push({
      agencyId: agency_ID,
      agencyName: agency_Name,
      agencyAddress: agency_Address,
    });
  }

  await browser.close();
  return agencyData;
};

module.exports = scrape;
