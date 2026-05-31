import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ARTICLES, getArticleBySlug } from "@/lib/ratgeber-data";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: `${article.titel} | liva Ratgeber`, description: article.beschreibung };
}

function renderContent(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-serif text-2xl text-gray-900 mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-serif text-3xl text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">
          {items.map((item, j) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return <li key={j}>{parts.map((p, k) => k % 2 === 1 ? <strong key={k}>{p}</strong> : p)}</li>;
          })}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      elements.push(
        <ol key={i} className="space-y-2 mb-4 ml-2">
          {items.map((item, j) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={j} className="flex gap-3 text-gray-600">
                <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">{j + 1}</span>
                <span>{parts.map((p, k) => k % 2 === 1 ? <strong key={k}>{p}</strong> : p)}</span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      // skip
    } else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={i} className="text-gray-600 leading-relaxed mb-4">
          {parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-gray-900">{p}</strong> : p)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_300px] gap-12">
          <article>
            <Link href="/ratgeber" className="inline-flex items-center gap-1.5 text-sm text-brand mb-8 hover:underline">
              <ArrowLeft size={14} /> Zurück zum Ratgeber
            </Link>
            <div className="mb-2">
              <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full">{article.kategorie}</span>
            </div>
            <h1 className="font-serif text-4xl text-gray-900 mt-4 mb-4 leading-tight">{article.titel}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-[#E0EDE7]">
              <div className="flex items-center gap-1.5"><Clock size={14} />{article.lesezeit}</div>
              <div className="flex items-center gap-1.5"><Calendar size={14} />{article.datum}</div>
            </div>
            <div>{renderContent(article.inhalt)}</div>
            <div className="mt-12 p-6 bg-brand-light rounded-[12px]">
              <h3 className="font-semibold text-gray-900 mb-2">Bereit loszulegen?</h3>
              <p className="text-gray-600 text-sm mb-4">Prüfe jetzt kostenlos, welche Leistungen dir zustehen.</p>
              <Link href="/leistungen-check" className="btn-primary">Leistungen prüfen <ArrowRight size={16} /></Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Leistungen prüfen</h3>
                <p className="text-gray-500 text-sm mb-4">Finde heraus, was dir mit deinem Pflegegrad zusteht – in 2 Minuten.</p>
                <Link href="/leistungen-check" className="btn-primary w-full justify-center">
                  Jetzt prüfen <ArrowRight size={16} />
                </Link>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Weitere Artikel</h3>
                <div className="space-y-3">
                  {ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3).map((a) => (
                    <Link key={a.slug} href={`/ratgeber/${a.slug}`} className="block group">
                      <p className="text-sm text-gray-700 group-hover:text-brand transition-colors leading-snug">{a.titel}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.lesezeit}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
