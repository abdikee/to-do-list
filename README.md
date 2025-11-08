# Finalproject — Simple Todo App

This is a small learning project that demonstrates semantic HTML, responsive CSS, and modular JavaScript with data persistence using localStorage. It maps to the learning objectives and requirements you shared.

Files
- `index.html` — semantic markup (header, main, footer), add-task form and task list
- `styles.css` — minimal, responsive styling and completed-task visuals
- `script.js` — modular JS for add/delete/toggle and localStorage persistence

How to run
1. Open `index.html` in a browser (double-click or serve via a static server).
2. Add tasks using the form. Tasks persist across reloads via `localStorage`.

Features implemented
- Add new tasks dynamically
- Delete individual tasks
- Mark tasks complete / incomplete (checkbox)
- Store tasks in `localStorage` and load on page load
- Responsive layout with media query
- Semantic HTML and modular JS functions with comments

Quick test checklist
- [ ] Add a task and see it appear in the list
- [ ] Mark a task complete — it should get a line-through
- [ ] Delete a task — it should disappear
- [ ] Reload the page — tasks should persist
- [ ] Resize the browser (mobile / desktop) and verify layout

Deployment notes

GitHub (Pages)
1. Create a new repository on GitHub and push these files to the default branch (e.g., `main`).
2. In the repository settings -> Pages, select the `main` branch and `/ (root)` folder and save.
3. GitHub Pages will publish the site at `https://<your-username>.github.io/<repo>` within a minute or two.

Example PowerShell commands (run from the project folder):

```powershell
git init
git add .
git commit -m "Initial todo app"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

Netlify
- Drag & drop the project folder into Netlify's deploy UI, or connect the GitHub repo — Netlify will automatically deploy it.

Next steps / Stretch goals
- Add categories/tags and filtering
- Add due dates + reminder notifications (requires backend or browser alarms)
- Convert to a React/Vue app for practice with frameworks

License & attribution
This project is for learning and teaching; feel free to reuse and adapt it.

