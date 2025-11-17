import Link from "next/link";

import { Card, CardContent, CardTitle } from "~/components/ui/card";

export const MovieCard = ({
  href,
  imageUrl,
  title,
  releaseDate,
  rating,
}: {
  href: string;
  imageUrl: string | null;
  title: string;
  releaseDate: string;
  rating: string;
}) => {
  return (
    <Link href={href}>
      <Card className="my-3 block w-xl">
        <CardContent className="flex gap-3">
          {imageUrl && (
            <img src={imageUrl} alt={`${title} poster`} className="w-30" />
          )}
          <div className="flex flex-col items-baseline gap-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <p>{releaseDate}</p>
            <p>{rating}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
