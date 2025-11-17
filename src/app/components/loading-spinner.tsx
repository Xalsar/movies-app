import { Spinner } from "~/components/ui/spinner";

export const LoadingSpinner = ({ children }: { children?: string }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Spinner className="size-20" />
      <p className="text-2xl">{children}</p>
    </div>
  );
};
