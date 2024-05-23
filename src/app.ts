import express from 'express'
import path from 'path'
const app = express()

app.use(express.static(path.join(__dirname, '/../client/dist')))

app.use('*', (res: any) => {
  res.sendFile(path.join(__dirname, '/../client/dist', 'index.html'))
})

// Start the server
app.listen(3000, () => {
  console.log(`App listening on port 3000`)
  console.log('Press Ctrl+C to quit.')
})
