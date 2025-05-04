# Landing Page Generator

A flexible and extensible React application that generates dynamic landing pages for various location-based assets. Initially focused on Google Places integration, the application is designed with a modular architecture to easily incorporate additional asset providers in the future.

## Dynamic Theming System

Our application implements a sophisticated theming system that allows for dynamic styling based on asset categories. This is achieved through:

1. **CustomThemeProvider**: A React context provider that manages theme state and provides theme configuration to all components
2. **Category-Based Themes**: Each asset category (e.g., restaurant, hotel, real estate) can have its own theme configuration
3. **Material UI Integration**: Themes are built on top of Material UI's theming system, allowing for consistent component styling
4. **Dynamic Theme Switching**: Themes can be changed at runtime based on the asset category

### Theme Configuration Example

```typescript
// Example theme configuration for different asset categories
const categoryThemes = {
  restaurant: {
    palette: {
      primary: {
        main: "#FF4B2B",
        light: "#FF6B4B",
        dark: "#CC3B22",
      },
      secondary: {
        main: "#2B2B2B",
        light: "#4B4B4B",
        dark: "#1B1B1B",
      },
    },
    typography: {
      h1: {
        fontFamily: "Playfair Display, serif",
        fontWeight: 700,
      },
    },
  },
  realEstate: {
    palette: {
      primary: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
      },
      secondary: {
        main: "#795548",
        light: "#8D6E63",
        dark: "#5D4037",
      },
    },
    typography: {
      h1: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 600,
      },
    },
  },
};
```

### Benefits

- **Consistent Branding**: Each asset category maintains its own visual identity
- **Flexible Customization**: Easy to add new themes for different categories
- **Maintainable Code**: Theme configurations are centralized and reusable
- **Performance**: Theme changes are optimized and don't cause unnecessary re-renders
- **Developer Experience**: Simple API for accessing and modifying themes

## Table of Contents

- [Current Features](#current-features)
- [Extensible Architecture](#extensible-architecture)
- [Technical Stack](#technical-stack)
- [Future Roadmap](#future-roadmap)
- [Features](#features)
- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Current Features

- Google Places integration for location-based content
- Dynamic landing page generation
- Interactive maps and location data visualization
- Customizable templates and layouts
- Custom Theme per Asset category.

## Extensible Architecture

The application is built with extensibility in mind, allowing for easy integration of new asset providers such as:

- Real estate listings
- Travel destinations
- Local business information
- Event venues
- And more...

## Technical Stack

- React with TypeScript
- Vite for build tooling
- Material UI for component library
- Google Maps API for location services

## Future Roadmap

- Additional asset provider integrations
- Enhanced styling per category, using the CustomThemeProvider, we can define default styling for MUI components based on our Asset category
- Layout per Category

## Features

- Search for location using Google Places API
- Interactive map for location visualization
- Automatic landing page generation based on business data
- Modern, responsive design using Material UI
- TypeScript for type safety
- SEO-friendly generated landing pages
- Custom theme per Asset category, this will also allow us in the future to customize MUI components per cateogry.

## Live Demo

The application is deployed on GitHub Pages and can be accessed [here](https://ts0ron.github.io/pagenerate/)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Google Maps API key with Places API enabled
  - Places API
  - Maps JavaScript API

## Local Development Setup

1. Clone the repository:

```bash
git clone git@github.com:ts0ron/landing-gen-frontend.git
cd landing-gen-frontend
```

OR

```bash
git clone https://github.com/yourusername/landing-gen-frontend.git
cd landing-gen-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
# Google Maps API Configuration
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Backend API Configuration
VITE_APP_API_URL=http://localhost:3000
VITE_APP_HOSTNAME=http://localhost:5173

# OpenAI API Configuration
VITE_OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Building for Production

Currently we are building using Github Pages feature. This can be customized to other provider at your preference.

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

4. Add all the env varialbes from the numb snippet [above](#local-development-setup), treat sensitive data properly.

5. Push your changes to the main branch ,or to the branch you've configured github to listen at, and GitHub Actions will automatically deploy your site to GitHub Pages.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── auth/       # Authentication related components
│   ├── common/     # Shared components (buttons, inputs, etc.)
│   ├── sections/   # Page sections (hero, features, etc.)
│   └── views/      # Complex view components (maps, forms, etc.)
├── contexts/       # React context providers
│   └── theme/      # Theme context and providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layout components
│   └── main/       # Main application layout
├── pages/          # Page components
├── services/       # API and external service integrations
│   └── api/        # API service definitions
├── templates/      # Landing page templates
├── utils/          # Utility functions and helpers
└── constants/      # Application constants and configurations

public/            # Public static files
├── index.html     # Main HTML file
└── assets/        # Public assets

.env.local        # Local environment variables
.env.production   # Production environment variables
```

Each directory serves a specific purpose:

- `assets/`: Contains all static files like images, icons, and fonts
- `components/`: Reusable UI components organized by functionality
- `contexts/`: React context providers for state management
- `hooks/`: Custom React hooks for shared logic
- `layouts/`: Page layout components and structure
- `pages/`: Main page components for each route
- `services/`: API integrations and external service connections
- `templates/`: Landing page templates and variations - currently only 1 template is implemented. This structure should allow us to add more templates easily in the future, either based on asset category or other info.
- `utils/`: Helper functions and utilities
- `constants/`: Application-wide constants and configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Google Maps not loading**: Ensure your API key is correctly set and has the necessary APIs enabled
2. **Build errors**: Make sure all dependencies are installed and you're using the correct Node.js version
3. **Development server issues**: Clear your browser cache and node_modules, then reinstall dependencies

## License

This project is licensed under the MIT License - see the LICENSE file for details.
