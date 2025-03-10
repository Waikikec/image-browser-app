# Image Browser App

This project is a React application bootstrapped with Vite and TypeScript. It includes ESLint for code linting and formatting.

![screencapture-localhost-5173-2025-03-10-11_47_10](https://github.com/user-attachments/assets/461bdcf1-a7d7-4aea-9a74-fc48a9eac4a9)
![screencapture-localhost-5173-details-9449638-2025-03-10-11_47_34](https://github.com/user-attachments/assets/502fd63b-9643-41da-8004-d27e9082ddef)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/image-browser-app.git
cd image-browser-app
```

2. Install the dependencies:

```sh
npm install
# or
yarn install
```

### Running the Development Server

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173/` to see the application running.

### Building for Production

To create a production build, run:

```sh
npm run build
# or
yarn build
```

The output will be in the `dist` directory.

### Environment Variables

Create a `.env` file in the root of your project to define environment variables:

```sh
VITE_APP_PIXABAY_API_KEY=your_pixabay_api_key_here
```

### ESLint Configuration

The project uses ESLint for linting and formatting. You can expand the ESLint configuration as needed. See the existing configuration in `eslint.config.js`.

### Improvements

- Add a centralized state to keep track of the application state, such as search and filter criteria, so that when navigating to a specific image and returning, the search state is preserved.
- Improve the user interface with a more modern design and better responsiveness.
- Integrate additional image sources or APIs for a wider variety of images.
- Implement a CI/CD pipeline using GitHub Actions.
- Add more unit tests using a testing library.
- Add more comprehensive documentation for components and utilities.

## License

This project is licensed under the MIT License.
