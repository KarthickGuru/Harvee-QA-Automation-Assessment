# Section B1 – AI-Generated Code Review

## 1. Objective

Review the AI-generated Playwright test for validating the cart total, identify its issues, and rewrite it following automation testing best practices.

## 2. Issues Identified

| S.No | Issue | Explanation |
|---|---|---|
| 1 | Hardcoded URL | Application URL should be maintained in Playwright configuration. |
| 2 | Hardcoded credentials | Test credentials should be maintained in configuration or environment variables. |
| 3 | Missing Page Object Model | Locators and application actions are written directly inside the test. |
| 4 | Ambiguous product locator | `text=Add to cart` may match multiple products, causing strict mode errors. |
| 5 | Fixed wait | `waitForTimeout(3000)` is unreliable and increases execution time. |
| 6 | Missing login assertion | The test does not verify successful navigation to the Products page. |
| 7 | Missing cart validation | The test does not verify the selected product or cart quantity. |
| 8 | Missing checkout navigation validation | The test does not verify that the Checkout Overview page is displayed. |
| 9 | Weak assertion | `toBeTruthy()` checks only whether the total text exists. |
| 10 | Missing subtotal verification | The item total is not retrieved or validated. |
| 11 | Missing tax verification | The tax amount is not retrieved or validated. |
| 12 | Missing calculation | The script does not verify that Total = Item Total + Tax. |
| 13 | No numeric conversion | Currency text is not converted into numerical values for comparison. |
| 14 | Unclear test name | The test name does not clearly describe the expected business validation. |
| 15 | Limited failure diagnostics | Missing intermediate assertions make failures harder to investigate. |

## 3. Corrected Automation Approach

I would rewrite the test using Playwright with TypeScript and the Page Object Model.

The corrected test should:

1. Log in using configured credentials.
2. Verify successful login.
3. Add a specific product to the cart.
4. Verify the cart badge and product details.
5. Navigate to checkout.
6. Enter valid customer information.
7. Navigate to the Checkout Overview page.
8. Retrieve the item total, tax, and final total.
9. Convert the currency amounts into numerical values.
10. Verify that the displayed total equals the item total plus tax.

## 4. Expected Result

The test should pass only when:

**Displayed Total = Item Total + Tax**

The test should fail when the displayed total does not match the calculated amount.

## 5. Conclusion

The original AI-generated script is not ready to merge because it does not validate the actual cart total calculation. It also contains ambiguous locators, hardcoded test data, fixed waits, and insufficient assertions.

The corrected test uses reusable Page Object methods, reliable Playwright assertions, and numerical validation to ensure that the final amount is calculated correctly.
