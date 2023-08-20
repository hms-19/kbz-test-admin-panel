import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate()
  const location = useLocation()
  // useEffect(() => {
  //   if(cookies.token){
  //     navigate(location.pathname)
  //   }
  // },[])

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
