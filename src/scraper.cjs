// --- imports ---
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const https = require('https');

// --- create an IPv4-only HTTPS agent to prevent ETIMEDOUT on IPv6 ---
const agent = new https.Agent({ family: 4 });

// --- fetch JSON or HTML from a site ---
async function fetchJsonIfPossible(siteUrl) {
  try {
    const res = await axios.get(siteUrl, {
      httpsAgent: agent,       // use IPv4
      timeout: 10000,          // 10-second timeout
      headers: {
        // mimic a real browser to avoid blocks
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
      }
    });

    const contentType = res.headers['content-type'] || '';

    // if the response is JSON, return the parsed data
    if (contentType.includes('application/json')) {
      return res.data;
    }

    // otherwise return HTML as a string in an object
    return { body: res.data };
  } catch (e) {
    console.error('Fetch failed:', e.message);
    return null;
  }
}

// --- parse mods from a generic site ---
async function parseGeneric(site) {
  // fetch content from the site
  const fetched = await fetchJsonIfPossible(site.url);
  if (!fetched) return []; // return empty array if fetch failed

  // --- case 1: JSON response ---
  if (Array.isArray(fetched)) {
    return fetched.map((m, idx) => ({
      id: m.id || idx,
      title: m.title || m.name,
      desc: m.desc || m.description || '',
      thumbnail: m.thumb || m.image || '',
      downloadUrl: m.download || m.url || '',
      site: site.url
    }));
  }

  // --- case 2: HTML response ---
  if (typeof fetched === 'object' && fetched.body) {
    const $ = cheerio.load(fetched.body); // load HTML into cheerio
    const mods = [];

    // iterate over possible mod elements
    $('.mod, .mod-item, .file, .resource').each((i, el) => {
      const title = $(el).find('h3, h2, .title').first().text().trim();
      const desc = $(el).find('.desc, .description, p').first().text().trim();

      // get the first image src, resolve relative URLs
      let thumb = $(el).find('img').first().attr('src') || '';
      if (thumb && !thumb.startsWith('http')) thumb = url.resolve(site.url, thumb);

      // get the first download link, resolve relative URLs
      let dl = $(el).find('a.download, a[href*="download"], a:contains("Download")').first().attr('href') || '';
      if (dl && !dl.startsWith('http')) dl = url.resolve(site.url, dl);

      // push mod object into array
      mods.push({
        id: i,
        title,
        desc,
        thumbnail: thumb,
        downloadUrl: dl,
        site: site.url
      });
    });

    return mods;
  }

  // --- fallback: return empty array ---
  return [];
}

// --- export parser ---
module.exports = { parseGeneric };
