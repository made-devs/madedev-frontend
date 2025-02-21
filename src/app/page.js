import Link from 'next/link';
import Carousel from '@/components/Carousel';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark pb-8 text-white">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto pt-8 pb-4 px-8">
        <h2 className="text-xl border-2 border-secondary py-2 font-lexend text-center font-light">
          Welcome to the{' '}
          <span className="text-secondary font-semibold">Mindscape</span>
        </h2>
        <p className="text-white mt-3 text-center text-[12px]  font-light font-lexend leading-relaxed ">
          They say life begins at 30, but for me, it’s where thoughts refuse to
          stay unspoken. So, here I am, turning words into a map of my mind.
          Enjoy the ride!
        </p>
      </div>

      <Carousel />
    </div>
  );
}

