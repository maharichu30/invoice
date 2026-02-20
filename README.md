
# Invoice Builder

A responsive Invoice Builder web app built with React and TailwindCSS. Create, edit, and manage invoices with multiple line items, automatic subtotal/tax/total calculations, and PDF export.

## Features
- Create invoices with client details (name, address, mobile, invoice number, date)
- Add, edit, and remove multiple line items (description, quantity, unit rate)
- Real-time calculation of subtotal, tax (18%), and grand total
- Save invoices to browser `localStorage`
- Export invoices as downloadable PDFs
- Responsive layout built with TailwindCSS

## Tech Stack
- React (functional components + hooks)
- TailwindCSS for styling
- jsPDF for PDF export

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Usage

- Open the app and navigate to the `Invoices` page.
- Click `+ Add Invoice` to create a new invoice.
- Fill client details, add items from the product dropdown or enter custom descriptions, set quantities — amounts auto-fill from the product list.
- Subtotal, tax (18%), and total update automatically.
- Click `Save & Download` to save the invoice locally and download a PDF.

All invoices are persisted in the browser using `localStorage` (see [src/utils/localStorage.js](src/utils/localStorage.js)). The invoice creation and PDF logic live in [src/pages/CreateInvoice.jsx](src/pages/CreateInvoice.jsx).

## Deployment

You can deploy this app to Netlify or Render easily.

- Netlify: connect your GitHub repo, set the build command to `npm run build` and publish directory to `dist`.
- Render: create a new Static Site, connect the repo, and set the build command to `npm run build` with the publish directory `dist`.

After deploying, submit the deployed URL as required.

## Files of interest
- [src/pages/CreateInvoice.jsx](src/pages/CreateInvoice.jsx) — invoice form, calculations, PDF export
- [src/pages/Invoices.jsx](src/pages/Invoices.jsx) — list, edit, delete, download
- [src/utils/localStorage.js](src/utils/localStorage.js) — persistence helpers

If you'd like, I can help deploy this to Netlify or Render and push the repository to GitHub.

