import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly addBackpackButton: Locator;
    readonly addBikeLightButton: Locator;
    readonly removeBikeLightButton: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly quantity: Locator;
    readonly checkoutbutton: Locator;
    readonly productNames: Locator;



    constructor(page: Page) {
        this.page = page;
        this.addBackpackButton = page.locator("#add-to-cart-sauce-labs-backpack");
        this.addBikeLightButton = page.locator("#add-to-cart-sauce-labs-bike-light");
        this.removeBikeLightButton = page.locator("#remove-sauce-labs-bike-light");
        this.shoppingCartBadge = page.locator("[class='shopping_cart_badge']");
        this.shoppingCartLink = page.locator("[class='shopping_cart_link']");
        this.quantity = page.locator(".cart_item");
        this.checkoutbutton = page.locator("#checkout");
        this.productNames = page.locator('.cart_item .inventory_item_name');


    }

    async addBagPack(): Promise<void> {
        await this.addBackpackButton.click();

    }

    async addBikeLight() {

        this.addBikeLightButton.click();
    }

    async removeBikeLight() {

        this.removeBikeLightButton.click();


    }

    async openCart() {

        await this.shoppingCartLink.click();


    }


    async checkout(): Promise<void> {
        await this.checkoutbutton.click();
    }


}