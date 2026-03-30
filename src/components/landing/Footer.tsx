import Link from 'next/link';
import Container from '@/components/ui/Container';

const footerLinks = [
  { label: 'Esnaf Dizini', href: '/esnaf-dizini' },
  { label: 'Parça Talebi', href: '#' },
  { label: 'SEO İçerik Platformu', href: '#' },
  { label: 'Paketler', href: '#paketler' },
  { label: 'Blog', href: '#' },
  { label: 'İletişim', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="font-semibold text-foreground">Hangar</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary">Esnaf Başvurusu</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
