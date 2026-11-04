import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec.ts';
import { ProductPage } from '../Pages/ProductPage.spec.ts';
import { CartPage } from '../Pages/CartPage.spec.ts';
import { users } from '../Config/users.ts';



test.describe("test suite - 3", () => {


    test("TC09 - Add two products and remove one", async ({ page }) => {

        const loginpage = new LoginPage(page);
        const productpage = new ProductPage(page);
        const cartpage = new CartPage(page);

        await loginpage.openloginpage();
        await loginpage.login(users.standard, users.password);

        await cartpage.addBagPack();

        await cartpage.addBikeLight();
        await expect(cartpage.shoppingCartBadge).toHaveText('2');

        await cartpage.removeBikeLight();

        await expect(cartpage.shoppingCartBadge).toHaveText("1");

        await cartpage.openCart();


        await cartpage.openCart();


        await expect(cartpage.quantity).toHaveCount(1);


        await expect(cartpage.productNames).toHaveText(['Sauce Labs Backpack']);


        await expect(cartpage.shoppingCartBadge).toHaveText('1');





        await cartpage.checkoutbutton.click();
    })

});
