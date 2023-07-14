import "./globals.css";
import Footer from "@/components/Footer/Footer";
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
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout;