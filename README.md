# Misinformation in the Age of LLM Agents — AAAI-27 Tutorial

Website for the AAAI-27 half-day tutorial *Misinformation in the Age of LLM Agents: Generation, Propagation, and Intervention*.

Live site: https://liuyuhan31.github.io/MisinformationAgent/

## Structure

```
index.html            all page content (single page)
css/style.css         styles; colors are tokens at the top, dark mode included
js/main.js            mobile nav, active-section highlight, BibTeX copy
assets/favicon.svg
assets/img/people/    presenter photos (square, ~400px)
```

Plain static HTML, no build step. GitHub Pages serves the `main` branch root (`.nojekyll` turns off Jekyll).

## Edit locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Publish

```bash
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages redeploys within a minute or two of each push.

## Common updates

- **Presenter photo**: put `firstname-lastname.jpg` in `assets/img/people/`, then in `index.html` replace that person's `<div class="avatar">..</div>` with `<img src="assets/img/people/firstname-lastname.jpg" alt="Name" loading="lazy">`.
- **Date / location**: the `.facts` block in the hero and the `Time` column in `#schedule`.
- **Slides / recording**: in `#materials`, change the `<span class="status">Coming soon</span>` to `<a class="status status-live" href="...">Download</a>`.
