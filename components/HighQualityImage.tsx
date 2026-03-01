'use client'

import { useState } from 'react'
import Image from 'next/image'

interface HighQualityImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'
  sizes?: string
  quality?: number
  priority?: boolean
  onLoad?: () => void
}

/**
 * High-quality image component that ensures proper rendering across all platforms
 * - Handles loading states
 * - Provides fallback for missing images
 * - Optimized for Vercel CDN and web delivery
 * - Automatic quality settings for best fit
 */
export default function HighQualityImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  objectFit = 'cover',
  sizes,
  quality = 100,
  priority = false,
  onLoad,
}: HighQualityImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoadingComplete = (event?: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false)
    // New next/image API recommends using `onLoad`.
    // Call the `onLoad` callback if provided.
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  // Fallback for missing images
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
      >
        <div className="text-center text-gray-500">
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 animate-pulse ${className}`}
        />
      )}

      {/* Image container with fill */}
      {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              quality={quality}
              priority={priority}
              className={`object-${objectFit} ${className}`}
              onLoad={handleLoadingComplete}
              onError={handleError}
              sizes={sizes}
            />
      ) : (
        /* Fixed dimension image */
        <Image
          src={src}
          alt={alt}
          width={width || 300}
          height={height || 300}
          quality={quality}
          priority={priority}
          className={`${className}`}
          onLoad={handleLoadingComplete}
          onError={handleError}
        />
      )}
      </>
  )
}
