import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Provider from "@/components/Provider";
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
    title: "The Mirror Test",
    description: "A questionnaire for gaining a deeper understanding about yourself, your insecurities and your personality."
}

const RootLayout = ({ children }) => {

    return (
        <html lang="en">
            <body className={nunito.className}>
                <Provider>
                    <main>
                        {children}
                    </main>
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;