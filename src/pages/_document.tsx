import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="http://fonts.gstatic.com"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Main />
        <NextScript />
      </Html>
    )
  }
}
