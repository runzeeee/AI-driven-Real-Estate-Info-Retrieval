import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import '../styles/globals.css';
import { LoadScript } from '@react-google-maps/api';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={['places']}
      language="en"
    >
      <CssBaseline />
      <Component {...pageProps} />
    </LoadScript>
  );
}

export default MyApp; 