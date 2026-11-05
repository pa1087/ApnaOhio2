# Connect ApnaOhio2 to Google Sheets

This creates one shared listing feed. Keep the Google Sheet private.

## 1. Create and initialize the Sheet
1. Create a Google Sheet named ApnaOhio2 Community Listings.
2. In that sheet, select Extensions > Apps Script.
3. Replace the starter code with the contents of Code.gs from this folder and save.
4. Choose setupApnaOhio in the function selector and click Run.
5. Approve the Google Sheets permission prompt. The script creates Listings and Reports tabs.

## 2. Deploy the Web App
1. In Apps Script choose Deploy > New deployment.
2. Select the gear icon and choose Web app.
3. Set Execute as to Me.
4. Set Who has access to Anyone.
5. Deploy, authorize if asked, and copy the URL ending in /exec.

The spreadsheet itself stays private. The endpoint URL is public, and visitors can read active listing details and submit posts or reports.

## 3. Connect the website
Edit config.js in this GitHub repository and set:
    window.APNAOHIO_API_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
Commit the change, then reload the website. The mode indicator should say Live community board.

The website reads using JSONP and sends create/report requests as simple text/plain POST requests. Browser no-cors requests do not expose the server response to JavaScript, so the browser refreshes the feed after sending.

## Privacy and safety
- Listings and contact information are intentionally public to site visitors. Do not post sensitive personal information.
- Never put the Sheet ID, OAuth credentials, private keys or other secrets into front-end files.
- The backend validates required fields, applies a short per-contact throttle and uses a hidden honeypot. These are basic starter controls only.
- Reports are stored in the Reports tab for manual review; no moderator notification is configured.
- Expired listings are hidden after 30 days, while their rows remain in the Sheet.
- This is a small-community MVP. Add stronger anti-abuse, moderation, privacy, and deletion workflows before broad public launch. Google Apps Script quotas and free-tier terms can change.

## Updating the deployment
After editing Code.gs, save it and use Deploy > Manage deployments > Edit to publish a new version. Keep the existing deployment where practical so the website URL does not need to change.
