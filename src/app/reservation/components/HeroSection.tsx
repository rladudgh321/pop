import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative h-[400px] rounded-xl overflow-hidden mb-12">
      <div className="absolute inset-0 bg-amber-50 bg-opacity-50 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("/popcorn-pattern.svg")', backgroundSize: '200px', opacity: 0.1 }} />
      </div>
      <Image
        src="https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=1470&auto=format&fit=crop"
        alt="뻥튀기 기계 전시"
        fill
        className="object-cover z-10"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex flex-col justify-center items-center text-white p-4 z-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">뻥튀기 기계 예약</h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl drop-shadow-md">최고의 품질과 서비스로 특별한 순간을 만들어드립니다</p>
      </div>
    </section>
  );
};

export default HeroSection; 