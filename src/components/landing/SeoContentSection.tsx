import Container from '@/components/ui/Container';

const contentTypes = [
  {
    number: '1',
    title: 'Blog yazıları',
    description: '"BMW F30 çıkma far nasıl alınır?" gibi çözek niyetli içerikler.',
  },
  {
    number: '2',
    title: 'Landing page\'ler',
    description: '"Ankara BMW çıkma parça", "Mercedes W204 kaporta fiyatı" gibi lokasyonlu sayfalalar.',
  },
  {
    number: '3',
    title: 'OEM rehberi',
    description: 'OEM kodu arayan profesyonel kullanıcıları yakalar.',
  },
  {
    number: '4',
    title: 'Talep sayfaları',
    description: 'Parça talep formu içeren SEO sayfaları dönüşümü artırır.',
  },
];

const exampleHeadlines = [
  { title: 'BMW F30 çıkma far arıkan sıralama', category: 'SEO', type: 'Blog' },
  { title: 'Şasi numarasıyla doğru parça nasıl bulunur?', category: 'Trust', type: 'Rehber' },
  { title: 'Ankara\'da BMW çıkma parçe nereden alınır?', category: 'Local', type: 'Landing' },
];

export default function SeoContentSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Google&apos;da büyümek için içerik bölümü
            </h2>
            <p className="text-gray-500 mb-8">
              Blog sadece &quot;bir şey de olsun&quot; diye değil, direkt trafik makinesi gibi kurulmalı.
              Özellikle marka-model-parça kombinasyonlarıyla çok sayfa oluşturulabilir.
            </p>

            <div className="space-y-5">
              {contentTypes.map((ct) => (
                <div key={ct.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {ct.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{ct.title}</h3>
                    <p className="text-sm text-gray-500">{ct.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Örnek içerik başlıkları
            </h2>
            <p className="text-gray-500 mb-8">
              Buradaki yapı sistem gövdenizi de artırır; sadece ilan sitesi değil, uzman
              platforma güvenirliğisiniz.
            </p>

            <div className="space-y-4">
              {exampleHeadlines.map((hl) => (
                <div key={hl.title} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <div className="font-medium text-sm text-foreground">{hl.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{hl.category}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    hl.type === 'Blog' ? 'bg-blue-50 text-blue-600' :
                    hl.type === 'Rehber' ? 'bg-green-50 text-green-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {hl.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
