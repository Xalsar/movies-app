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
        <p className="text-2xl font-bold text-blue-700">
          The return of the Jedi
        </p>
        <p>01/1999</p>
        <p>5/5</p>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl py-3">
      <form className="flex gap-3">
        <input
          className="block flex-1 rounded border border-gray-300 p-3 shadow"
          name="search"
          placeholder="Search for a movie..."
          id="search"
        />
        <button className="rounded border p-3">Search</button>
      </form>
      <div className="flex flex-wrap items-center justify-evenly">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <div className="mt-10">
        <h2 className="mb-3 text-3xl font-bold text-blue-700">
          Popular movies
        </h2>
        <div className="flex flex-wrap items-center justify-evenly">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </div>
  );
}
