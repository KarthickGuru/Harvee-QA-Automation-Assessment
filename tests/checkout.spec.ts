import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage.spec';
import { ProductPage } from '../Pages/ProductPage.spec'
import { CheckoutPage } from '../Pages/CheckoutPage.spec';
import { CartPage } from '../Pages/CartPage.spec';
import { users } from '../Config/users';
import * as fs from 'fs';


const filepath = 'tests/testdata/customerdeatils.json'

const customerdetails = JSON.parse(
    fs.readFileSync(filepath, 'utf-8')
);



test.describe(" test suite -5", () => {

    test("TC11 - Complete checkout and verify order total", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);
        const cartpage = new CartPage(page);
        const checkoutpage = new CheckoutPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);

        await cartpage.addBagPack();
        await cartpage.openCart();


        await cartpage.checkout();

        await checkoutpage.constumerdetails('John', 'Test', '600001');

        await checkoutpage.continueCheckout();


        await expect(checkoutpage.itemTotal).toBeVisible();
        await expect(checkoutpage.tax).toBeVisible();
        await expect(checkoutpage.total).toBeVisible();

        const amounts = await checkoutpage.getOrderTotals();

        expect(amounts.itemTotal).toBeGreaterThan(0);
        expect(amounts.tax).toBeGreaterThanOrEqual(0);


        expect(amounts.total).toBe(
            amounts.itemTotal + amounts.tax
        );


        await checkoutpage.finishCheckout();

        await expect(checkoutpage.completemessage).toHaveText("Thank you for your order!")

        await checkoutpage.backToProducts();

        await cartpage.openCart();


        await expect(cartpage.quantity).toHaveCount(0);
    });


    for (const data of customerdetails) {

        test(`${data.id} and ${data.title}`, async ({ page }) => {

            const loginpage = new LoginPage(page);
            const cartpage = new CartPage(page);

            const checkoutpage = new CheckoutPage(page);

            await loginpage.openloginpage();
            await loginpage.login(users.standard, users.password);
            await cartpage.addBagPack();
            await cartpage.openCart();
            await cartpage.checkout();


            await checkoutpage.constumerdetails(
                data.firstName,
                data.lastName,
                data.postalCode
            );

            await checkoutpage.continueCheckout();

            await expect(checkoutpage.errorMessage)
                .toHaveText(data.expectedError);



        });

    };


});