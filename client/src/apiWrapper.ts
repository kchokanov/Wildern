import axios from 'axios'
import { card } from './types/card'
import { tribute } from './types/tribute'
import ObjectID from 'bson-objectid'

const API_URL: string | undefined = process.env.NODE_ENV === 'development' ? process.env.API_URL_DEV : process.env.API_URL_PROD

if(API_URL == null){
  console.error('No API URL found.')
}


//----- Validation methods -----//
function isDataBlank (data: any): boolean {
  if (data == null) {
    return true
  }
  if (String(data).replace(/\s/g, '') === '') {
    return true
  }
  return false
}


//----- Conversion methods -----//
function base64ToBlob (base64String: string, blobType: string): Blob {
  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  return new Blob([new Uint8Array(byteNumbers)], { type: blobType })
}

async function blobToBase64 (blob: Blob): Promise<string | null> {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return await new Promise(resolve => {
    reader.onloadend = () => {
      resolve(String(reader.result))
    }
  })
}

//----- API calls -----//

// Request to fetch card entry by Id
export async function getCardById (id: string): Promise<null | card> {
  let data = null
  await axios.get(`${API_URL}/api/card`, {
    params: {
      _id: id
    }
  }).then(res => {
    data = res.data
  }).catch(err => {
    console.error(err)
  })
  return data
}

// Request to fetch card entry by name
// TODO - consider overload for this and Id search
export async function getCardByName (name: string): Promise<null | card> {
  let data = null
  await axios.get(`${API_URL}/api/card`, {
    params: {
      name: name
    }
  }).then(res => {
    data = res.data
  }).catch(err => {
    console.error(err)
  })
  return data
}

// Request to get all card names matching query string
export async function getMathingNames (searchQueryStr: string): Promise<null | Array<{ name: string, _id: string }>> {
  let list: [] | null = []
  await axios.get(`${API_URL}/api/searchcard`, {
    params: {
      searchQueryStr
    }
  }).then(res => {
    list = res.data
  }).catch(err => {
    console.error(err)
    list = null
  })
  return list
}

// Request to get all tribute entries
export async function getAllTributes (): Promise<null | tribute[]> {
  let list: [] | null = []
  await axios.get(`${API_URL}/api/alltribute`)
    .then(res => {
      list = res.data
    }).catch(err => {
      console.error(err)
    })
  return list
}

// Request to write or update card entry
export async function postCard (data: card): Promise<boolean> {
  let success = false

  if (isDataBlank(data.name)) {
    console.error('Attempted upload with no name set.')
    return success
  }
  await getCardByName(data.name).then(async (compareData: any) => {
    if (compareData !== '' && data._id !== compareData._id) {
      console.error('Found card with different ID, but same name.')
    } else {
      await axios.post(`${API_URL}/api/savecard`, data)
        .then(() => {
          success = true
        }).catch(function (error) {
          console.error(error)
        })
    }
  })

  return success
}

// Request to write new tribute entry
// TODO add image
export async function postTribute (name: string): Promise<boolean> {
  let success = false

  if (isDataBlank(name)) {
    console.error('Attempted upload with no name set.')
    return success
  }
  const data: tribute = {
    name,
    _id: new ObjectID().toHexString(),
    thumbnail: null
  }

  await axios.post(`${API_URL}api/savetribute`, data)
    .then(() => {
      success = true
    }).catch(function (error) {
      console.error(error)
    })
  return success
}
