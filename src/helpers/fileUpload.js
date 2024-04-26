export const fileUpload = async (file) => {
  if (!file) throw new Error('no existe archivo para subir')

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dhdmwguqm/upload'

  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    console.log(resp)
    if (!resp.ok) throw new Error('No se pudo subir la imagen')

    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    throw new Error(error.meessage)
  }
}
