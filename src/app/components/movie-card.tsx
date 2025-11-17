import { Button } from "~/components/ui/button";

import { Card, CardContent, CardTitle } from "~/components/ui/card";

export const MovieCard = ({
  imageUrl,
  title,
  releaseDate,
  rating,
  handleClickViewMoreDetails,
}: {
  imageUrl: string | null;
  title: string;
  releaseDate: string;
  rating: string;
  handleClickViewMoreDetails: () => void;
}) => {
  return (
    <Card className="my-3 block w-xl">
      <CardContent className="flex gap-3">
        {imageUrl && (
          <img src={imageUrl} alt={`${title} poster`} className="w-30" />
        )}
        <div className="flex flex-col items-baseline gap-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <p>{releaseDate}</p>
          <p>{rating}</p>
          <Button className="mt-3 block" onClick={handleClickViewMoreDetails}>
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
