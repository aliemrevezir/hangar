import Container from '@/components/ui/Container';

const stats = [
  { value: '500+', label: 'Listelenen esnaf' },
  { value: '120.000+', label: 'Aylık organik trafik' },
  { value: '4-12', label: 'Talep başına teklif' },
  { value: '%18', label: 'Dönüşüm işadı' },
];

export default function StatsBar() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
