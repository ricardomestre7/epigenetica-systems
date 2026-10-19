import type { Metadata } from 'next';
import './globals.css';
import AntiCopyShield from './components/AntiCopyShield';

export const metadata: Metadata = {
  title: 'Epigenética Systems · Modulação da Expressão Gênica & Longevidade',
  description:
    'Epigenética Systems — Sistema Canónico de Modulação da Expressão Gênica, Alavancas de Estilo de Vida, Metilação do DNA e Longevidade Celular. Autoria de Ricardo R Pereira · Safe Creative #2610157331452.',
  authors: [{ name: 'Ricardo R Pereira', url: 'https://cylindermargin.tech' }],
  creator: 'Ricardo R Pereira',
  publisher: 'Cylinder Margin',
  manifest: '/manifest.json',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-cyan-500/30 selection:text-white bg-[#061316] text-[#E6FFFA]">
        <AntiCopyShield />
        {children}
      </body>
    </html>
  );
}
