import { Page, Locator } from '@playwright/test';
export class ProductPage {

    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productnames: Locator;
    readonly productprice: Locator;
    readonly menuButton: Locator;
    readonly logOut: Locator;



    constructor(page: Page) {

        this.page = page;
        this.sortDropdown = page.locator("[class='product_sort_container']");
        this.productnames = page.locator("[class='inventory_item_name ']");
        this.productprice = page.locator("[class='inventory_item_price']");
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logOut = page.locator("#logout_sidebar_link");

    }


    async sortproduct(value: string) {
        await this.sortDropdown.selectOption(value);


    }

    async getproductname(): Promise<string[]> {

        return await this.productnames.allTextContents()
    }

    async getprodcutprice(): Promise<number[]> {
        const prices = await this.productprice.allTextContents();

        return prices.map(price =>
            Number(price.replace('$', '').trim())
        );
    }

    async logout() {

        this.menuButton.click();
        this.logOut.click();


    }




}
