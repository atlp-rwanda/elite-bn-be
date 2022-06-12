import { Feedback, Users } from '../database/models/index'
export default class DemoController {
    static async getFeedback(req, res) {
        const feedback = await Feedback.findAll({
            include: [
                { model: Users, as: "user" }
            ]
        })
        return res.send({ message: "Feedback fetched successfully", feedback })
    }
    static async sendFeedback(req, res) {
        const { email, feedback } = req.body

        const user = await Users.findOne({ where: { email: email } })
        if (!user) res.send({ message: "user is not registered" })

        try {
            const createdFeedback = await Feedback.create({ userId: user.id, feedback: feedback })
            res.send({ message: "Feedback created successfully", data: createdFeedback })
        } catch (error) {
            res.send({ message: "There was an error" })
        }
        // console.log(req)
        // const feedback = await Feedback.findAll()
        // return res.send({ message: "Feedback posted successfully", user })
    }
}