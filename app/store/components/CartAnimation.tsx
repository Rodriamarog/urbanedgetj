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
  }, [isAnimating])

  if (!isAnimating || !startPosition || !targetPosition) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        key={animationKey}
        className="fixed z-[9999] pointer-events-none"
        initial={{
          x: startPosition.x,
          y: startPosition.y,
          scale: 1,
          opacity: 1
        }}
        animate={{
          x: targetPosition.x,
          y: targetPosition.y,
          scale: 0.3,
          opacity: 0.8
        }}
        exit={{
          scale: 0,
          opacity: 0
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        onAnimationComplete={onComplete}
      >
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
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