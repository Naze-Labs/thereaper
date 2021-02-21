const puppeteer = require("puppeteer");
const config = require("./../../utils/config/newEgg");

module.exports = () => {
  console.log({ config });
};

async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

async function run() {
  await report("Started");

  const browser = await puppeteer.launch({
    headless: false,
    product: "chrome",
    defaultViewport: { width: 1150, height: 768 }
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  try {
    let popOutChecker = setInterval(async () => {
      try {
        let homePageContent = await page.content();
        let popupContent = homePageContent.indexOf("popup-wrapper");
        let popupContent1 = homePageContent.indexOf("Popup_Masks");
        let popupContent2 = homePageContent.indexOf(
          `<i class="fas fa-times"></i>`
        );
        let popupContent3 = homePageContent.indexOf(
          `<div class="modal-title">Before You Continue...</div>`
        );

        if (popupContent !== -1) {
          console.log("we just found a pop up");
          await page.click("#popup-close");
          await page.waitForTimeout(1000);
          console.log("we closed a popup");
        } else if (popupContent1 !== -1) {
          console.log("we just found a pop up");
          await page.click("#Popup_Masks", { clickCount: 3 });
          await page.click(".fa-times", { clickCount: 2 });
          await page.click(".modal-content > .modal-header > button.close");
          await page.waitForTimeout(1000);
          console.log("we closed a popup");
        } else if (popupContent2 !== -1) {
          console.log("we just found a pop up");
          await page.click(".fas.fa-times");
          await page.waitForTimeout(1000);
          console.log("we closed a popup");
        } else if (popupContent3 !== -1) {
          console.log("we just found a pop up");
          await page.click(".modal-footer > button.btn.btn-secondary");
          await page.waitForTimeout(1000);
          console.log("we closed a popup");
        } else {
          console.log("no pop up");
        }
      } catch (error) {}
    }, 5000);

    let loginCount = 8;
    while (loginCount > 1) {
      try {
        await page.goto("https://www.newegg.com", { waitUntil: "load" });

        await page.waitFor(4000);

        let myPage = await page.content();
        let isSignedIn = myPage.indexOf(
          `https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
        );

        if (isSignedIn === -1) {
          await page.goto(config.item_url);
          await report("Checking for Item");
          await page
            .waitForTimeout(30000)
            .then(() => console.log("url am here"));
          break;
        } else {
          await report("Begin login process");
          await page.waitForSelector(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
            {
              waitUntil: "load"
            }
          );

          await page.click(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
          );
          await page.waitForSelector("#labeled-input-signEmail", {
            waitUntil: "load"
          });
          await page.type("#labeled-input-signEmail", config.email);

          await page.waitForTimeout(3000);

          await page.waitForSelector("#signInSubmit");

          setTimeout(async () => {
            await page.click("#signInSubmit", { timeout: 500 });
          }, 12000);

          await page.click("#signInSubmit", { timeout: 500 });

          await page.waitForTimeout(1500);

          await page.waitForSelector("#labeled-input-password", {
            waitUntil: "load"
          });

          await page.type("#labeled-input-password", config.password);
          await page.click("button.btn.btn-orange");

          await report("Logged in");

          await page.waitForTimeout(2000);

          await page.goto(config.item_url);

          await report("Checking for Item");

          await page.waitForTimeout(20000);
          break;
        }
      } catch (error) {
        await report("Failed to Login");
        if (loginCount < 0) {
          await report("Failed to Login");
          clearInterval(popOutChecker);
          break;
        }
      } finally {
        loginCount--;
      }
    }

    // const startTime = new Date();
    // var nowTime = new Date();
    // var timeDiffMinutes = Math.round((nowTime - startTime) / 1000) / 60;

    try {
      let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
      try {
        await page.waitForSelector(addToCartStep1);
      } catch (error) {
        await report("Item not found");
        clearInterval(popOutChecker);
      }
      await page.click(addToCartStep1, { clickCount: 3 });

      await report("product available");

      await page.waitForTimeout(3000);

      let addToCartStep2 =
        ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";

      await page.waitForSelector(addToCartStep2);

      await page.click(addToCartStep2, { clickCount: 3 });
      console.log("product added to cart");

      await page.waitForTimeout(3000);

      await page.goto("https://secure.newegg.com/shop/cart", {
        waitUntil: "load"
      });

      await page.waitForTimeout(3000);

      try {
        let checkoutButton =
          "div.summary-actions > button.btn.btn-primary.btn-wide";
        await page.waitForSelector(checkoutButton);
        await page.click(checkoutButton, { clickCount: 3 });
      } catch (error) {}

      await report("Ready To checkout");

      await page.waitForTimeout(30000);

      let ccvInput = ".retype-security-code > input.form-text.mask-cvv-4";

      try {
        await report("check started");
        await page.waitForSelector(ccvInput);
        await page.waitForTimeout(10000);
        await page.type(ccvInput, config.cv2);
      } catch (error) {
        await report("Error in CCV");
      }

      let placeOrder = "div.summary-actions > #btnCreditCard";

      try {
        await report("check started");
        await page.waitForSelector(placeOrder);
        await page.waitForTimeout(10000);
        await page.click(placeOrder, { clickCount: 3 });
        await report("Order has been placed succesfully");
      } catch (error) {
        await report("Order was not successfully placed");
      }
    } catch (error) {
      await report("Error occured in the checkout process");
    }
    clearInterval(popOutChecker);
  } catch (error) {
    await report("Error occured in the checkout process");
    clearInterval(popOutChecker);
  }
  await page.close();
  browser.close();
}

run();
