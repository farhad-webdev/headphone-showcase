# NOIR — Headphone Showcase

A responsive, monochrome headphone product showcase built with React, Vite, GSAP, ScrollTrigger and Lenis.

## Run locally

1. Install Node.js LTS.
2. Open this project folder in a terminal.
3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

Keep the terminal running while viewing the preview.

## Build for production

```sh
npm run build
npm run preview
```

## Product images

The images are already included in `public/assets/`:

- `headphone-01.png` — hero and first turntable frame
- `headphone-02.png` — second turntable frame
- `headphone-03.png` — product detail and third turntable frame
- `headphone-04.png` — final turntable frame and closing section

The product showcase crossfades between these four views as the user scrolls. This creates a turntable-style presentation from still images, not a real-time 3D model.

## Project structure

- `src/App.jsx` — page sections, image paths and scroll animations
- `src/styles.css` — monochrome theme, responsive layout and presentation styles
- `public/assets/` — product images
