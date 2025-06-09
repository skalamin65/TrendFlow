"use client"

import { useWishlist } from "@/components/wishlist-provider"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function WishlistFloatingIndicator() {
  const { wishlistCount } = useWishlist()
  const [showPulse, setShowPulse] = useState(false)
  const [prevCount, setPrevCount] = useState(0)

  useEffect(() => {
    if (wishlistCount > prevCount) {
      setShowPulse(true)
      setTimeout(() => setShowPulse(false), 1000)
    }
    setPrevCount(wishlistCount)
  }, [wishlistCount, prevCount])

  if (wishlistCount === 0) return null

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="relative">
        <div className="bg-red-500 text-white rounded-full p-3 shadow-lg">
          <Heart className="h-6 w-6 fill-current" />
        </div>
        <div className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border-2 border-red-500">
          {wishlistCount}
        </div>
        <AnimatePresence>
          {showPulse && (
            <motion.div
              className="absolute inset-0 bg-red-500 rounded-full"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
