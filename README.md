# Business Landing Page Generator

A React application that generates landing pages for locations using Google Places data (and maybe other APIs later on..). Built with Vite, TypeScript, and Material UI.

## Features

- Search for location using Google Places API
- Interactive map for location selection
- Automatic landing page generation based on business data
- Modern, responsive design using Material UI
- TypeScript for type safety
- SEO-friendly generated landing pages

## Live Demo

The application is deployed on GitHub Pages and can be accessed [here](https://ts0ron.github.io/landing-gen-frontend)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Google Maps API key with Places API enabled
  - Places API
  - Maps JavaScript API
  - Geocoding API

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
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_APP_API_URL=http://localhost:3000
VITE_OPENAI_API_KEY=your_openai_api_key_here
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

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

4. Add your Google Maps API key to your repository secrets:

   - Go to your repository settings
   - Navigate to Secrets and Variables > Actions
   - Add a new secret named `VITE_APP_GOOGLE_MAPS_API_KEY` with your API key

5. Push your changes to the main branch, and GitHub Actions will automatically deploy your site to GitHub Pages.

## Project Structure

```
src/
  components/       # Reusable components
  layouts/         # Layout components
  pages/           # Page components
  services/        # API services
  contexts/        # React contexts
  hooks/           # Custom hooks
  utils/           # Utility functions
  assets/          # Static assets
  templates/       # Landing page templates
```

## Environment Variables

The following environment variables are required:

- `VITE_APP_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `VITE_APP_API_URL`: Backend API URL (default: http://localhost:3000 for development)
- `VITE_OPENAI_API_KEY`: Your OpenAI API key for AI-powered features

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
