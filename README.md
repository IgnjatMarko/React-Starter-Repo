# React Starter Repo v1.1.01

Welcome to the React Starter Repo! This repository provides a boilerplate setup for starting your React projects quickly and efficiently.

## Features

- **React 19**: Latest version of React.
- **Vite**: A blazing fast, frontend build tool powering the next generation of web applications.
- **Tanstack Router**: Modern and scalable routing for React applications.
- **DaisyUI**: Faster, cleaner, easier Tailwind CSS development
- **Appwrite**: Build your entire backend within minutes and scale effortlessly using Appwrite's platform.
- **Oxlint/Prettier**: Code linting and formatting tools.
- **Lucide**: Beautiful & consistent icons. Made by the community.

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/IgnjatMarko/react-starter-repo.git
    ```

2. Access the project directory:
    ```bash
    cd my-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Copy and rename `.env.example` file to `.env`:

5. Start the development server:
    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000`.

7. Use `constants.ts` in assets folder for global constants.

## Folder Structure

```
react-starter-repo/
├── public/         # Static files
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── App.js      # Main app component
│   └── index.js    # Entry point
├── .oxlintrc.js    # Oxlint configuration
├── .prettierrc     # Prettier configuration
├── package.json    # Project metadata
└── README.md       # Project documentation
```

## Appwrite Integration

**Create a Web App**:
- Log in to your [Appwrite Console](https://appwrite.io/).
- Navigate to the **Projects** section and create a new project.
- Choose a hostname that matches the domain your website will use after deployment (e.g., Vercel, Netlify, Cloudflare).
- Proceed through the setup wizard by clicking "Next" on each step.

### Appwrite Authentication, Roadmap, and Blog Setup

To enable authentication and allow a user to make changes to the roadmap page, follow these steps:

1. **Create a New User**:
    - Log in to your [Appwrite Console](https://appwrite.io/).
    - Navigate to the **Auth/Users** section.
    - Click on **Add User** and fill in the required details (email and password).

2. **Assign the 'admin' Label**:
    - After creating the user, go to the **Auth/Users** section and select the newly created user.
    - Add a custom attribute or label named `role` with the value `admin`.

3. **Databases Roadmap Setup**:
    - In the settings, ensure your Appwrite Collection checks the user's `role` attribute to verify if they have admin privileges before making changes to the roadmap page.
    - Give permissions in the Collection settings to <ins>Guests</ins>, and <ins>Any</ins> to `Read`, while giving <ins>admin</ins> role the permission to `Create`,`Read`,`Update`, and `Delete`.
    - Create attributes `title` and `status` (default: `roadmap`) strings.
    - By following these steps, you can securely manage the roadmap page.

4. **Databases Blogspot Setup**:
    - After creating the collection, follow the next steps.
    - Create attributes `title`, `content`, `slug`, and `author` strings which are required.
    - Give permission in the Collection settings to `Any` for anyone to `Read`. No CRUD required.
    - Admin user to create blog posts directly inside the Appwrite collection.


### Setting Up Environment Variables

To configure the project, you need to set up environment variables. Follow these steps:

1. **Create a `.env` file**:
    - Locate the `.env.example` file in the root directory.
    - Copy and rename it to `.env`.

2. **Fill in the required values**:
    - Open the `.env` file in a text editor.
    - Replace placeholder values with your actual configuration details.

3. **Appwrite Account**:
    - Ensure you have an [Appwrite](https://appwrite.io/) account.
    - Use your Appwrite project credentials to populate the `.env` file.
    - To manage the project, create database `Starter` and collection `Roadmap`.

Example `.env` file:
```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 # Appwrite endpoint
VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
VITE_STARTER_DB_ID=your-appwrite-database-id
VITE_ROADMAP_ID=your-appwrite-collection-Roadmap-id
VITE_BLOGSPOT_DB_ID=your-appwrite-collection-Blogspot-id
```

Make sure not to commit your `.env` file to version control to keep sensitive information secure.


## Tips

Do not forget to run scripts `npm run lint` and `npm run format` to check your code and format it.

## Build and Deployment

When deploying, do not forget to copy Environment Variables to your host of choice, `my-app` is the Root Directory, and `dist` is the Output Directory for Vite Frameworks.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

Happy coding!

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE).