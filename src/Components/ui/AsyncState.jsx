import { Loading } from "./Loading";

export const AsyncState = ({
  loading,
  error,
  children,
  loadingFallback,
  errorFallback,
}) => {
  if (loading) return loadingFallback ?? <Loading />;
  if (error)
    return (
      errorFallback ?? (
        <p className="text-center text-sm text-red-500 py-10">
          Something went wrong. Please try again.
        </p>
      )
    );
  return children;
};
