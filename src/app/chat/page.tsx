import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Chat kommt bald</h1>
          <p className="text-gray-500">Der liva-Chat wird gerade eingerichtet.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
