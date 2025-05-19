## Vercel Analytics

 - They are included in the npm packages.
 - If you want to uninstall it, remove code from main.tsx: 
    1. `import { inject } from '@vercel/analytics'`
    2. `inject()`

## Waitlist && Newsletter
- You can use Brevo (formerly Sendinblue) to collect newsletter subscribers with a hosted form.
- The recommended approach is to use the Brevo form link in a popup window. Example:
  - Use a button in your app that opens the Brevo form in a new window:
    ```js
    window.open('https://sibforms.com/link');
    ```
- Choose standard form instead of pop up form. It does not play nice with React ecosystem.