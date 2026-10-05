# Playwright Locators & Interactions Cheat Sheet

## 1. Core Rules of Locators
* **Locators are Lazy:** They do not hit the DOM until an action is performed. **Do not use `await`** when creating a locator (`const btn = page.getByRole('button')`).
* **Actions are Async:** Interactions or data extractions return Promises. **Always use `await`** (`await btn.click()`, `await btn.allTextContents()`).

## 2. Industry Standard Locators (Order of Preference)

| Priority | Locator | Description & Options |
| :--- | :--- | :--- |
| **1** | `getByTestId('id')` | Best practice. Uses `data-testid` attributes. Impervious to UI changes. |
| **2** | `getByRole(role, opts)` | Finds elements as humans/screen readers see them. <br>**Roles:** `button`, `link`, `heading`, `textbox`, `listitem`, `checkbox`.<br>**Options:** `{ name: 'Submit', exact: true, level: 1 }` |
| **3** | `getByText('text')` | Good for paragraphs/spans. Options: `{ exact: true }` |
| **4** | `getByLabel('text')` | Finds form inputs associated with a `<label>`. |
| **5** | `getByPlaceholder('txt')`| Finds inputs via their placeholder attribute. |
| **6** | `locator('.class')` | **Fallback only.** Uses CSS or XPath. Brittle. |

*Note on ARIA Roles & Levels:* 
* `role` describes the element's function (e.g., a `<div>` acting as a `button`).
* `level` is specific to the `heading` role (`level: 1` = `<h1>`, `level: 2` = `<h2>`).

## 3. Filtering & Narrowing Down (When multiple elements match)

| Method | What it does | Example |
| :--- | :--- | :--- |
| `.first()` | Gets the 1st match in the DOM | `page.getByRole('listitem').first()` |
| `.last()` | Gets the last match in the DOM | `page.getByRole('listitem').last()` |
| `.nth(index)` | Gets specific match (0-indexed)| `page.getByRole('listitem').nth(2)` |
| `.filter(opts)` | Scopes by inner text or locator | `.filter({ hasText: 'Backpack' })`<br>`.filter({ has: page.getByRole('button') })` |

## 4. Chaining (Scoping within a Parent)
Find a parent container, then search strictly inside it.
```javascript
const productCard = page.getByTestId('product-item').first();
const productName = productCard.getByRole('heading', { level: 3 });
const addToCart = productCard.getByRole('button', { name: 'Add' });