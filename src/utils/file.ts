export function getBase64WithFile(file: File, mode?: 'base64' | 'text') {
  return new Promise<{
    result: string;
    file: File;
  }>((resolve, reject) => {
    const reader = new FileReader();
    if (mode === 'text') {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file);
    }
    reader.onload = () => resolve({ result: reader.result as string, file });
    reader.onerror = (error) => reject(error);
  });
}

export function downloadByData(data: BlobPart, filename: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}