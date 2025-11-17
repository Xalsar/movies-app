import Image from "next/image";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardTitle } from "~/components/ui/card";

export const MovieCard = ({
  imageUrl,
  title,
  releaseDate,
  rating,
}: {
  imageUrl: string;
  title: string;
  releaseDate: string;
  rating: string;
}) => {
  return (
    <Card className="my-3 block w-xl">
      <CardContent className="flex gap-3">
        <Image
          src={imageUrl}
          alt={`${title} poster`}
          width={200}
          height={300}
        />
        <div className="flex flex-col items-baseline gap-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <p>{releaseDate}</p>
          <p>{rating}</p>
          <Button className="mt-3 block">View details</Button>
        </div>
      </CardContent>
    </Card>
  );
};
