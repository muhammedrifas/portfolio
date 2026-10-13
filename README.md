# Muhammed Rifas - Personal Portfolio

A highly responsive, fluidic single-page application (SPA) built to showcase my transition from Delivery Engineering Management back to hands-on, full-stack software engineering.

## Architecture & Features
* **Dual-View System:** Features a state-driven toggle between a metric-driven "Executive Summary" and a scroll-animated "Narrative Journey".
* **Fluidic Theming:** Implements seamless toggling between Light and Dark (fluid black and white) modes using CSS variables and Tailwind's dark class variant.
* **Custom Scroll Reveal:** Utilizes a lightweight, custom `IntersectionObserver` hook (`useScrollReveal`) to trigger smooth fade-in animations as the user scrolls, avoiding the bloat of heavy external animation libraries.
* **Component-Driven:** Built entirely with functional React components for high reusability and clean DOM structure.

## Tech Stack
* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4 (PostCSS/Vite integrated)
* **Icons:** Lucide React