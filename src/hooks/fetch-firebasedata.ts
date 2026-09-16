import AsyncStorage from '@react-native-async-storage/async-storage'
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

export const RADIO_URL_OVERRIDE_KEY = 'radio_url_override'

export const FALLBACK_RADIO_URL = 'http://37.157.242.103:12190'

const DEFAULTS: RemoteURLs = {
  url_parrilla: 'https://falloparrilla.com',
  url_radio: 'http://109.169.15.21:12983',
}

export async function getRadioUrlOverride(): Promise<string | null> {
  const value = await AsyncStorage.getItem(RADIO_URL_OVERRIDE_KEY)
  return value?.trim() || null
}

export async function setRadioUrlOverride(url: string): Promise<void> {
  await AsyncStorage.setItem(RADIO_URL_OVERRIDE_KEY, url.trim())
}

export async function clearRadioUrlOverride(): Promise<void> {
  await AsyncStorage.removeItem(RADIO_URL_OVERRIDE_KEY)
}

export function resolveRadioUrl(
  override: string | null | undefined,
  remoteUrl: string | null | undefined,
): string {
  return override?.trim() || remoteUrl?.trim() || FALLBACK_RADIO_URL
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
