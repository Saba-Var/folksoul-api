import connectToMongo from 'config/mongo'
import readline from 'readline'
import User from 'models/User'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

const rl: any = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const createUser = () => {
  dotenv.config()
  ;(async () => {
    let mongoose = null
    mongoose = await connectToMongo()

    try {
      const username = process.env.USER_USERNAME
      let password: string | undefined

      if (process.env.USER_PASSWORD && username) {
        if (process.env.USER_PASSWORD.length < 3) {
          throw new Error('Password should be 3 characters long')
        }
        password = await bcrypt.hash(process.env.USER_PASSWORD, 12)

        if (username.length < 3) {
          throw new Error('Username should be 3 characters long')
        }

        for (let i = 0; i < username.length; i++) {
          if (username[i] === username[i].toUpperCase()) {
            throw new Error(
              'Username should include only lowercase letters and symbols'
            )
          }
        }
      }

      await User.create({
        username,
        password,
      })

      console.log(`\nUser created successfully`)
    } catch (error: any) {
      console.log(`\n${error.message}`)
    }

    await mongoose.connection.close()
  })()
}

let hideInput = false

rl.question(`Username: `, async (username: string) => {
  process.env.USER_USERNAME = username
  hideInput = true
  rl.question(`Password: `, async (password: string) => {
    process.env.USER_PASSWORD = password
    rl.close()
    createUser()
  })
})

rl._writeToOutput = async function _writeToOutput(stringToWrite: string) {
  if (hideInput) rl.output.write('\x1B[2K\x1B[200D' + 'password: ')
  else rl.output.write(stringToWrite)
}
