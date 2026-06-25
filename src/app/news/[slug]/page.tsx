import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { NEWS, getBySlug } from "@/lib/content-data";

export async function generateStaticParams() {
  return NEWS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = getBySlug(params.slug);
  if (!a) return {};
  return {
    title: `${a.titel} | liva News`,
    description: a.beschreibung,
    alternates: { canonical: `https://liva-pflege.de/news/${a.slug}` },
    openGraph: {
      title: a.titel,
      description: a.beschreibung,
      url: `https://liva-pflege.de/news/${a.slug}`,
      type: "article",
      publishedTime: a.datum,
      siteName: "liva – Orientierung im Pflegesystem",
    },
  };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-serif text-3xl text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-semibold text-xl text-gray-900 mt-7 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1.5 text-gray-600 mb-4">
          {items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
      continue;
    } else if (line.trim()) {
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

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = getBySlug(params.slug);
  if (!article || article.typ !== "news") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titel,
    description: article.beschreibung,
    url: `https://liva-pflege.de/news/${article.slug}`,
    datePublished: article.datum,
    dateModified: article.datum,
    author: {
      "@type": "Organization",
      name: "liva",
      url: "https://liva-pflege.de",
    },
    publisher: {
      "@type": "Organization",
      name: "liva",
      url: "https://liva-pflege.de",
      logo: { "@type": "ImageObject", url: "https://liva-pflege.de/hero.jpg" },
    },
    articleSection: article.kategorie,
    inLanguage: "de-DE",
    about: {
      "@type": "Thing",
      name: "Pflegeversicherung",
      description: "Gesetzliche Pflegeversicherung in Deutschland",
    },
  };

  const relatedArticles = NEWS.filter(
    (a) => a.slug !== article.slug && a.kategorie === article.kategorie
  ).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-brand mb-8 hover:underline">
            <ArrowLeft size={14} /> Zurück zu den News
          </Link>

          <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full">
            {article.kategorie}
          </span>
          <h1 className="font-serif text-4xl text-gray-900 mt-4 mb-4 leading-tight">{article.titel}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-[#E0EDE7]">
            <span className="flex items-center gap-1.5"><Clock size={13} />{article.lesezeit}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{article.datum}</span>
          </div>

          {/* Artikel-Inhalt */}
          <div className="prose-liva">
            {renderMarkdown(article.inhalt)}
          </div>

          {/* Was bedeutet das für dich? – CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#0F6E56] to-[#0a5441] p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Nächster Schritt</p>
            <h3 className="font-serif text-2xl mb-2">Was bedeutet das konkret für dich?</h3>
            <p className="text-white/75 text-sm mb-5 leading-relaxed">
              Ermittle deinen Pflegegrad und sieh sofort welche Leistungen du oder dein Angehöriger beantragen kann – kostenlos, in 5 Minuten.
            </p>
            <Link
              href="/pflegegrad-rechner"
              className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Pflegegrad-Rechner starten <ArrowRight size={15} />
            </Link>
          </div>

          {/* Verwandte Artikel */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Weitere Artikel</p>
              <div className="space-y-3">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/news/${a.slug}`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-[#E0EDE7] bg-white hover:border-brand hover:shadow-sm transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-brand transition-colors text-sm leading-snug mb-1">
                        {a.titel}
                      </p>
                      <p className="text-xs text-gray-400">{a.datum} · {a.lesezeit}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-brand mt-1 flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
