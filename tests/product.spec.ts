import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec.ts'
import { ProductPage } from '../Pages/ProductPage.spec.ts';
import { users } from '../Config/users.ts';

test.describe("test suite -2", () => {

    test("TC05 - Verify products sorted by name A to Z", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);


        //await productpage.sortproduct('{value:az}');


        const actualNames = await productpage.getproductname();

        const expectedNames = [...actualNames].sort((a, b) =>
            a.localeCompare(b, 'en')
        );

        expect(actualNames.length).toBeGreaterThan(1);
        expect(actualNames).toEqual(expectedNames);

    });


    test("'TC06 - Verify products sorted by name Z to A", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);


        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);

        await productpage.sortproduct('za');

        const actualNames = await productpage.getproductname();

        const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a, 'en')
        );

        expect(actualNames.length).toBeGreaterThan(1);
        expect(actualNames).toEqual(expectedNames);


    });

    test("TC07 - Verify products sorted by price low to high", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);

        await productpage.sortproduct('Price (low to high)');

        const actualPrices = await productpage.getprodcutprice();

        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices.length).toBeGreaterThan(1);
        expect(actualPrices).toEqual(expectedPrices);


    })

    test("TC08 - Verify products sorted by price high to low", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);

        await productpage.sortproduct("Price (high to low)");

        const actualPrices = await productpage.getprodcutprice();

        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices.length).toBeGreaterThan(1);
        expect(actualPrices).toEqual(expectedPrices);

    })








})
