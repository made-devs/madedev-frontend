import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

async function fetchPortfolio() {
  const res = await fetch('http://localhost:5000/api/portfolio', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  return res.json();
}

export default async function PortfolioPage() {
  const portfolios = await fetchPortfolio();

  return (
    <section className="bg-dark min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-secondary text-center mb-6">
          My Portfolio
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio._id}
              className="bg-primary p-4 rounded-lg shadow-md"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {portfolio.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-dark text-secondary text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Image */}
              <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                <Image
                  src={portfolio.image}
                  alt={portfolio.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800">
                {portfolio.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {portfolio.description}
              </p>

              {/* Link */}
              <div className="mt-3">
                <p target="_blank" className="text-blue-500 font-semibold ">
                  View Project →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
