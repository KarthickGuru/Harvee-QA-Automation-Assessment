import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec.ts';
import { ProductPage } from '../Pages/ProductPage.spec';
import { users } from '../Config/users.ts';


test("TC16 - Verify Products page access after logout", async ({ page }) => {

    const loginpage = new LoginPage(page);
    const productpage = new ProductPage(page);

    await loginpage.openloginpage();
    await loginpage.login(users.standard, users.password);

    await expect(page).toHaveURL(/inventory\.html/);

    await productpage.logout();

    await expect(page).toHaveURL(/\/$/);

    await page.goto('/inventory.html');


    await expect(page).toHaveURL(/\/$/);


    await expect(page.locator('#login-button')).toBeVisible();



})