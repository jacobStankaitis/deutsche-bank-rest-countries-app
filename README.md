# REST Countries Single-Page Web Application


A single-page web application built with React and TypeScript that interacts with the REST Countries API to display a list of countries and their details. Users can search for countries by name, language, or currency, and mark countries as favorites.

## Installation


Follow these steps to set up and run the application locally.


1. Clone the repository:

   ```bash
   git clone https://github.com/jacobStankaitis/rest-countries-app.git
   ```
2. Navigate to the project directory:

   ```bash
   cd rest-countries-app
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm run start
   ```
5. Open your browser and visit:

   ```bash
   http://localhost:3000
   ```

## Usage


Once the application is running, you can:


- View a list of countries with their flags, population, languages, and currencies.
- Search for countries by name, language, or currency using the search bar.
- Mark countries as favorites by clicking the heart icon.
- Toggle between viewing all countries and only your favorite countries.
- Click on a country row to view detailed information in a modal.

## Features


- Responsive design with Material-UI components.
- Interactive data grid using Ag-Grid.
- Client-side search and filtering by name, language, or currency.
- Favorites functionality with persistence using local storage.
- Detailed country information displayed in modals.
- Error handling with user-friendly Snackbar alerts.
- Partial unit testing with React Testing Library.

## Testing


This project uses React Testing Library for testing. To run the tests, execute the following command:

```bash
npm run test
```

## License


This project is licensed under the [MIT License](LICENSE).