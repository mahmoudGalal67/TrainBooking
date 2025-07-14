import { Cloudinary } from '@cloudinary/url-gen'
import { format } from '@cloudinary/url-gen/actions/delivery'

const cloadName = 'dxmadjdfe'

const cld = new Cloudinary({ cloud: { cloudName: cloadName } })

export const handleUploadImage = async (images, hotelId) => {
  const uploadedImages = []
  if (!Array.isArray(images) || images.length < 1) return []

  try {
    const uploadPromises = images.map(async (img, i) => {
      const publicId = `hotels/${hotelId}/image-${i + 1}`

      const cloadImage = cld.image(publicId)
      cloadImage.quality('auto').delivery(format('auto'))

      const imageUrl = cloadImage.toURL()
      
      const checkRes = await fetch(imageUrl, { method: 'HEAD' })
      if (checkRes.ok) {
        uploadedImages.push(imageUrl)
        return
      }

      const formData = new FormData()
      formData.append('file', img.url)
      formData.append('upload_preset', 'preset')
      formData.append('folder', `hotels/${hotelId}`)
      formData.append('public_id', `image-${i + 1}`)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloadName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      if (data.secure_url) {
        uploadedImages.push(data.secure_url)
      }
    })
    await Promise.all(uploadPromises)
    return uploadedImages
  } catch (err) {
    console.log('image upload failed')
    return []
  }
}
