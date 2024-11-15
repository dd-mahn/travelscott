import { writeFileSync } from 'fs';
import { globby } from 'globby';

async function generateSitemap() {
  const pages = await globby([
    'src/pages/**/*.tsx',
    '!src/pages/**/*.test.tsx',
    '!src/pages/**/components/**'
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          const path = page
            .replace('src/pages', '')
            .replace('.tsx', '')
            .replace('/index', '');
          return `
            <url>
              <loc>${`https://yoursite.com${path}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
