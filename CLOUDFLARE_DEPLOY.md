# Publish ApnaOhio2 with Cloudflare Pages

This project is plain HTML, CSS and JavaScript stored at the repository root. Cloudflare Pages can deploy private GitHub repositories and rebuild automatically when you push to the connected branch.

## Connect GitHub
1. Sign in to Cloudflare at https://dash.cloudflare.com/ (create a free account if needed).
2. Open Workers & Pages and choose Create application → Pages → Connect to Git.
3. Authorize Cloudflare's GitHub App. Grant access to only the ApnaOhio2 repository if GitHub offers repository selection.
4. Select pa1087/ApnaOhio2 and begin setup.

## Build configuration
- Project name: apnaohio2
- Production branch: main
- Framework preset: None
- Build command: exit 0
- Build output directory: .
- Root directory: leave the default repository root

Choose Save and Deploy. The repository already has a top-level index.html. When the first deployment succeeds, Cloudflare will show a public *.pages.dev URL. Future pushes to main will trigger deployments automatically.

Cloudflare's current Git integration documentation states that both public and private GitHub repositories are supported. Its Free plan currently lists up to 500 Pages builds per month, one concurrent build, and 20,000 files per site. Plan limits and terms can change; confirm them in Cloudflare before relying on them.

Official instructions: https://developers.cloudflare.com/pages/get-started/git-integration/ and https://developers.cloudflare.com/pages/platform/limits/

## Important
The website can be public while this GitHub repository remains private. Do not publish the repository just to get a public website. The Apps Script endpoint must still be configured in config.js before real visitors can share listings across browsers.