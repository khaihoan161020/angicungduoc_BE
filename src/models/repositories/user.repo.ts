import userModel from '../user.model'
interface findUserByEmail {
    email: string
    select?: any
}
class UserRepo {
    static findUserByEmail = async ({
        email,
        select = {
            email: 1,
            password: 2,
            name: 1,
            status: 1,
            roles: 1
        }
    }: findUserByEmail) => {
        return await userModel.findOne({ email }).select(select).lean()
    }
}

export default UserRepo
