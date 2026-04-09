import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/directory/WhatsAppButton';
import { formatPhone } from '@/lib/utils';
import { getDealerBySlug, getRelatedDealers } from '@/lib/mock-data';
import { PLANS } from '@/lib/plans';
import type { PlanType } from '@/lib/plans';
import type { Metadata } from 'next';
import {
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  StarFilled,
  CarOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  CrownOutlined,
  RightOutlined,
  CalendarOutlined,
  TrophyOutlined,
  SearchOutlined,
} from '@ant-design/icons';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);
  if (!dealer) return { title: 'Bulunamadi | Hangar' };
  return {
    title: `${dealer.name} | Hangar`,
    description: `${dealer.name} - ${dealer.city} ${dealer.district} bolgesinde ${dealer.brands.join(', ')} yedek parca esnafi.`,
  };
}

function PlanBadge({ plan }: { plan: string }) {
  if (plan === 'premium') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
        <CrownOutlined />
        Premium Esnaf
      </span>
    );
  }
  if (plan === 'gold') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-medium text-amber-100">
        <TrophyOutlined />
        Gold Esnaf
      </span>
    );
  }
  return null;
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-primary text-lg">{icon}</span>
        <h3 className="font-semibold text-foreground text-base">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default async function DealerDetailPage({ params }: Props) {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);
  if (!dealer) notFound();

  const relatedDealers = getRelatedDealers(slug, 3);
  const planInfo = PLANS[dealer.plan as PlanType];
  const memberSince = dealer.createdAt.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <section className="pb-12 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <nav className="flex items-center gap-2 py-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <RightOutlined className="text-[10px] text-gray-300" />
            <Link href="/esnaf-dizini" className="hover:text-primary transition-colors">
              Esnaf Dizini
            </Link>
            <RightOutlined className="text-[10px] text-gray-300" />
            <span className="text-foreground font-medium truncate">{dealer.name}</span>
          </nav>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        <Container>
          <div className="py-10 lg:py-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-bold text-white border border-white/20">
                {dealer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    {dealer.name}
                  </h1>
                  <PlanBadge plan={dealer.plan} />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1.5">
                    <EnvironmentOutlined />
                    {dealer.city}, {dealer.district}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <StarFilled className="text-amber-300" />
                    <span className="text-white font-semibold">{dealer.rating.toFixed(1)}</span>
                    <span>puan</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container>
        <div className="grid lg:grid-cols-3 gap-6 -mt-6 relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* About */}
            {dealer.description && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-foreground text-base mb-3">Hakkinda</h3>
                <p className="text-gray-600 leading-relaxed border-l-4 border-primary/30 pl-4">
                  {dealer.description}
                </p>
              </div>
            )}

            {/* Brands & Models */}
            <SectionCard icon={<CarOutlined />} title="Markalar ve Modeller">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Markalar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dealer.brands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1.5 bg-primary/8 text-primary rounded-lg text-sm font-medium"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
                {dealer.models.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Modeller
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dealer.models.map((model) => (
                        <span
                          key={model}
                          className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-100"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Part Types */}
            <SectionCard icon={<ToolOutlined />} title="Parca Tipleri">
              <div className="flex flex-wrap gap-2">
                {dealer.partTypes.map((pt) => (
                  <span
                    key={pt}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* Specialties */}
            {dealer.specialties.length > 0 && (
              <SectionCard icon={<SafetyCertificateOutlined />} title="Uzmanlik Alanlari">
                <div className="flex flex-wrap gap-2">
                  {dealer.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Contact */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-foreground text-base mb-4">Iletisim</h3>
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <span className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <PhoneOutlined />
                  </span>
                  <span className="font-medium">{formatPhone(dealer.phone)}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <EnvironmentOutlined />
                  </span>
                  <span>{dealer.city}, {dealer.district}</span>
                </div>
                {dealer.address && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                      <HomeOutlined />
                    </span>
                    <span>{dealer.address}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <WhatsAppButton phone={dealer.whatsapp} size="large" block />
                </div>
                <a
                  href={`tel:${dealer.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium text-sm"
                >
                  <PhoneOutlined />
                  Telefon ile Ara
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-5">
            {/* Dealer Info Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-foreground text-base mb-4">Esnaf Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Uyelik Plani</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: planInfo.color }}
                  >
                    {planInfo.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Uyeligin Baslangici</span>
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <CalendarOutlined className="text-gray-400" />
                    {memberSince}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <StarFilled className="text-amber-400 text-lg" />
                      <span className="text-2xl font-bold text-foreground">
                        {dealer.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Genel Puan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Dealers */}
            {relatedDealers.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-foreground text-base mb-4">Benzer Esnaflar</h3>
                <div className="space-y-3">
                  {relatedDealers.map((rd) => (
                    <Link
                      key={rd.id}
                      href={`/esnaf-dizini/${rd.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {rd.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                          {rd.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <EnvironmentOutlined />
                            {rd.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <StarFilled className="text-amber-400" />
                            {rd.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <RightOutlined className="text-[10px] text-gray-300 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/esnaf-dizini"
                  className="mt-4 block text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Tum Esnaflari Gor
                </Link>
              </div>
            )}

            {/* Part Request CTA */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/15 p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <SearchOutlined className="text-primary text-xl" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Aradiginiz parcayi bulamadiniz mi?
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Parca talebi olusturun, esnaflar size ulassin.
              </p>
              <Link
                href="/parca-talebi"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors"
              >
                Parca Talebi Olustur
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/esnaf-dizini"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Tum Esnaflara Don
          </Link>
        </div>
      </Container>
    </section>
  );
}
