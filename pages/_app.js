import "../styles/globals.css";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask is not installed! Please install it to use this application.");
        }
    }, []);

    return (
        <>
            <header style={headerStyles}>
                <h1>Smart City Blockchain Platform</h1>
            </header>
            <main style={mainStyles}>
                <Component {...pageProps} />
            </main>
            <footer style={footerStyles}>
                <p>© 2024 Smart City Platform | Powered by Blockchain</p>
            </footer>
        </>
    );
}

const headerStyles = {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
};

const mainStyles = {
    minHeight: "calc(100vh - 150px)",
    padding: "2rem",
    backgroundColor: "#f4f4f4",
};

const footerStyles = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
};
