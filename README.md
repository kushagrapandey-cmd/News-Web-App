# NewsMonkey

A React news interface that retrieves category-based headlines through NewsAPI.

## Implemented features

- Routes for general, business, entertainment, health, science, sports and technology headlines.
- Article cards with images, source, author, publication time and outbound links.
- Previous/next pagination.
- Loading spinner and top progress indicator.

## Structure

- `src/App.js` — category routes and loading-progress state.
- `src/components/News.js` — API requests, pagination and article rendering.
- `src/components/NewsItems.js` — article cards.
- `src/components/Navbar.js` — category navigation.

Stack: React 18 class components, React Router 6 and Create React App.

## Local development

```bash
npm install
npm start
```

`npm run build` creates a production bundle. Headline retrieval requires a valid NewsAPI key and provider permission for the chosen environment.

## Status

An earlier API-integration project. The checked-in implementation contains a historical client-side API key, including generated build artifacts. Treat it as exposed: its owner must revoke it. A public frontend cannot keep a provider key secret; real deployment requires a server-side integration and removal of the old generated bundle. Do not rely on the historical credential or assume live retrieval has been verified.
