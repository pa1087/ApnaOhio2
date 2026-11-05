# Search indexing for ApnaOhio2

Live site: https://pa1087.github.io/ApnaOhio2/

## Google Search Console

1. Sign in at https://search.google.com/search-console/ with the Google account you want to use to monitor the site.
2. Add a **URL-prefix** property with the exact URL above (including HTTPS and the trailing slash).
3. Choose the **HTML tag** verification method. Copy the complete meta tag Google provides.
4. Ask the repository maintainer to add that exact tag inside the `<head>` of `index.html` on the `static` branch, then wait for the GitHub Pages deployment to finish.
5. Return to Search Console and click **Verify**.
6. In Search Console, open **Sitemaps** and submit: `sitemap.xml`.
7. Open **URL Inspection**, enter the homepage URL, run **Test Live URL**, then choose **Request Indexing** if available.

## Files added

- `robots.txt` allows crawlers and points to the sitemap.
- `sitemap.xml` lists the canonical homepage.
- `index.html` includes a canonical URL, descriptive title, meta description, social preview metadata, and WebSite structured data.

## Important

Submitting a sitemap or requesting indexing does not guarantee that Google will index the page or show it for a particular search. Google controls crawling, indexing, and search result presentation. Allow time for recrawling and check the Page Indexing and Performance reports in Search Console.

Only publish truthful content. Do not add fake reviews, fake addresses, fake business details, or copied listings to manipulate search results.
