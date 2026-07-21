const TIMEOUT_MS = 2500;
const CACHE_KEY = "user_country_v2";
const CACHE_DURATION_MS = 1000 * 60 * 60 * 24; // 1 day

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function detectViaCloudflare(): Promise<string> {
  const res = await fetchWithTimeout("https://www.cloudflare.com/cdn-cgi/trace", TIMEOUT_MS);
  const text = await res.text();
  const match = text.match(/loc=([A-Z]{2})/);
  if (!match) throw new Error("no loc in trace");
  return match[1];
}

async function detectViaBackup(): Promise<string> {
  const res = await fetchWithTimeout("https://ipwho.is/", TIMEOUT_MS);
  const data = await res.json();
  if (!data.country_code) throw new Error("no country_code");
  return data.country_code;
}

export async function detectCountryCode(): Promise<string> {
  // 1) Check cache
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { code, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_DURATION_MS) return code;
    } catch (e) {}
  }

  // 2) Try Cloudflare -> Backup -> Default
  let code = "OTHER";
  try {
    code = await detectViaCloudflare();
  } catch (e1) {
    try {
      code = await detectViaBackup();
    } catch (e2) {
      code = "OTHER"; 
    }
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify({ code, ts: Date.now() }));
  return code;
}
