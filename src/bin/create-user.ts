import connectToMongo from 'config/mongo'
import { PromptInputs } from 'bin/types'
import { User } from 'models'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import prompt from 'prompt'

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
          throw new Error('პაროლი უნდა შედგებოდეს მინიმუმ 3 ასოსგან')
        }
        password = await bcrypt.hash(process.env.USER_PASSWORD, 12)

        if (username.length < 3) {
          throw new Error('სახელი უნდა შედგებოდეს მინიმუმ 3 ასოსგან')
        }

        for (let i = 0; i < username.length; i++) {
          if (username[i] === username[i].toUpperCase()) {
            throw new Error(
              '\nსახელი უნდა შეიცავდეს დაბალი რეგისტრის ასოებს და სიმბოლოებს'
            )
          }
        }
      }

      await User.create({
        username,
        password,
      })

      console.log(`\nმომხმარებელი წარმატებით დარეგისტრირდა`)
    } catch (error: any) {
      if (error.message.includes('E11000')) {
        console.log('ამ სახელით მომხმარებელი უკვე არსებობს')
      } else {
        console.log(`${error.message}`)
      }
    }

    await mongoose.connection.close()
  })()
}

const schema = {
  properties: {
    Username: { description: 'შეიყვანეთ თქვენი სახელი', required: true },
    Password: {
      required: true,
      hidden: true,
      description: 'შეიყვანეთ თქვენი პაროლი',
      replace: '*',
    },
  },
}

prompt.colors = false

prompt.message = ''

prompt.get(schema, (_, result: PromptInputs) => {
  const { Username, Password } = result

  process.env.USER_USERNAME = Username
  process.env.USER_PASSWORD = Password

  createUser()
})
