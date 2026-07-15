import { useFavorite } from "@/hooks/useApi";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import { shopbag as Shopbag } from "@/Components/Icons/draftIcon";

const WishlistPage = () => {
  const { favorites, loading, error } = useFavorite();

  if (loading) return <SkeletonCard />;
  if (error || !favorites)
    return (
      <div className="w-fit mx-auto my-12 text-xl text-stone-500">
        {error || "Favorite items not found"}
      </div>
    );

  return (
    <section id="wishlist">
      <div className="flex items-center gap-3">
        <h2 className="text-4xl font-bold text-stone-900">My Wishlist</h2>
        <span className="block text-primary">[{favorites.length}]</span>
      </div>
      <div className="w-full h-auto">
        {favorites.length === 0 ? (
          <p className="w-fit mx-auto text-stone-500 text-xl font-semibold">
            You haven't saved any items to your wishlist yet. Start shopping and
            add your favorite items to your wishlist.
          </p>
        ) : (
          <ul className="w-full h-auto grid grid-cols-3 gap-6 my-12">
            {favorites.map((fav) => {
              const items = fav?.products;
              const images = items?.product_images?.[0]?.images || [];

              return (
                <li key={fav.id} className="w-full h-auto">
                  <div className="w-full h-100 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={images[0]}
                      alt={`Images ${items?.name}`}
                      loading="lazy"
                      width={500}
                      height={500}
                    />

                    <button
                      type="button"
                      className="border border-primary size-12 flex items-center justify-center text-xl font-semibold text-stone-500 absolute top-0 right-0 bg-background"
                    >
                      <span className="block mt-0">X</span>
                    </button>
                  </div>
                  <div className="pt-6 w-full">
                    <h4 className="text-xl text-stone-900 font-semibold">
                      {items?.name}
                    </h4>
                    <p className="text-primary">${items?.price}</p>
                    <span className="block mt-3 text-stone-500">
                      {items?.detail[9]}
                    </span>
                    <button className="mt-6 w-full h-auto bg-stone-900 hover:bg-stone-800 hover:cursor-pointer p-4 flex items-center justify-between font-semibold text-white">
                      <>Add to bag</>
                      <Shopbag className="text-white size-7" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
