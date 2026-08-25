const TIMEOUT_MS = 2500;
const CACHE_KEY = "user_country_v3";
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
  const res = await fetchWithTimeout(`https://www.cloudflare.com/cdn-cgi/trace?_t=${Date.now()}`, TIMEOUT_MS);
  const text = await res.text();
  const match = text.match(/loc=([A-Z]{2})/);
  if (!match) throw new Error("no loc in trace");
  return match[1];
}

async function detectViaBackup(): Promise<string> {
  const res = await fetchWithTimeout(`https://ipwho.is/?_t=${Date.now()}`, TIMEOUT_MS);
  const data = await res.json();
  if (!data.country_code) throw new Error("no country_code");
  return data.country_code;
}

export async function detectCountryCode(): Promise<string> {
  // Allow URL override for testing
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const testCountry = params.get('test_country');
      if (testCountry) {
        return testCountry.toUpperCase();
      }
    }
  } catch (e) {}
  // Try Cloudflare -> Backup -> Default
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

  
  return code;
}
