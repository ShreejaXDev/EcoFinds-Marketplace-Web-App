import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, BadgeCheckIcon, LeafIcon } from 'lucide-react';
import { Product } from '../../data/types';
import { useTheme } from '../../context/ThemeContext';
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const {
    theme
  } = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  const navigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };
  return <div className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${isHovered ? 'shadow-lg transform -translate-y-1' : ''} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={navigateToProduct}>
      <div className="relative">
        <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
        {/* Wishlist Button */}
        <button onClick={handleWishlist} className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors" aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
        </button>
        {/* Eco Badge */}
        {product.isEcoFriendly && <div className="absolute bottom-2 left-2 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <LeafIcon className="h-3 w-3 mr-1" />
            Eco-Friendly
          </div>}
        {/* View Button on Hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
            View Details
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium line-clamp-1">{product.title}</h3>
          <span className="font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="capitalize">{product.condition}</span>
          <span className="mx-2">•</span>
          <span>{product.category}</span>
        </div>
        {/* Seller Info */}
        <div className="mt-3 flex items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Sold by
          </span>
          <span className="ml-1 text-sm font-medium flex items-center">
            {product.seller.name}
            {product.seller.isVerified && <BadgeCheckIcon className="h-4 w-4 text-blue-500 ml-1" />}
          </span>
        </div>
        {/* Sustainability Score */}
        {product.sustainabilityScore && <div className="mt-2">
            <div className="flex items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Sustainability
              </div>
              <div className="ml-auto text-xs font-medium">
                {product.sustainabilityScore}/100
              </div>
            </div>
            <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{
            width: `${product.sustainabilityScore}%`
          }}></div>
            </div>
          </div>}
      </div>
    </div>;
};
export default ProductCard;