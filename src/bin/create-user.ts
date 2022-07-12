import connectToMongo from 'config/mongo'
import readline from 'readline'
import User from 'models/User'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

const readLine = readline.createInterface({
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
        if (process.env.USER_PASSWORD.length < 3)
          throw new Error('Password should be 3 characters long')
        password = await bcrypt.hash(process.env.USER_PASSWORD, 12)

        if (username.length < 3)
          throw new Error('username should be 3 characters long')

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

      console.log('user created successfully')
    } catch (error: any) {
      console.log(error.message)
    }

    await mongoose.connection.close()
  })()
}

readLine.question(`username: `, (username) => {
  process.env.USER_USERNAME = username
  readLine.question(`password: `, (password) => {
    process.env.USER_PASSWORD = password
    readLine.close()
    createUser()
  })
})
