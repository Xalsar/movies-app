import Image from "next/image";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const MovieCard = () => {
  return (
    <Card className="my-3 block w-xl">
      <CardContent className="flex gap-3">
        <Image
          src="https://picsum.photos/200/300"
          alt="Movie poster"
          width={200}
          height={300}
        />
        <div>
          <CardTitle className="text-xl">The return of the Jedi</CardTitle>
          <p>01/1999</p>
          <p>5/5</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl py-3">
      <form className="flex gap-3">
        <Input name="search" placeholder="Search for a movie..." id="search" />
        <Button className="rounded border p-3">Search</Button>
      </form>
      <div className="flex flex-wrap items-center justify-evenly">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <div className="mt-10">
        <h2 className="mb-3 text-3xl font-bold">Popular movies</h2>
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
