## Expense Tracker

Welcome to Expense Tracker, a web application that helps you track expenses, submit expense reports, generate invoices, collect payments, and track mileage for truck vehicles.

This app was built with [Next.js](https://nextjs.org/), [Firebase](https://firebase.google.com/) Auth, Firebase Cloud Functions, Firebase Cloud Firestore, and [Tailwind](https://tailwindcss.com/) CSS.

### Features

- Track expenses: Easily add and categorize your expenses to keep track of your spending.
- Submit expense reports: Submit reports of your expenses to the relevant parties.
- Generate invoices: Create and send professional invoices to clients.
- Collect payments: Accept payments from clients directly through the app.
- Track mileage: Keep track of the mileage for your truck vehicles.

### Getting Started

To get started with Expense Tracker, you will need to set up a Firebase project and connect it to the app. Follow the steps below to get started:

1. Set up a Firebase project and enable the following services:

    - Firebase Auth
    - Cloud Functions
    - Cloud Firestore

2. Clone this repository and install the dependencies:

    ```
    git clone https://github.com/Abdullahi254/project-watiti.git
    cd project-watiti
    npm install
    ```

3. Copy the .env.example file to a new file called .env.local and enter your Firebase project configuration details.

4. Run the development server:

    ```
    npm run dev
    ```
The app will be running at http://localhost:3000.

### Deployment

To deploy the app to production, you can use [Vercel](https://vercel.com/dashboard).

1. Create a Vercel account and set up your project.
2. Connect your Vercel project to your Git repository.
3. Set the environment variables in your Vercel project settings.
4. Deploy the app by clicking the "Deploy" button in your Vercel dashboard.

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Abdullahi254/blog_graphcms/blob/main/LICENSE) file for details.


