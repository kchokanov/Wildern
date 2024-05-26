import axios from 'axios'

export function saveCard (): void {
  axios.post(`${String(process.env.API_URL)}/api/savecard`,
    { name: 'reactCard', _id: '6650619e62ba12950d888020' })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getCard (): void {
  axios.get(`${String(process.env.API_URL)}/api/fetchcard`, {
    params: {
      _id: '6650619e62ba12950d888020'
    }
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
