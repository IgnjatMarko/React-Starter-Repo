## Vercel Analytics

 - They are included in the npm packages.
 - If you want to uninstall it, remove code from main.tsx: 
    1. `import { inject } from '@vercel/analytics'`
    2. `inject()`

## Subcribers list && Newsletter
 - Create a new collection in Appwrite's database "Subscribers".
 - And collect emails from Users interested in your product.
 - Do not forget to update Environment Variables!