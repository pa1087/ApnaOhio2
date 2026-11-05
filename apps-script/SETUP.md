# Connect ApnaOhio2 to Google Sheets

This creates a shared listing feed for all visitors. The spreadsheet remains private in your Google account.

## 1. Create the backend project and spreadsheet

1. Open [Google Apps Script](https://script.google.com/home/projects/create) while signed in to the Google account that should own the spreadsheet.
2. Open the Code.gs file in this repository's apps-script folder.
3. Replace the starter code in the Apps Script editor with the complete contents of that file.
4. Save the project as **ApnaOhio2 Backend**.
5. In the function selector, choose **setupApnaOhio**, then click **Run**.
6. Approve the requested Google Sheets permission.
7. Open the execution log / execution details. The function returns and logs the new spreadsheet URL: **ApnaOhio2 Community Listings**.
8. Keep the spreadsheet private. Do not enable public sharing on the Sheet.

The setup function automatically creates the spreadsheet when this is a new standalone Apps Script project. It creates the Listings and Reports tabs and saves the spreadsheet ID in script properties.

## 2. Deploy the Web App

1. In Apps Script choose **Deploy → New deployment**.
2. Select the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy**, authorize if prompted, and copy the Web App URL ending in /exec.

The spreadsheet stays private, but the web app endpoint is public. Active listing details and contact methods are intentionally readable by visitors, and anyone can submit a post or report. Share contact information only when comfortable making it public.

## 3. Connect the website

1. Open config.js in this GitHub repository.
2. Replace the empty value with your deployment URL:

    window.APNAOHIO_API_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

3. Commit the change.
4. Reload your site. The mode indicator should say **Live community board · shared with visitors**.

The website reads with JSONP and sends create/report requests as simple text/plain POST requests. Browser no-cors requests do not expose the server response to JavaScript, so the page refreshes the feed after sending.

## 4. Update the backend

When you edit Code.gs, save it and use **Deploy → Manage deployments → Edit** to publish a new version. Keep the existing deployment URL where practical so config.js does not need another change.

## Privacy and safety

- All active listings and their contact details are public to site visitors.
- Keep the Google Sheet private. Never put the Sheet ID, OAuth credentials, private keys or other secrets in front-end files.
- The backend validates fields, adds a short per-contact throttle and ignores a hidden honeypot field. These are basic MVP protections, not enterprise-grade anti-abuse controls.
- Reports are recorded in Reports for manual review; no moderator notification is configured.
- Expired listings are hidden after 30 days; their rows remain in the Sheet.
- There is no account system, identity verification, payment processing or private messaging.
- This is a small-community MVP. Add stronger moderation, abuse prevention, privacy terms and deletion workflows before broad public promotion. Apps Script quotas and Google free-tier terms can change.