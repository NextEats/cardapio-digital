import "../styles/globals.css"

import type { AppProps } from 'next/app'
import RestaurantContextProvider from "../components/contexts/RestaurantContext"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <RestaurantContextProvider >
      <Component {...pageProps} />
    </RestaurantContextProvider>
  )
}
