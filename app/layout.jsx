import "@styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";

export const metadata = {
  title: "Centennial Peer Tutoring Online",
  description: "Find a peer tutor & get assistance for free",
  icons: {
    icon: "/images/centennial.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app pt-[128px]">
            <Nav />
            {children}
            <Analytics />
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
