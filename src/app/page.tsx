import Image from "next/image";

const MovieCard = () => {
  return (
    <div className="w-1xl my-3 flex gap-4 rounded border border-gray-300 p-5 shadow-md">
      <Image
        src="https://picsum.photos/200/300"
        alt="Movie poster"
        width={200}
        height={300}
      />
      <div>
        <h2 className="text-2xl font-bold text-blue-700">
          The return of the Jedi
        </h2>
        <p>01/1999</p>
        <p>5/5</p>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="relative w-full gap-3">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-evenly">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
