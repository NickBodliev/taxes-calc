import { AppProvider } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {

  const theme = {
    logo: {
      width: 80,
      topBarSource:
        '/logo.svg',
      contextualSaveBarSource:
      '/logo.svg',
      url: '/'
    },
  };

  const i18n={
    Polaris: {
      Frame: {
        skipToContent: 'Skip to content',
      },
      ContextualSaveBar: {
        save: 'Save',
        discard: 'Discard',
      },
    },
  }

  return (
    <AppProvider theme={theme} i18n={i18n} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
