import { openDB } from 'idb'
import React, { useEffect, useState } from 'react'

const dbName = 'HotelImageDB'
const StoreName = 'Images'
let version = 1
export default function CustomImage({ hotelId, src, alt, ...arg }) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchAndStoreImage = async () => {
      try {
        const db = await openDB(dbName, version, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(StoreName)) {
              db.createObjectStore(StoreName)
            }
          },
        })

        const cachedImage = await db.get(StoreName, hotelId)
        if (cachedImage) {
          setImage(cachedImage)
          return
        }

        const res = await fetch(src)

        if (!res.ok) throw new Error('Image Not Loaded')

        const blob = await res.blob()

        const blobUrl = URL.createObjectURL(blob)

        await db.put(StoreName, blobUrl, hotelId)

        setImage(blobUrl)
      } catch {}
    }

    fetchAndStoreImage()
  }, [src, hotelId])

  return <img src={image || src} alt={alt} {...arg} />
}
