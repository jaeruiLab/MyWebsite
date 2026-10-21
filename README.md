# MyWebsite

Personal site: where the lab meets the terminal. Plain HTML/CSS/JS, no frameworks, no build step.

## Editing

All personal text lives in **`data.js`**: bio, projects, timeline, skills, the Now board, contact links, nav labels.

- Placeholder copy is tagged `[EDIT]` (or `[EDIT: note]`) and shows as an orange badge on the page.
  Rewrite the text, delete the tag. Set `showEditMarkers: false` to hide every badge at once.
- New project: add an object to `projects` with a unique `id`. Its detail page is `project.html?id=<id>`.
- New skill: add to `skills` with a 1–2 letter `sym` and a `group` (`chem`, `code`, `eng`).
- Now board: edit `now.items` and bump `now.lastUpdated`.
- Photo: drop an image in this folder and set `about.photo.src`.

Colors are CSS variables at the top of `styles.css` (`--accent` re-themes everything).

## Running

Open `index.html` in a browser.

## Deploying to GitHub Pages

Push to GitHub → Settings → Pages → deploy from the `main` branch, root folder.
In `404.html`, set `SITE_BASE` to `"/"` for a `username.github.io` repo, or `"/<repo-name>/"` for a project repo.

## Easter egg

Press <kbd>`</kbd> on any page (or tap "press ` for a terminal" in the footer). Try `help`.
