
import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage.spec';
import { CartPage } from '../Pages/CartPage.spec';
import { CheckoutPage } from '../Pages/CheckoutPage.spec';
import { users } from '../Config/users';

test('B1 - Verify checkout total equals item total plus tax', async ({ page }) => {

    
    const loginpage = new LoginPage(page);
    const cartpage = new CartPage(page);
    const checkoutpage = new CheckoutPage(page);

   
    await loginpage.openloginpage();
    await loginpage.login(users.standard, users.password);

    
    await expect(page).toHaveURL(/\/inventory\.html$/);

   
    await cartpage.addBagPack();


    await expect(cartpage.shoppingCartBadge).toHaveText('1');

    await cartpage.openCart();

    await expect(cartpage.quantity).toHaveCount(1);

    await expect(cartpage.quantity)
        .toContainText('Sauce Labs Backpack');

    
    await cartpage.checkout();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

 
    await checkoutpage.constumerdetails(
        'John',
        'Test',
        '600001'
    );

    await checkoutpage.continueCheckout();

   
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    await expect(checkoutpage.itemTotal).toBeVisible();
    await expect(checkoutpage.tax).toBeVisible();
    await expect(checkoutpage.total).toBeVisible();


    const amounts = await checkoutpage.getOrderTotals();

    expect(amounts.itemTotal).toBeGreaterThan(0);
    expect(amounts.tax).toBeGreaterThanOrEqual(0);


    const expectedTotal = amounts.itemTotal + amounts.tax;

    
    expect(amounts.total,'Checkout total should equal item total plus tax').toBe(expectedTotal);

    console.log('Item Total:', amounts.itemTotal / 100);
    console.log('Tax:', amounts.tax / 100);
    console.log('Expected Total:', expectedTotal / 100);
    console.log('Actual Total:', amounts.total / 100);

});
