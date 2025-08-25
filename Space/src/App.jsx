// src/App.jsx
import Console from "./components/Console";
import Hero from "./components/Hero";
import './App.css'

export default function App() {
  return (
    <>
      <Hero />
      <Console />
      <main className="relative">
        {/* Your site content here */}
      </main>
    </>
  );
}
