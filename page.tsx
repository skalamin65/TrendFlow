"use client"

import { useWishlist } from "@/components/wishlist-provider"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding products to your wishlist by clicking the heart icon on any product you love.
            </p>
            <Button asChild size="lg" data-cursor="button">
              <Link href="/products" data-cursor="link">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist} className="mt-4 sm:mt-0" data-cursor="button">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Share Your Wishlist</h2>
        <p className="text-gray-600 mb-4">
          Share your wishlist with friends and family so they know what you're hoping for!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1" data-cursor="button">
            Copy Link
          </Button>
          <Button variant="outline" className="flex-1" data-cursor="button">
            Share via Email
          </Button>
          <Button variant="outline" className="flex-1" data-cursor="button">
            Share on Social
          </Button>
        </div>
      </div>
    </div>
  )
}

function WishlistItem({ product }: { product: any }) {
  const { removeFromWishlist } = useWishlist()

  const handleAddToCart = () => {
    // In a real app, this would add to cart
    console.log("Adding to cart:", product.id)
    // Show success message
    alert("Added to cart!")
  }

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100" data-cursor="product">
        <Link href={`/products/${product.id}`} data-cursor="link">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Remove from Wishlist Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => removeFromWishlist(product.id)}
          data-cursor="wishlist"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove from wishlist</span>
        </Button>

        {/* Product Badges */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded">
            NEW
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">SALE</div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} data-cursor="link">
          <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">{product.rating.toFixed(1)}</span>
        </div>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {product.isSale && product.salePrice ? (
              <>
                <span className="font-bold text-lg">${product.salePrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through ml-2 text-sm">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          <span className="text-xs text-gray-500 capitalize">{product.category}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddToCart} className="flex-1" data-cursor="cart">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeFromWishlist(product.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            data-cursor="wishlist"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove from wishlist</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
