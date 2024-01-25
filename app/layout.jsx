import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";

export const metadata = {
  title: "Centennial Peer Tutoring Online",
  description: "Find a peer tutor & get assistance for free",
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
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
