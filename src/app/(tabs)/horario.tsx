import { Brand } from '@/constants/theme'
import { fetchRemoteURLs } from '@/hooks/fetch-firebasedata'
import { BrandHeader } from '@/components/brand-header'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState, type ReactNode } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Zoom from 'react-native-zoom-reanimated'
import { useTranslation } from 'react-i18next'

const SOUNDCLOUD_URL = 'https://soundcloud.com/achlequilcop-gmail-com'
const YOUTUBE_URL = 'https://www.youtube.com/@radioachlequilcop8876'
const FACEBOOK_URL = 'https://www.facebook.com/achlequilcop'
const INSTAGRAM_URL = 'https://www.instagram.com/achlequilcop/'

type SocialLink = {
  id: string
  url: string
  label: string
  renderIcon: (size: number, color: string) => ReactNode
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'youtube',
    url: YOUTUBE_URL,
    label: 'YouTube',
    renderIcon: (size, color) => <FontAwesome name="youtube-play" size={size} color={color} />,
  },
  {
    id: 'soundcloud',
    url: SOUNDCLOUD_URL,
    label: 'SoundCloud',
    renderIcon: (size, color) => <FontAwesome5 name="soundcloud" size={size} color={color} />,
  },
  {
    id: 'facebook',
    url: FACEBOOK_URL,
    label: 'Facebook',
    renderIcon: (size, color) => <FontAwesome name="facebook" size={size} color={color} />,
  },
  {
    id: 'instagram',
    url: INSTAGRAM_URL,
    label: 'Instagram',
    renderIcon: (size, color) => <FontAwesome name="instagram" size={size} color={color} />,
  },
]

// ─── Social media bar ──────────────────────────────────────────────────────────

function SocialMediaBar({ isDark }: { isDark: boolean }) {
  const [openingId, setOpeningId] = useState<string | null>(null)
  const iconColor = isDark ? '#6A8890' : '#5A7A84'

  async function openLink(id: string, url: string) {
    setOpeningId(id)
    await WebBrowser.openBrowserAsync(url, {
      toolbarColor: isDark ? '#1A1D20' : '#FFFFFF',
      controlsColor: Brand.primary,
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    })
    setOpeningId(null)
  }

  return (
    <View style={[styles.socialBar, isDark && styles.socialBarDark]}>
      {SOCIAL_LINKS.map((link) => {
        const isOpening = openingId === link.id
        return (
          <TouchableOpacity
            key={link.id}
            style={[styles.socialButton, isDark && styles.socialButtonDark, isOpening && styles.socialButtonDisabled]}
            onPress={() => openLink(link.id, link.url)}
            activeOpacity={0.7}
            disabled={openingId !== null}
            accessibilityRole="link"
            accessibilityLabel={link.label}
          >
            {isOpening ? (
              <ActivityIndicator size="small" color={iconColor} />
            ) : (
              link.renderIcon(18, iconColor)
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// ─── Zoomable image ────────────────────────────────────────────────────────────

function ZoomableImage({ uri }: { uri: string }) {
  const { width, height } = useWindowDimensions()
  // Leave room for the header + social bar so the image fits the available area
  const imageHeight = Math.max(height - 240, 300)

  return (
    <GestureHandlerRootView style={styles.fill}>
      <Zoom
        style={styles.fill}
        contentContainerStyle={styles.zoomContent}
        minScale={1}
        maxScale={6}
        doubleTapConfig={{
          defaultScale: 2.5,
          minZoomScale: 1,
          maxZoomScale: 6,
        }}
      >
        <Image
          source={{ uri }}
          style={{ width, height: imageHeight }}
          resizeMode="contain"
        />
      </Zoom>
    </GestureHandlerRootView>
  )
}

// ─── Parrilla content ──────────────────────────────────────────────────────────

function ParrillaContent({ isDark }: { isDark: boolean }) {
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchRemoteURLs()
      .then((data) => {
        setImageUrl(data.url_parrilla)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <View style={[styles.centered, isDark && styles.centerDark]}>
        <ActivityIndicator size="large" color={Brand.primary} />
      </View>
    )
  }

  if (error || !imageUrl) {
    return (
      <View style={[styles.centered, isDark && styles.centerDark]}>
        <Text style={styles.emptyIcon}>📡</Text>
        <Text style={[styles.emptyTitle, isDark && styles.textLight]}>
          {t('horario.errorTitle')}
        </Text>
        <Text style={[styles.emptySubtitle, isDark && styles.textMuted]}>
          {t('horario.errorSubtitle')}
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.fill, isDark && styles.centerDark]}>
      <View style={styles.imageArea}>
        <ZoomableImage uri={imageUrl} />
      </View>
      <SocialMediaBar isDark={isDark} />
    </View>
  )
}

// ─── Main screen ───────────────────────────────────────────────────────────────

export default function HorarioScreen() {
  const { t } = useTranslation()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, isDark && styles.screenDark]}>
      <BrandHeader title={t('horario.tabParrilla')} />
      <ParrillaContent isDark={isDark} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFC',
  },
  screenDark: {
    backgroundColor: '#111416',
  },
  fill: {
    flex: 1,
  },
  imageArea: {
    flex: 1,
  },
  zoomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFC',
    paddingHorizontal: 32,
  },
  centerDark: {
    backgroundColor: '#111416',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2A30',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A9098',
    textAlign: 'center',
    lineHeight: 20,
  },
  textLight: {
    color: '#D8E8EC',
  },
  textMuted: {
    color: '#5A7280',
  },
  // ── Social media bar ──
  socialBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0EBF0',
  },
  socialBarDark: {
    backgroundColor: 'rgba(26, 29, 32, 0.94)',
    borderTopColor: '#2A2E32',
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F5',
  },
  socialButtonDark: {
    backgroundColor: '#23272B',
  },
  socialButtonDisabled: {
    opacity: 0.7,
  },
})
