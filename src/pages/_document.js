import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <GoogleAnalytics gaId="G-6L5B79TZMT" />
    </Html>
  )
}
