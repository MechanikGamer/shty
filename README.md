# Shty.me - URL Shortener

**Shty.me** is a modern URL shortener built using cutting-edge technologies. It provides an efficient and scalable solution for shortening URLs and tracking their usage. The project is designed as a monorepo powered by Turborepo, making it highly modular and maintainable.

---

## 🚀 Features

- **URL Shortening**: Quickly generate short and user-friendly URLs.
- **Statistics Tracking**: Track the usage and analytics of shortened URLs (planned feature).
- **Responsive Design**: Optimized for web and mobile platforms.
- **Mobile App Support**: Built with [Expo](https://expo.dev/) for seamless native app integration.
- **Developer Friendly**: Pre-configured with TypeScript, ESLint, Prettier, and TRPC for rapid development and code quality.

---

## 🛠️ Tech Stack

- **Frameworks**: [React Native](https://reactnative.dev/), [Next.js](https://nextjs.org/)
- **Backend**: [TRPC](https://trpc.io/), [MongoDB](https://www.mongodb.com/)
- **Mobile App**: [Expo](https://expo.dev/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)
- **Linting & Formatting**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Static Typing**: [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure

This monorepo is organized into the following apps and packages:

### Apps

- **`web`**: A [Next.js](https://nextjs.org/) app for the web interface, leveraging [react-native-web](https://necolas.github.io/react-native-web/).
- **`native`**: A [React Native](https://reactnative.dev/) app built with [Expo](https://expo.dev/) for mobile platforms.

### Packages

- **`@repo/ui`**: A shared component library for both web and native apps, built with React Native.
- **`@repo/typescript-config`**: Shared TypeScript configurations for the monorepo.

---

## 🧑‍💻 Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) (v1.x or v3.x)
- [MongoDB](https://www.mongodb.com/) (locally or via a cloud provider like [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NextCoreDev/shty.me.git
   cd shty.me
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

---

### Development

1. Locate the `.env.example` file in the root directory.
2. Create a copy of the `.env.example` file and rename it to `.env`:

```bash
 cp .env.example .env
```

3. Open the .env file in your preferred text editor and update the placeholder values with your actual configuration values. For example:

```bash
MONGODB_URI=mongodb+srv://DATABASE_USER:DATABASE_PASSWORD@DATABASE_URL/DATABASE_NAME
PORT=PORT_NUMBER
NODE_ENV=development / production
```

To start the development environment for web:

```bash
yarn run dev
```

This will start the `web` app at `http://localhost:3000`.

To start the development environment for native (via Expo):

```bash
cd apps/native
expo start
```

---

### Build

To build the project for production:

```bash
yarn run build
```

This will build all apps and packages in the monorepo.

---

## 🌟 Features in Development

- **Statistics Dashboard**: A web-based dashboard to analyze URL performance.
- **Custom URL Aliases**: Allow users to create custom short links.
- **Mobile App**: A fully functional app for shortening and managing URLs on the go.

---

## 🛡️ Code Quality

The project uses the following tools to maintain high code quality:

- **Prettier**: Automatic code formatting. Run `yarn prettier` to format code.
- **ESLint**: Static code analysis. Run `yarn lint` to check for linting errors.
- **TypeScript**: Strict type checking. Run `yarn tsc` to check for type errors. test

---

## 📦 Dependencies

### Key Dependencies

- **React & React Native**
- **Next.js**
- **TRPC**
- **MongoDB**

### Development Dependencies

- **TypeScript**
- **Prettier**
- **ESLint**
- **Turborepo**

---

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to your branch: `git push origin feature-name`.
5. Open a pull request.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 💬 Feedback

If you have any feedback or suggestions, please open an issue or contact the team directly. We'd love to hear from you!
