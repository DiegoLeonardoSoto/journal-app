import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config({
  cloud_name: 'ducunxgsc',
  api_key: '615126416711423',
  api_secret: 'GvVRfBDFT8eHHSgNQz6IIv_ECh8',
  secure: true
})

describe('test fileUpload', () => {
  test('should upload file to Cloudinary successfully', async () => {
    const imageUrl =
      'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'foto.jpg')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')
    await cloudinary.api.delete_resources([imageId], {
      resource_type: 'image'
    })
  })

  test('should return null', async () => {
    const file = new File([], 'foto.jpg')
    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
