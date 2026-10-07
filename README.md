# Independent Bookstore Events — POC

Static responsive proof of concept using only semantic HTML5, vanilla CSS, and vanilla JavaScript.

## Run

Open `index.html` in a modern browser. No build step or package installation is required.

For local development, an optional static server can be used, but the project has no external dependencies.

## Acceptance criteria covered

- Semantic, responsive HTML5/CSS layout.
- Search and category filtering.
- Empty-state message: "No data found".
- Simulated asynchronous loading indicator.
- Form validation for missing/malformed name and email.
- Invalid fields receive `aria-invalid="true"` and visible red error text.
- Keyboard-accessible navigation and controls.
- Skip link and accessible labels/live regions.
- RSVP dialog with labelled controls.
- Simulated analytics messages via `console.info`.
- User-entered text is sanitized before entering application state.
- User-generated content is rendered using `textContent`, not `innerHTML`.
- No API keys or sensitive PII are hardcoded.
- No React, Bootstrap, Tailwind, or external UI libraries.

## Accessibility note

The implementation is designed for strong Lighthouse accessibility results, including semantic landmarks, labels, focus states, keyboard navigation, live regions, and a skip link. A literal 100% Lighthouse score should still be verified in the target browser/environment before submission.

## Deliverables

Deploy this folder to a static host such as GitHub Pages, Netlify, or Vercel and submit:
1. GitHub repository URL
2. Live deployment URL
