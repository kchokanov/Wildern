import fs from 'fs'
import path from 'path'
import express from 'express'

export function sendImage (req: express.Request, res: express.Response): void {
  if (req.query.file == null) {
    res.status(400).send('No file name in request')
    return
  }

  let filePath = ''
  switch (req.query.file) {
    case 'frame_wildern':
      filePath = path.join(String(process.env.RES_PATH), '/cardFrames/Wildern_base_frame.png')
      break
    default:
      res.status(400).send(`No file matching name: ${String(req.query.file)}`)
      return
  }

  fs.readFile(filePath, function (err, data) {
    if (err != null) {
      console.error(err)
      res.status(500).send(`Failed to read file: ${String(req.query.file)}`)
    } else {
      res.status(200).send(Buffer.from(data).toString('base64'))
      console.log(`Sent file: ${String(req.query.file)}`)
    }
  })
}
