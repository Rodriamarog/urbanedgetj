"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface CartAnimationProps {
  isAnimating: boolean
  onComplete: () => void
  startPosition: { x: number; y: number } | null
  targetPosition: { x: number; y: number } | null
}

export const CartAnimation: React.FC<CartAnimationProps> = ({
  isAnimating,
  onComplete,
  startPosition,
  targetPosition
}) => {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (isAnimating) {
      setAnimationKey(prev => prev + 1)
    }
  }, [isAnimating, startPosition, targetPosition])

  if (!isAnimating || !startPosition || !targetPosition) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        key={animationKey}
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: 0,
          top: 0,
        }}
        initial={{
          x: startPosition.x - 32, // Center the 64px element
          y: startPosition.y - 32,
          scale: 0.8,
          opacity: 1
        }}
        animate={{
          x: targetPosition.x - 32,
          y: targetPosition.y - 32,
          scale: 0.3,
          opacity: 0.8
        }}
        exit={{
          scale: 0,
          opacity: 0
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onAnimationComplete={onComplete}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
          <ShoppingCart className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook to manage cart animations
export const useCartAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null)
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(null)

  const triggerAnimation = (startElement: HTMLElement, targetElement: HTMLElement) => {
    const startRect = startElement.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    setStartPosition({
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2
    })

    setTargetPosition({
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2
    })

    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    setStartPosition(null)
    setTargetPosition(null)
  }

  return {
    isAnimating,
    startPosition,
    targetPosition,
    triggerAnimation,
    handleAnimationComplete
  }
}