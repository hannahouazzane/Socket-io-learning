const { test, expect } = require("@playwright/test");

test("check main heading", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("Welcome to Tik tac toe!")).toBeVisible();
});

/// test to see what happens when someone clicks
// open two seperate browsers
// enter in a number

test("browser-function", async ({ browser }) => {
  async function createTwoBrowsers() {
    let page = await browser.newContext.newPage();
    page.on("console", (msg) => console.log(msg.text()));
    console.log(page);

    return page;
  }

  const hannahPage = await browser.newContext.newPage();

  await expect(hannahPage.getByText("Welcome to Tik tac toe!")).toBeVisible();
});

test("display-grid", async ({ browser, page }) => {
  const playerOne = await browser.newContext();
  const playerOnePage = await playerOne.newPage();
  await playerOnePage.goto("http://localhost:3000/");
  await playerOnePage.locator("#room-number").fill("22");
  await playerOnePage.click("#submit-room");

  const playerTwo = await browser.newContext();
  const playerTwoPage = await playerTwo.newPage();
  await playerTwoPage.goto("http://localhost:3000/");
  await playerOnePage.locator("#room-number").fill("22");
  await playerTwoPage.click("#submit-room");

  const grid = playerTwoPage.getByTestId("testing");
  setTimeout(async () => {
    await expect(grid).toHaveCSS("display", "block");
  }, 1000);

  /// assert that the grid display will be true
});

/// test for winning

/// test for drawing

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
