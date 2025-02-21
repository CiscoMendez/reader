'use client';
import Image from 'next/image';
interface LoaderScreenProps {
  cover: {
    url: string;
    blurdataurl: string;
    width: number;
    height: number;
  };
  logo: string;
  progressPercent: number;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({
  cover,
  logo,
  progressPercent,
}) => {
  return (
    <div className="h-dvh w-screen relative flex flex-col items-center justify-between">
      <div className="pb-6 flex items-center flex-1">
        <Image
          className="z-10 max-h-96"
          width={300}
          height={500}
          src={logo}
          alt=""
          style={{ height: 'auto', width: 'auto' }}
          priority
        />
      </div>
      {/* <div
        className="absolute -z-10 w-full h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${cover.url})` }}
      /> */}
      <Image
        className="absolute -z-10 object-cover"
        width={cover.width}
        height={cover.height}
        src={cover.url}
        placeholder="blur"
        blurDataURL={cover.blurdataurl}
        alt=""
        style={{ height: '100vh', width: '100%' }}
        priority
      />
      <div
        className="absolute -z-10 w-full h-full"
        style={{
          background:
            'radial-gradient(70.97% 120.36% at 50% 50%, rgba(242, 234, 224, 0.00) 28%, #F2EAE0 77.5%)',
        }}
      />
      <div className="w-full h-2 bg-[#F2EAE0]/80 backdrop-blur-sm">
        <div
          className="bg-[#E54056] text-xs font-medium text-blue-100 text-center p-0.5 h-full leading-none rounded-full transition-all ease-in duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoaderScreen;
