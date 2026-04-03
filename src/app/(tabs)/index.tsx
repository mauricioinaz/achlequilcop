import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'
import { fetchRemoteURLs, RemoteURLs } from '@/hooks/fetch-firebasedata'

const FALLBACK_RADIO_URL = 'http://37.157.242.103:12190'

export default function RadioScreen() {
  const { t } = useTranslation()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const [urls, setUrls] = useState<RemoteURLs | null>(null)
  const [isTryingToPlay, setIsTryingToPlay] = useState(false)
  const [didFailToPlay, setDidFailToPlay] = useState(false)

  useEffect(() => {
    fetchRemoteURLs()
      .then((data) => {
        console.log('[RemoteConfig] Fetched URLs:', data)
        setUrls(data)
      })
      .catch((err) => {
        console.error('[RemoteConfig] Failed to fetch URLs:', err)
      })
  }, [])

  const radioUrl = urls?.url_radio ?? FALLBACK_RADIO_URL
  const player = useAudioPlayer(radioUrl)
  const status = useAudioPlayerStatus(player)
  const playing = status.playing
  const playingRef = useRef(playing)
  const playAttemptIdRef = useRef(0)
  const previousRadioUrlRef = useRef(radioUrl)

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    }).catch((error) => {
      console.error('[Audio] Failed to set audio mode:', error)
    })
  }, [])

  useEffect(() => {
    playingRef.current = playing
    if (playing) {
      setIsTryingToPlay(false)
      setDidFailToPlay(false)
    }
  }, [playing])

  useEffect(() => {
    if (previousRadioUrlRef.current !== radioUrl) {
      previousRadioUrlRef.current = radioUrl
      playAttemptIdRef.current += 1
      setIsTryingToPlay(false)
      setDidFailToPlay(false)
      player.replace(radioUrl)
    }
  }, [player, radioUrl])

  useEffect(() => {
    if (playing) {
      player.setActiveForLockScreen(true, {
        title: "Ach' Lequilc'op",
        artist: '98.7 FM',
      })
      return
    }

    player.setActiveForLockScreen(false)
  }, [player, playing])

  const statusLabel = playing
    ? t('radio.live')
    : isTryingToPlay
      ? t('radio.connecting')
      : didFailToPlay
        ? t('radio.unavailable')
        : t('radio.offline')

  const handlePlayPress = () => {
    console.log('playing>>', playing)

    if (playing) {
      playAttemptIdRef.current += 1
      setIsTryingToPlay(false)
      setDidFailToPlay(false)
      player.pause()
      return
    }

    const attemptId = playAttemptIdRef.current + 1
    playAttemptIdRef.current = attemptId
    setDidFailToPlay(false)
    setIsTryingToPlay(true)
    player.play()

    setTimeout(() => {
      if (playAttemptIdRef.current === attemptId && !playingRef.current) {
        setIsTryingToPlay(false)
        setDidFailToPlay(true)
      }
    }, 7000)
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Logo circle */}
        <View style={[styles.logoWrapper, isDark && styles.logoWrapperDark]}>
          <Image
            source={require('@/assets/LogoSinLetra.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Station identity */}
        <View style={styles.stationBlock}>
          <Text style={[styles.stationName, isDark && styles.textLight]}>Ach' Lequilc'op</Text>
          <Text style={styles.frequency}>98.7 FM</Text>
          <Text style={[styles.tagline, isDark && styles.taglineDark]}>{t('radio.tagline')}</Text>
        </View>

        {/* Live indicator + progress */}
        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={styles.progressPulse} />
          </View>
          <View style={styles.liveRow}>
            {playing ? (
              <>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>{statusLabel}</Text>
              </>
            ) : (
              <>
                <View style={styles.offlineDot} />
                <Text style={styles.offlineText}>{statusLabel}</Text>
              </>
            )}
          </View>
        </View>

        {/* Playback controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.playBtn, playing && styles.playBtnActive]}
            onPress={handlePlayPress}
            activeOpacity={0.85}
          >
            {playing ? (
              <View style={styles.pauseIcon}>
                <View style={styles.pauseBar} />
                <View style={styles.pauseBar} />
              </View>
            ) : (
              <Text style={styles.playIcon}>▶</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFC',
  },
  containerDark: {
    backgroundColor: '#111416',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 28,
    paddingBottom: 16,
  },
  logoWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Brand.primary,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  logoWrapperDark: {
    backgroundColor: '#1E2427',
    shadowColor: '#000',
  },
  logo: {
    width: 172,
    height: 172,
  },
  stationBlock: {
    alignItems: 'center',
    gap: 4,
  },
  stationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2A30',
    letterSpacing: 0.3,
  },
  frequency: {
    fontSize: 22,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  tagline: {
    fontSize: 13,
    color: '#7A9098',
    marginTop: 2,
  },
  taglineDark: {
    color: '#6A8088',
  },
  textLight: {
    color: '#ECEFF0',
  },
  nowPlayingCard: {
    alignItems: 'center',
    gap: 5,
    backgroundColor: Brand.primarySurface,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C8E8EE',
  },
  nowPlayingCardDark: {
    backgroundColor: '#1A2C30',
    borderColor: '#1B4550',
  },
  nowLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: 2.5,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2A30',
  },
  programSub: {
    fontSize: 13,
    color: '#7A9098',
  },
  progressBlock: {
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#D8E8EC',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressPulse: {
    height: '100%',
    width: '100%',
    backgroundColor: Brand.primary,
    borderRadius: 2,
    opacity: 0.6,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Brand.morado,
  },
  offlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Brand.tabInactive,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: Brand.morado,
    letterSpacing: 2,
  },
  offlineText: {
    fontSize: 11,
    fontWeight: '700',
    color: Brand.tabInactive,
    letterSpacing: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },
  sideBtn: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBtnIcon: {
    fontSize: 26,
    color: '#green',
  },
  sideBtnIconDark: {
    color: '#yellow',
  },
  playBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Brand.primary,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
  },
  playBtnActive: {
    backgroundColor: Brand.morado,
  },
  playIcon: {
    fontSize: 28,
    color: Brand.white,
    marginLeft: 3,
  },
  pauseIcon: {
    flexDirection: 'row',
    gap: 6,
  },
  pauseBar: {
    width: 5,
    height: 26,
    borderRadius: 3,
    backgroundColor: Brand.white,
  },
})
