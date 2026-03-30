import Container from '@/components/ui/Container';

const steps = [
  {
    number: '1',
    title: 'Esnafa erin web sitesi açmasına',
    description: 'Her esnafın kendi web sitesi açmasına ya Hangar içinde modern profil sayfasına sahip olur.',
  },
  {
    number: '2',
    title: 'Siz teklif merkezi oluşturuz',
    description: 'Talep size düşer, siz işi üzetiyi olan esnaflara gönderirsiniz.',
  },
  {
    number: '3',
    title: 'Müşteriye temiz fiyat listesi çıkarsınız',
    description: 'Gelen 5 teklif arası 8₺-15, kargoçu ver mu, hepsi-de,heysi listede görünür.',
  },
  {
    number: '4',
    title: 'SEO ile trafik büyür',
    description: 'Blog yazıları ve parça bazlı sayfalar Google\'dan sürekli kullanıcı getirir.',
  },
];

export default function HowItLooks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Site açılınca nasıl karşılar?
            </h2>
            <p className="text-gray-500 mb-8">
              İlk aşamada hem güven veri, hem aramaya yönlendirir, hem de &quot;bu site sanayideki
              parçacı dizisi taşıyor&quot; hissini verir.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">hangar.com.tr</span>
              </div>
              <div className="text-sm text-gray-600 font-medium mb-3">Sanayideki parçacılar tek yerde</div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full mx-auto mb-2"></div>
                    <div className="text-xs text-gray-500">Esnaf {i}</div>
                    <div className="text-xs font-medium text-primary">{(3.5 + i * 0.3).toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Neden bu model tutar?
            </h2>
            <p className="text-gray-500 mb-8">
              Çünkü esnaf site kurmaz, müşteri güvenilir esnaf bulamaz, aracı modeli
              parça ve fiyat karşılaştırma yapamaz.
            </p>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
