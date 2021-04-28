// blob --> file --> dataURL(base64) | blobURL --> blob
export function blobToFile(blob, filename) {
  return new File([blob], filename, { lastModified: new Date().getTime(), type: blob.type })
}

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.onerror = () => {
      reject(new Error('fileToBase64 error'))
    }
  })
}

export function base64ToBlob(base64) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function base64ToFile(base64, filename) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

// type image/png
// type image/jpeg image/webp quality 0-1
export function urlToBase64(url, mineType = 'image/jpeg', quality = 1) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    let image = new Image()
    image.onload = function () {
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      context.drawImage(this, 0, 0, this.width, this.height)
      const dataURL = canvas.toDataURL(mineType, quality)
      resolve(dataURL)
      canvas = null
      image = null
    }
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = url
    image.onerror = () => {
      reject(new Error('urlToBase64 error'))
    }
  })
}

export function downloadBlob(blob, filename = 'filename') {
  const blobURL = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = filename
  link.href = blobURL
  link.click()
  URL.revokeObjectURL(blobURL)
  link.remove()
}

export async function downloadImage(url, filename) {
  filename = filename || getFileNameByUrl(url)
  downloadBlob(await urlToBase64(url), filename)
}

function getFileNameByUrl(url) {
  return url.substring(url.lastIndexOf('/') + 1, url.length)
}

export function downloadByUrl(url, filename, method = 'GET', body = '') {
  filename = filename || getFileNameByUrl(url)
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  if (method.toLocaleLowerCase() === 'post') {
    xhr.setRequestHeader('Content-Type', 'application/json')
  }
  xhr.responseType = 'blob'
  xhr.onload = function () {
    downloadBlob(xhr.response, filename)
  }
  xhr.send(body)
}

export async function downloadByUrl2(url, filename, method = 'GET', body = '') {
  filename = filename || getFileNameByUrl(url)

  let params = {
    method,
  }
  if (method.toLocaleLowerCase() === 'post') {
    params = Object.assign(params, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
  }
  const res = await fetch(params)
  const blob = await res.blob()
  downloadBlob(blob, filename)
}
