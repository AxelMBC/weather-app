import CountryCard from "./components/CountryCard";
import Header from "./components/Header";
import "./globals.css";

export default function Home() {
  return (
    <div>
      (
      <main>
        <Header />
        <div className="pt-4 d-flex justify-content-center">
          <div className="cards-container">
            <CountryCard />
          </div>
        </div>
      </main>
      );
    </div>
  );
}
