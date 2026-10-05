import { test, expect } from '@playwright/test';


// ----------------------- { NOTES } ----------------------
/*
page.getByRole()
    - Top choice
    - When to use: Buttons, links, headings, navigation bars, checkboxes, and dialogs.
    - e.g. await page.getByRole('button', { name: 'Create Account' }).click();

page.getByLabel()
    - Top Choice for form fields
    - When to use: Standard form inputs, selects, and text areas
    -       <label for="user-email">Email Address</label>
            <input id="user-email" type="email" />
        for this html code can be written like
        await page.getByLabel('Email Address').fill('alex@example.com');

page.getByPlaceholder()
    - When to use: Fields lacking a persistent visual label (e.g., quick search bars, inline filters).
    -      <input type="text" placeholder="Search repositories..." />
      for this html code can be written like
        await page.getByPlaceholder('Search repositories...').fill('playwright-core');
        
page.getByText()
    - When to use: Verifying non-interactive copy, status badges, flash error banners, or confirmation messages.Matches elements containing specific visible text.
    -       <div class="alert error">Invalid credentials provided.</div>
      for this html code can be written like
      await expect(page.getByText('Invalid credentials provided.')).toBeVisible();
      - if Exact match flag if partial matching matches too many elements
      add -> { exact: true }
      page.getByTestId()
      - Finds elements based on a dedicated test attribute
      -     <div data-testid="kanban-column-in-progress">...</div> 
        for this html code can be written like
            await page.getByTestId('kanban-column-in-progress').locator('button').first().click();
*/
// ----------------------- { NOTES ENDS} ----------------------







// test('login', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.getByLabel('Username').fill('standard_user');
//     await page.getByLabel('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();
//     // Expect a title "to contain" a substring.
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


// });


// test('check products', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.getByLabel('Username').fill('standard_user');
//     await page.getByLabel('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();
//     const products = await page.locator('.inventory_item')
//     const targetProduct = await products.filter({ hasText: 'Sauce Labs Backpack' })
//     await targetProduct.getByRole('button', { name: 'Add to cart' }).click()
//     await page.locator('.shopping_cart_container').click()
//     await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
// })
// test('check product price', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.getByLabel('Username').fill('standard_user');
//     await page.getByLabel('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();
//     const products =  page.locator('.inventory_item')
//     const targetProduct = await products.filter({ hasText: 'Sauce Labs Backpack' })
//     await expect(targetProduct.locator('.inventory_item_price')).toHaveText('$29.99')
//     const addToCartBtn = await targetProduct.locator('.btn_inventory')
//     await addToCartBtn.click()
//     await expect(addToCartBtn).toHaveText('Remove')
//     // await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
// })
test('check product quantity and max price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    const products = page.locator('.inventory_item')
    const targetProductNames = await products.locator('.inventory_item_name ').allTextContents()
    const targetProductPrices = (await products.locator('.inventory_item_price ').allTextContents()).map(x => +x.replace('$', ''))
    console.log(targetProductNames)
    console.log(Math.max(...targetProductPrices))
    expect(targetProductNames.length).toEqual(6)
    expect(targetProductNames).toContain('Sauce Labs Backpack')
    console.log()



    // await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
})
