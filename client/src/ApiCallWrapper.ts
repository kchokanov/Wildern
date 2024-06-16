import axios from 'axios'
import { card } from './types/card'
import { tribute } from './types/tribute'
import ObjectID from 'bson-objectid'

// TODO - validate all
function isDataBlank (data: any): boolean {
  if (data == null) {
    return true
  }
  if (String(data).replace(/\s/g, '') === '') {
    return true
  }
  return false
}

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

export async function fetchCardbyId (id: string): Promise<null | card> {
  let data = null
  await axios.get(`${String(process.env.API_URL)}/api/fetchcard`, {
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

// TODO - function overload could be implemented for this and id search,
// but need to figure out a way to not get the args confused, since both are string
export async function fetchCardbyName (name: string): Promise<null | card> {
  let data = null
  await axios.get(`${String(process.env.API_URL)}/api/fetchcard`, {
    params: {
      name
    }
  }).then(res => {
    data = res.data
  }).catch(err => {
    console.error(err)
  })
  return data
}

export async function fetchCardListByNameMatch (searchQueryStr: string): Promise<null | Array<{ name: string, _id: string }>> {
  let list: [] | null = []
  await axios.get(`${String(process.env.API_URL)}/api/fetchcardnames`, {
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

export async function fetchTributeTypes (): Promise<null | tribute[]> {
  let list: [] | null = []
  await axios.get(`${String(process.env.API_URL)}/api/allvalue`)
    .then(res => {
      list = res.data
    }).catch(err => {
      console.error(err)
    })
  return list
}

export async function postCard (data: card): Promise<boolean> {
  let success = false

  if (isDataBlank(data.name)) {
    console.error('Attempted upload with no name set.')
    return success
  }
  await fetchCardbyName(data.name).then(async (compareData: any) => {
    if (compareData !== '' && data._id !== compareData._id) {
      console.error('Found card with different ID, but same name.')
    } else {
      await axios.post(`${String(process.env.API_URL)}/api/savecard`, data)
        .then(() => {
          success = true
        }).catch(function (error) {
          console.error(error)
        })
    }
  })

  return success
}

export async function postTributeType (name: string): Promise<boolean> {
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

  await axios.post(`${String(process.env.API_URL)}/api/savevalue`, data)
    .then(() => {
      success = true
    }).catch(function (error) {
      console.error(error)
    })
  return success
}
