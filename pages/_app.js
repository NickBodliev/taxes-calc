import { AppProvider } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
