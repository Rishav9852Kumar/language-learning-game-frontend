const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://moenage-assesment-app.netlify.app/about', { waitUntil: 'domcontentloaded' });
    console.log("sonu1")
  
    await page.waitForSelector('.dismiss-btn', { timeout: 600000 });
  
    await page.evaluate(() => {
      console.log("sonu")
      document.querySelector('.dismiss-btn').addEventListener('click', async () => {
        await page.screenshot({ path: 'screenshot.png' });
        alert('Screenshot saved!');
      });
    });
  
    await new Promise(resolve => setTimeout(resolve, 100000));
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();