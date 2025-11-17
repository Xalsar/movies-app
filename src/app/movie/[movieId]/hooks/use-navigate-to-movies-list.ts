import { useRouter } from "next/navigation";

export const useNavigateToMoviesList = () => {
  const router = useRouter();

  const navigateToMoviesList = () => {
    router.push(`/`);
  };

  return { navigateToMoviesList };
};
