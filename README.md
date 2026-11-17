# Susee Agencies Website

React + Vite website for Susee Agencies.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The deployable static files are generated in `dist/`.

## Deploy options

- Netlify: deploy the `dist` folder or connect this folder as a Git repository.
- Vercel: use `npm run build` as the build command and `dist` as the output directory.
- Other hosting: upload the contents of `dist/`.

## Product catalogue

The catalogue and website share the product list in `src/data/products.js`.
The downloadable file is `public/catalogue/susee-agencies-catalogue.pdf`.
After editing products, regenerate the PDF before building:

```bash
node scripts/catalogue-data.mjs
uv run --python 3.12 --with reportlab --with pymupdf python scripts/build-catalogue.py
npm run build
```

The generator writes a copy to `output/pdf/` and renders pages under `tmp/pdfs/` for visual review. It requires `uv` and may download Python/packages on first use.

## Quick enquiry

The contact section validates product, quantity (including unit), and delivery city. Submission opens a prepared WhatsApp message to the business number. Customers review and send it in WhatsApp; the website does not store submissions.
