import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  setConfigSettings,
  setDefaults,
} from '@react-native-firebase/remote-config'

export interface RemoteURLs {
  url_parrilla: string
  url_radio: string
}

const DEFAULTS: RemoteURLs = {
  url_parrilla: 'https://falloparrilla.com',
  url_radio: 'http://109.169.15.21:12983',
}

export async function fetchRemoteURLs(): Promise<RemoteURLs> {
  const config = getRemoteConfig()

  await setConfigSettings(config, {
    minimumFetchIntervalMillis: 0, // 0 for dev; use 3600000 (1 hr) for production
  })

  await setDefaults(config, DEFAULTS as unknown as Record<string, string>)

  await fetchAndActivate(config)

  return {
    url_parrilla: getValue(config, 'url_parrilla').asString() || DEFAULTS.url_parrilla,
    url_radio: getValue(config, 'url_radio').asString() || DEFAULTS.url_radio,
  }
}
