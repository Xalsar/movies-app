import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";

export default function MoviePage() {
  return (
    <Card className="m-4 mx-auto max-w-7xl">
      <CardHeader>
        <CardTitle className="text-2xl">Movie Title</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="https://picsum.photos/800/1200"
            alt="Movie poster"
            width={800}
            height={1200}
            className="block"
          />
          <p>
            <span className="font-bold">Release date:</span> 12/25/2024
          </p>
          <p>
            <span className="font-bold">Overview:</span> This is a brief
            synopsis of the movie. It provides an overview of the plot and key
            themes.
          </p>
          <p>
            <span className="font-bold">Genre:</span> Action, Adventure, Sci-Fi
          </p>
          <p>
            <span className="font-bold">Rating:</span> 4.5/5
          </p>
          <p>
            <span className="font-bold">Runtime:</span> 120 minutes
          </p>
          <p>
            <span className="font-bold">Language:</span> English
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
