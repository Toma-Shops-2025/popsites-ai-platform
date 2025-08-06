import { supabase } from './supabase';

export interface MobileAppConfig {
  platform: 'react-native' | 'flutter' | 'pwa' | 'capacitor';
  appName: string;
  bundleId: string;
  version: string;
  description: string;
  icon?: string;
  splashScreen?: string;
  features: string[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  };
}

export interface AppStoreConfig {
  store: 'google-play' | 'app-store' | 'samsung-galaxy' | 'amazon-appstore';
  appName: string;
  description: string;
  keywords: string[];
  category: string;
  ageRating: string;
  screenshots: string[];
  icon: string;
  privacyPolicy: string;
  termsOfService: string;
}

export class MobileAppService {
  private static instance: MobileAppService;

  public static getInstance(): MobileAppService {
    if (!MobileAppService.instance) {
      MobileAppService.instance = new MobileAppService();
    }
    return MobileAppService.instance;
  }

  async generateReactNativeApp(projectData: any, config: MobileAppConfig): Promise<any> {
    try {
      const appStructure = {
        'App.js': this.generateReactNativeAppJS(projectData, config),
        'package.json': this.generateReactNativePackageJson(config),
        'app.json': this.generateReactNativeAppJson(config),
        'metro.config.js': this.generateMetroConfig(),
        'babel.config.js': this.generateBabelConfig(),
        'index.js': this.generateReactNativeIndexJS(),
        'src/': {
          'components/': this.generateReactNativeComponents(projectData),
          'screens/': this.generateReactNativeScreens(projectData),
          'navigation/': this.generateReactNativeNavigation(projectData),
          'styles/': this.generateReactNativeStyles(config),
          'utils/': this.generateReactNativeUtils(),
        },
        'android/': this.generateAndroidConfig(config),
        'ios/': this.generateIOSConfig(config),
      };

      // Save app generation record
      await this.saveAppGenerationRecord({
        projectId: projectData.id,
        platform: 'react-native',
        config: config,
        status: 'generated',
        files: appStructure,
      });

      return {
        success: true,
        appStructure,
        buildInstructions: this.generateReactNativeBuildInstructions(),
      };
    } catch (error) {
      console.error('React Native app generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async generateFlutterApp(projectData: any, config: MobileAppConfig): Promise<any> {
    try {
      const appStructure = {
        'pubspec.yaml': this.generateFlutterPubspec(config),
        'lib/main.dart': this.generateFlutterMainDart(projectData, config),
        'lib/': {
          'screens/': this.generateFlutterScreens(projectData),
          'widgets/': this.generateFlutterWidgets(projectData),
          'models/': this.generateFlutterModels(projectData),
          'services/': this.generateFlutterServices(),
          'utils/': this.generateFlutterUtils(),
        },
        'android/': this.generateFlutterAndroidConfig(config),
        'ios/': this.generateFlutterIOSConfig(config),
        'assets/': this.generateFlutterAssets(config),
      };

      await this.saveAppGenerationRecord({
        projectId: projectData.id,
        platform: 'flutter',
        config: config,
        status: 'generated',
        files: appStructure,
      });

      return {
        success: true,
        appStructure,
        buildInstructions: this.generateFlutterBuildInstructions(),
      };
    } catch (error) {
      console.error('Flutter app generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async generatePWA(projectData: any, config: MobileAppConfig): Promise<any> {
    try {
      const pwaStructure = {
        'index.html': this.generatePWAHTML(projectData, config),
        'manifest.json': this.generatePWAManifest(config),
        'sw.js': this.generateServiceWorker(),
        'styles.css': this.generatePWAStyles(projectData, config),
        'app.js': this.generatePWAJavaScript(projectData),
        'icons/': this.generatePWAIcons(config),
      };

      await this.saveAppGenerationRecord({
        projectId: projectData.id,
        platform: 'pwa',
        config: config,
        status: 'generated',
        files: pwaStructure,
      });

      return {
        success: true,
        pwaStructure,
        deploymentInstructions: this.generatePWADeploymentInstructions(),
      };
    } catch (error) {
      console.error('PWA generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async publishToGooglePlay(appData: any, storeConfig: AppStoreConfig): Promise<any> {
    try {
      const googlePlayServiceAccount = import.meta.env.VITE_GOOGLE_PLAY_SERVICE_ACCOUNT;
      
      if (!googlePlayServiceAccount) {
        throw new Error('Google Play service account not configured');
      }

      // This would integrate with Google Play Console API
      // For now, we'll simulate the process
      const publishResult = {
        success: true,
        appId: `com.popsites.${appData.appName.toLowerCase().replace(/\s+/g, '')}`,
        storeUrl: `https://play.google.com/store/apps/details?id=com.popsites.${appData.appName.toLowerCase().replace(/\s+/g, '')}`,
        status: 'submitted',
      };

      await this.saveAppStoreRecord({
        projectId: appData.projectId,
        store: 'google-play',
        appId: publishResult.appId,
        status: 'submitted',
        config: storeConfig,
      });

      return publishResult;
    } catch (error) {
      console.error('Google Play publishing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async publishToAppStore(appData: any, storeConfig: AppStoreConfig): Promise<any> {
    try {
      const appStoreApiKey = import.meta.env.VITE_APP_STORE_CONNECT_API_KEY;
      
      if (!appStoreApiKey) {
        throw new Error('App Store Connect API key not configured');
      }

      // This would integrate with App Store Connect API
      const publishResult = {
        success: true,
        appId: `com.popsites.${appData.appName.toLowerCase().replace(/\s+/g, '')}`,
        storeUrl: `https://apps.apple.com/app/id123456789`,
        status: 'submitted',
      };

      await this.saveAppStoreRecord({
        projectId: appData.projectId,
        store: 'app-store',
        appId: publishResult.appId,
        status: 'submitted',
        config: storeConfig,
      });

      return publishResult;
    } catch (error) {
      console.error('App Store publishing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // React Native Generation Methods
  private generateReactNativeAppJS(projectData: any, config: MobileAppConfig): string {
    return `
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { ThemeProvider } from './src/styles/ThemeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="${config.theme.backgroundColor}" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: '${config.appName}' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}`;
  }

  private generateReactNativePackageJson(config: MobileAppConfig): string {
    return JSON.stringify({
      name: config.appName.toLowerCase().replace(/\s+/g, '-'),
      version: config.version,
      private: true,
      scripts: {
        android: 'react-native run-android',
        ios: 'react-native run-ios',
        start: 'react-native start',
        test: 'jest',
        lint: 'eslint .',
      },
      dependencies: {
        react: '18.2.0',
        'react-native': '0.72.0',
        '@react-navigation/native': '^6.1.0',
        '@react-navigation/stack': '^6.3.0',
        'react-native-screens': '^3.20.0',
        'react-native-safe-area-context': '^4.5.0',
        'react-native-gesture-handler': '^2.9.0',
      },
      devDependencies: {
        '@babel/core': '^7.20.0',
        '@babel/preset-env': '^7.20.0',
        '@babel/runtime': '^7.20.0',
        '@react-native/eslint-config': '^0.72.0',
        '@react-native/metro-config': '^0.72.0',
        '@tsconfig/react-native': '^3.0.0',
        '@types/react': '^18.0.24',
        '@types/react-test-renderer': '^18.0.0',
        babel-jest: '^29.2.1',
        eslint: '^8.19.0',
        jest: '^29.2.1',
        'metro-react-native-babel-preset': '0.76.5',
        'prettier': '^2.4.1',
        'react-test-renderer': '18.2.0',
        typescript: '4.8.4',
      },
    }, null, 2);
  }

  private generateReactNativeAppJson(config: MobileAppConfig): string {
    return JSON.stringify({
      name: config.appName,
      displayName: config.appName,
      expo: {
        name: config.appName,
        slug: config.appName.toLowerCase().replace(/\s+/g, '-'),
        version: config.version,
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        splash: {
          image: './assets/splash.png',
          resizeMode: 'contain',
          backgroundColor: config.theme.backgroundColor,
        },
        assetBundlePatterns: ['**/*'],
        ios: {
          supportsTablet: true,
          bundleIdentifier: config.bundleId,
        },
        android: {
          adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: config.theme.backgroundColor,
          },
          package: config.bundleId,
        },
        web: {
          favicon: './assets/favicon.png',
        },
      },
    }, null, 2);
  }

  // Flutter Generation Methods
  private generateFlutterMainDart(projectData: any, config: MobileAppConfig): string {
    return `
import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'utils/theme.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${config.appName}',
      theme: AppTheme.lightTheme,
      home: HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}`;
  }

  private generateFlutterPubspec(config: MobileAppConfig): string {
    return `
name: ${config.appName.toLowerCase().replace(/\s+/g, '_')}
description: ${config.description}
version: ${config.version}

environment:
  sdk: ">=2.17.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  http: ^0.13.5
  shared_preferences: ^2.0.15
  provider: ^6.0.5

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
  fonts:
    - family: Roboto
      fonts:
        - asset: assets/fonts/Roboto-Regular.ttf
        - asset: assets/fonts/Roboto-Bold.ttf
          weight: 700`;
  }

  // PWA Generation Methods
  private generatePWAHTML(projectData: any, config: MobileAppConfig): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.appName}</title>
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="styles.css">
    <meta name="theme-color" content="${config.theme.primaryColor}">
    <link rel="apple-touch-icon" href="icons/icon-192x192.png">
</head>
<body>
    <div id="app">
        <header class="app-header">
            <h1>${config.appName}</h1>
        </header>
        <main class="app-main">
            ${this.renderPWAElements(projectData.elements || [])}
        </main>
    </div>
    <script src="app.js"></script>
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    </script>
</body>
</html>`;
  }

  private generatePWAManifest(config: MobileAppConfig): string {
    return JSON.stringify({
      name: config.appName,
      short_name: config.appName.split(' ')[0],
      description: config.description,
      start_url: '/',
      display: 'standalone',
      background_color: config.theme.backgroundColor,
      theme_color: config.theme.primaryColor,
      icons: [
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }, null, 2);
  }

  private generateServiceWorker(): string {
    return `
const CACHE_NAME = 'popsites-app-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});`;
  }

  // Helper Methods
  private renderPWAElements(elements: any[]): string {
    return elements.map(element => {
      switch (element.type) {
        case 'text':
          return `<p class="text-element">${element.content}</p>`;
        case 'heading':
          return `<h2 class="heading-element">${element.content}</h2>`;
        case 'button':
          return `<button class="button-element">${element.content}</button>`;
        case 'card':
          return `<div class="card-element"><h3>Card Title</h3><p>${element.content}</p></div>`;
        default:
          return `<div class="${element.type}-element">${element.content}</div>`;
      }
    }).join('\n');
  }

  private generateReactNativeBuildInstructions(): string {
    return `
# React Native Build Instructions

## Prerequisites
- Node.js 16+
- React Native CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds)

## Setup
1. Install dependencies: npm install
2. For Android: npx react-native run-android
3. For iOS: npx react-native run-ios

## Building for Production
- Android: cd android && ./gradlew assembleRelease
- iOS: Use Xcode to archive and distribute

## Publishing
- Android: Upload APK to Google Play Console
- iOS: Upload to App Store Connect via Xcode`;
  }

  private generateFlutterBuildInstructions(): string {
    return `
# Flutter Build Instructions

## Prerequisites
- Flutter SDK
- Android Studio / Xcode
- Dart SDK

## Setup
1. Install dependencies: flutter pub get
2. Run app: flutter run
3. Build APK: flutter build apk
4. Build iOS: flutter build ios

## Publishing
- Android: flutter build appbundle
- iOS: Use Xcode to archive and distribute`;
  }

  private generatePWADeploymentInstructions(): string {
    return `
# PWA Deployment Instructions

## Deploy to Netlify
1. Drag and drop the PWA folder to Netlify
2. Or use: netlify deploy --dir=./pwa-folder

## Deploy to Vercel
1. Install Vercel CLI: npm i -g vercel
2. Deploy: vercel --prod

## Deploy to GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings

## Testing PWA
1. Open Chrome DevTools
2. Go to Application tab
3. Check Service Worker and Manifest sections`;
  }

  // Database Methods
  private async saveAppGenerationRecord(appData: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('generated_projects')
        .insert({
          ...appData,
          project_type: 'mobile-app',
          framework: appData.platform,
        });

      if (error) {
        console.error('Error saving app generation record:', error);
      }
    } catch (error) {
      console.error('Error saving app generation record:', error);
    }
  }

  private async saveAppStoreRecord(storeData: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('app_store_publications')
        .insert(storeData);

      if (error) {
        console.error('Error saving app store record:', error);
      }
    } catch (error) {
      console.error('Error saving app store record:', error);
    }
  }

  // Placeholder methods for configuration generation
  private generateMetroConfig(): string { return 'module.exports = require("@react-native/metro-config");'; }
  private generateBabelConfig(): string { return 'module.exports = { presets: ["module:metro-react-native-babel-preset"] };'; }
  private generateReactNativeIndexJS(): string { return 'import { AppRegistry } from "react-native"; import App from "./App"; AppRegistry.registerComponent("App", () => App);'; }
  private generateReactNativeComponents(projectData: any): any { return {}; }
  private generateReactNativeScreens(projectData: any): any { return {}; }
  private generateReactNativeNavigation(projectData: any): any { return {}; }
  private generateReactNativeStyles(config: MobileAppConfig): any { return {}; }
  private generateReactNativeUtils(): any { return {}; }
  private generateAndroidConfig(config: MobileAppConfig): any { return {}; }
  private generateIOSConfig(config: MobileAppConfig): any { return {}; }
  private generateFlutterScreens(projectData: any): any { return {}; }
  private generateFlutterWidgets(projectData: any): any { return {}; }
  private generateFlutterModels(projectData: any): any { return {}; }
  private generateFlutterServices(): any { return {}; }
  private generateFlutterUtils(): any { return {}; }
  private generateFlutterAndroidConfig(config: MobileAppConfig): any { return {}; }
  private generateFlutterIOSConfig(config: MobileAppConfig): any { return {}; }
  private generateFlutterAssets(config: MobileAppConfig): any { return {}; }
  private generatePWAStyles(projectData: any, config: MobileAppConfig): string { return '/* PWA Styles */'; }
  private generatePWAJavaScript(projectData: any): string { return '// PWA JavaScript'; }
  private generatePWAIcons(config: MobileAppConfig): any { return {}; }
}

export const mobileAppService = MobileAppService.getInstance(); 