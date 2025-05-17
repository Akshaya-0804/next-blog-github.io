
import "./globals.css";

import NavLink from "./components/NavLink";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function RootLayout({ children }) 
{
  
  return (
    <html lang="en">
      <body>
        <header>
          <Navigation/>
        </header>
        
        <main>{children}</main>

        <Footer/>
      </body>
    </html>
  );
}
