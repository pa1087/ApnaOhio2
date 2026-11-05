# Enable GitHub Pages for ApnaOhio2

The static website files are already in the repository root (`index.html`, `styles.css`, `app.js`, `config.js`). The `.nojekyll` marker has also been added.

## One-time GitHub setting
1. Open https://github.com/pa1087/ApnaOhio2/settings/pages
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main`.
4. Set the folder to `/(root)`.
5. Click **Save**.

GitHub Pages will then publish the root-level static site at:

https://pa1087.github.io/ApnaOhio2/

GitHub notes that initial publication can take up to 10 minutes. Check the same Pages settings screen for the deployment status and the Visit site link.

## Current preview behavior
If config.js is left blank, the site works in local demo mode. Any sample listing posted is stored in that browser only and does not appear for other visitors. For a shared live board, deploy the Google Apps Script backend and set its /exec URL in config.js.

## Note about GitHub Pages use
GitHub Pages is intended mainly for showcasing personal and organizational projects and is not allowed for websites primarily directed at facilitating commercial transactions. This project is intended as a free community noticeboard, but because some categories include housing, jobs and items offered for sale, review GitHub's Pages terms and ask GitHub Support if uncertain before promoting it broadly: https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#pages