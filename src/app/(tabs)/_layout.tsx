import { Tabs } from 'expo-router'
import { Image, ImageSourcePropType, StyleSheet, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'

type IconProps = { focused: boolean; size: number; src: ImageSourcePropType }

function TabIcon({ src, focused, size }: IconProps) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperFocused]}>
      <Image source={src} style={{ width: size, height: size }} resizeMode="contain" />
    </View>
  )
}

const TAB_BAR_BASE_HEIGHT = 56
const TAB_BAR_PADDING_TOP = 6
const TAB_BAR_PADDING_BOTTOM = 8

export default function TabsLayout() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const insets = useSafeAreaInsets()

  const tabBarHeight = TAB_BAR_BASE_HEIGHT + insets.bottom
  const tabBarPaddingBottom = TAB_BAR_PADDING_BOTTOM + insets.bottom

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Brand.primary,
        tabBarInactiveTintColor: Brand.tabInactive,
        tabBarStyle: [
          styles.tabBar,
          isDark && styles.tabBarDark,
          { height: tabBarHeight, paddingBottom: tabBarPaddingBottom },
        ],
        tabBarLabelStyle: styles.label,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Radio',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/LogoSinLetraMenu.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="horario"
        options={{
          title: 'Contenido',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoMaiz.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="aprender"
        options={{
          title: 'Aprender',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoMano.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoPersonas.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          title: 'Config',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoIdioma.png')} focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E4EDF0',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: TAB_BAR_PADDING_TOP,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
  },
  tabBarDark: {
    backgroundColor: '#1A1D20',
    borderTopColor: '#2A2E32',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  iconWrapper: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconWrapperFocused: {
    // backgroundColor: '#006A9110',
    borderWidth: 1.5,
    borderColor: '#006A9180',
  },
})
