import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly completemessage: Locator;
    readonly backToHome: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    readonly cartItems: Locator;
    readonly errorMessage: Locator;



    constructor(page: Page) {

        this.page = page;
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
        this.finishButton = page.locator("#finish");
        this.itemTotal = page.locator(".summary_subtotal_label");
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.completemessage = page.locator(".complete-header");
        this.backToHome = page.locator("#back-to-products");
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.errorMessage = page.locator('[data-test="error"]');

    }


    async constumerdetails(firstName: string, lastName: string, postalCode: string) {

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);

    }

    async continueCheckout() {
        await this.continueButton.click();
    }


    async finishCheckout() {
        await this.finishButton.click();
    }


    private async getAmount(locator: Locator): Promise<number> {
        const text = await locator.innerText();
        const match = text.match(/\$\s*(\d+\.\d{2})/);

        if (!match) {
            throw new Error(`Amount not found in: ${text}`);
        }

        return Math.round(Number(match[1]) * 100);
    }

    async getOrderTotals() {
        return {
            itemTotal: await this.getAmount(this.itemTotal),
            tax: await this.getAmount(this.tax),
            total: await this.getAmount(this.total)
        };
    }

    async backToProducts() {
        await this.backToHome.click();
    }



}