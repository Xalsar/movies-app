import { useRouter } from "next/navigation";

export const useNavigateToMovieDetails = () => {
  const router = useRouter();

  const navigateToMovieDetails = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  return { navigateToMovieDetails };
};
