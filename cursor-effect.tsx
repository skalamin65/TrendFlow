"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseenter", mouseEnter)
    window.addEventListener("mouseleave", mouseLeave)

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      // Product images
      const productImages = document.querySelectorAll('[data-cursor="product"]')
      productImages.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("product"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Buttons
      const buttons = document.querySelectorAll('button, [data-cursor="button"]')
      buttons.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("button"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Links
      const links = document.querySelectorAll('a, [data-cursor="link"]')
      links.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("link"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Wishlist hearts
      const wishlistButtons = document.querySelectorAll('[data-cursor="wishlist"]')
      wishlistButtons.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("wishlist"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Cart buttons
      const cartButtons = document.querySelectorAll('[data-cursor="cart"]')
      cartButtons.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("cart"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })

      // Text areas
      const textElements = document.querySelectorAll('input, textarea, [data-cursor="text"]')
      textElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("text"))
        el.addEventListener("mouseleave", () => setCursorVariant("default"))
      })
    }

    // Initial setup
    addHoverListeners()

    // Re-run when DOM changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseenter", mouseEnter)
      window.removeEventListener("mouseleave", mouseLeave)
      observer.disconnect()
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      border: "2px solid rgba(0, 0, 0, 0.2)",
    },
    product: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "2px solid rgba(59, 130, 246, 0.3)",
    },
    button: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      border: "2px solid rgba(16, 185, 129, 0.3)",
    },
    link: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.75,
      backgroundColor: "rgba(139, 92, 246, 0.2)",
      border: "2px solid rgba(139, 92, 246, 0.4)",
    },
    wishlist: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      border: "2px solid rgba(239, 68, 68, 0.3)",
    },
    cart: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      border: "2px solid rgba(245, 158, 11, 0.3)",
    },
    text: {
      x: mousePosition.x - 1,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: "transparent",
      border: "1px solid rgba(0, 0, 0, 0.5)",
      borderRadius: "0",
      width: "2px",
      height: "24px",
    },
  }

  // Hide cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cursor-effect"
          variants={variants}
          animate={cursorVariant}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            mixBlendMode: "difference",
          }}
        />
      )}
    </AnimatePresence>
  )
}
