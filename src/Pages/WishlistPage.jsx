import { useFavorite } from "@/hooks/useApi";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import { shopbag as Shopbag } from "@/Components/Icons/draftIcon";
import { Link } from "react-router";
import ProductDetailIcon from "@iconify-react/material-symbols/expand-all";
import { ensureSession, supabase } from "@/utils/supabase";

const WishlistPage = () => {
  const { favorites, loading, error, setFavorites, setError } = useFavorite();

  const deleteFavoriteItem = async (productId) => {
    const removedFavorite = favorites.find(
      (item) => item.product_id === productId,
    );
    setFavorites((prev) =>
      prev.filter((item) => item.product_id !== productId),
    );

    const rollback = () => {
      if (removedFavorite) {
        setFavorites((prev) =>
          prev.some((item) => item.product_id === productId)
            ? prev
            : [removedFavorite, ...prev],
        );
      }
    };

    try {
      await ensureSession();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: favoriteError } = await supabase
        .from("favorites")
        .delete()
        .eq("product_id", productId)
        .eq("user_id", user.id);

      if (favoriteError) {
        setError(favoriteError);
        rollback();
      }
    } catch (err) {
      setError(err);
      rollback();
    }
  };

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
          <p className="w-fit max-w-auto sm:max-w-md lg:max-w-xl mx-auto text-center text-stone-500 text-xl font-semibold mt-12">
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
                      className="border border-primary size-12 flex items-center justify-center text-xl font-semibold text-stone-500 absolute top-0 right-0 bg-background hover:cursor-pointer"
                      onClick={() => deleteFavoriteItem(fav.product_id)}
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
                      {items?.detail.color}
                    </span>
                    <div className="w-full h-14 flex items-center gap-4 mt-6">
                      <button className="w-full h-full bg-stone-900 hover:bg-stone-800 hover:cursor-pointer px-4 flex items-center justify-between font-semibold text-white">
                        <>Add to bag</>
                        <Shopbag className="text-white size-7" />
                      </button>
                      <Link
                        to={`/${items?.slug}`}
                        onClick={() => window.scrollTo({ top: 0 })}
                        className="w-18 h-full border border-primary flex items-center justify-center"
                      >
                        <ProductDetailIcon className="size-8 text-primary rotate-45" />
                      </Link>
                    </div>
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
