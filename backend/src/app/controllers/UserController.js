import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation failed, there are missing parameters.' })
    }

    const { email } = req.body
    const user = await User.findOne({ where: { email } })

    if (user) {
      res
        .status(400)
        .json({ message: `User with email ${email} already exists.` })
    }

    const { id, name } = await User.create(req.body)

    return res.json({
      id,
      name,
      email,
    })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(8),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      oldPassword: Yup.string().when('password', (password, field) =>
        password ? field.required() : field
      ),
    })

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ message: 'Validation failed, there are missing parameters.' })
    }

    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      })

      if (userExists) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exists.` })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ message: 'Old password does not match.' })
    }

    const { id, name } = await user.update(req.body)

    return res.json({
      id,
      name,
      email: user.email,
    })
  }
}

export default new UserController()
