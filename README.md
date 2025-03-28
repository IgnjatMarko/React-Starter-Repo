# React Starter Repo

Welcome to the React Starter Repo! This repository provides a boilerplate setup for starting your React projects quickly and efficiently.

## Features

- **React 18**: Latest version of React.
- **Vite**: A blazing fast, frontend build tool powering the next generation of web applications.
- **Oxlint/Prettier**: Code linting and formatting tools.
- **Hot Module Replacement**: Instant updates during development.
- **Basic Folder Structure**: Organized for scalability.

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

4. Rename `.env.example` file to `.env`:

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

### Setting Up Environment Variables

To configure the project, you need to set up environment variables. Follow these steps:

1. **Create a `.env` file**:
    - Locate the `.env.example` file in the root directory.
    - Rename it to `.env`.

2. **Fill in the required values**:
    - Open the `.env` file in a text editor.
    - Replace placeholder values with your actual configuration details.

3. **Appwrite Account**:
    - Ensure you have an [Appwrite](https://appwrite.io/) account.
    - Use your Appwrite project credentials to populate the `.env` file.
    - To manage the project, create database `TodoList` and collection `Roadmap`.

Example `.env` file:
```
VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
VITE_TODOLIST_DB_ID=your-appwrite-database-id
VITE_ROADMAP_ID=your-appwrite-collection-id
```

Make sure not to commit your `.env` file to version control to keep sensitive information secure.


### Appwrite Authentication Setup

To enable authentication and allow a user to make changes to the roadmap page, follow these steps:

1. **Create a New User**:
    - Log in to your [Appwrite Console](https://appwrite.io/).
    - Navigate to the **Users** section.
    - Click on **Add User** and fill in the required details (email and password).
    - Or create it through the dev build

2. **Assign the 'admin' Label**:
    - After creating the user, go to the **Users** section and select the newly created user.
    - Add a custom attribute or label named `role` with the value `admin`.

3. **Update Your Roadmap Directly**:
    - Ensure your Appwrite Collection checks the user's `role` attribute to verify if they have admin privileges before making changes to the roadmap page.
    - Give permissions in the Collection settings to Guests, and anyone to `Read`, while giving Admin role the permission to `Create`,`Read`,`Update`, and `Delete`.

By following these steps, you can securely manage the roadmap page.


## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE).

Happy coding!