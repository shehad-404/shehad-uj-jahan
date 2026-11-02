# Md. Shehad Uj Jahan: Portfolio

Plain HTML, CSS and JavaScript. No build step.

## Files
- `index.html`: all content. Each part starts with a `SECTION` comment, so search for it (Ctrl+F) and edit the text.
- `style.css`: colours are variables at the top (`:root`). Change `--bg`, `--head`, `--accent` to re-theme.
- `script.js`: theme toggle and the email/meeting forms.
- `assets/photo.jpg`: replace with a new photo (keep the name).

## Preview in VS Code
Install the "Live Server" extension, right-click `index.html`, then "Open with Live Server".

## Publish (free)
1. `git init && git add . && git commit -m "Initial portfolio"`
2. Create an empty repo on github.com, then:
   `git remote add origin https://github.com/shehad-404/portfolio.git`
   `git branch -M main && git push -u origin main`
3. vercel.com, sign in with GitHub, Add New Project, import the repo.
   Framework Preset: Other. Leave build command and output directory empty. Deploy.
4. Every `git push` redeploys automatically.
