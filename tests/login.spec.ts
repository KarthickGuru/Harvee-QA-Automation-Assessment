import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec';
import { users } from '../Config/users';


test.describe("swag labs test suite", () => {

    test("TC01 - Verify standard user login", async ({ page }) => {

        const loginpage = new LoginPage(page);



        await loginpage.openloginpage();
        expect(page).toHaveURL("https://www.saucedemo.com/");

        expect(loginpage.username).toBeVisible();
        expect(loginpage.username).toBeEnabled();

        loginpage.login(users.standard, users.password);

        //await expect(page).toHaveURL("/\/inventory\.html$/)");

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    });

    test("TC02 - Verify locked-out user login error", async ({ page }) => {

        const loginpage = new LoginPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.locked, users.password);

        await expect(loginpage.errormessage).toContainText("Epic sadface: Sorry, this user has been locked out.");


    });

    test("TC03 - Verify login with invalid password", async ({ page }) => {

        const loginpage = new LoginPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.invalidpassword);

        await expect(loginpage.errormessage).toContainText("Epic sadface: Username and password do not match any user in this service");


    });







});