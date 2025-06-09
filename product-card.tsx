"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/components/wishlist-provider"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    rating: number
    category: string
    isNew?: boolean
    isSale?: boolean
    salePrice?: number
  }
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // In a real app, this would add to cart
    console.log("Adding to cart:", product.id)
  }

  return (
    <div className={cn("group relative rounded-lg border overflow-hidden", className)}>
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

        {/* Wishlist Button */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all z-10",
            inWishlist && "opacity-100 bg-red-50 text-red-500 hover:bg-red-100",
          )}
          onClick={handleWishlistToggle}
          data-cursor="wishlist"
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
          <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
        </Button>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full" onClick={handleQuickAdd} data-cursor="cart">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>

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
          <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">{product.name}</h3>
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

        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.isSale && product.salePrice ? (
              <>
                <span className="font-bold text-lg">${product.salePrice.toFixed(2)}</span>
                <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  )
}
