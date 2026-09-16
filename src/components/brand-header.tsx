import { Brand } from '@/constants/theme'
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native'

type BrandHeaderProps = {
  title: string
}

export function BrandHeader({ title }: BrandHeaderProps) {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <View style={[styles.logoCircle, isDark && styles.logoCircleDark]}>
        <Image
          source={require('@/assets/LogoSinLetra.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7FBFC',
  },
  headerDark: {
    backgroundColor: '#111416',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  logoCircleDark: {
    backgroundColor: '#1E2427',
    shadowColor: '#000',
  },
  logo: {
    width: 46,
    height: 46,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#1A2A30',
    letterSpacing: 0.3,
  },
  titleDark: {
    color: '#D8E8EC',
  },
})
