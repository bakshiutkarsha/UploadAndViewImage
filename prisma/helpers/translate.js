const cache_path = 'google_translate_cache.json'

let google_translate_cache = {};

try { google_translate_cache = JSON.parse(fs.readFileSync(cache_path).toString()) } catch (e) { }

export async function google_translate_with_cache(input, { from, to }) {
  const cache_key = [from, to].filter(x => x).join('|')

  if (!google_translate_cache[cache_key]) { google_translate_cache[cache_key] = {} }

  const google_translate_cache_to = google_translate_cache[cache_key]
  const x = google_translate_cache_to[input]
  if (x) { return x }

  const response = await require('google-translate-open-api').default(input, { from, to, client: "dict-chrome-ex" })

  let translation_ = response.data.sentences.map(x => x.trans).join('')

  google_translate_cache_to[input] = translation_

  return translation_
}
