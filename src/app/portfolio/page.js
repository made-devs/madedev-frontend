import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <section className="bg-dark min-h-screen flex flex-col">
      {/* Navbar tetap di atas */}
      <Navbar />

      {/* Konten di tengah layar */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-extrabold text-secondary">
          🚧
          <br />
          Under Construction
          <br />
          🚧
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Halaman portfolio sedang dalam pengembangan. Nantikan update terbaru!
        </p>
        <div className="mt-6">
          <Link href="/" passHref>
            <span className="px-6 py-3 bg-primary text-dark font-semibold rounded-lg shadow-md hover:bg-secondary transition cursor-pointer">
              Kembali ke Beranda
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
