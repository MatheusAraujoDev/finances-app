import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Smart Finances</title>
      <link rel="icon" href="/wallet.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
