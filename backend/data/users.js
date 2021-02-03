import bcrypt from 'bcryptjs'


const users = [
   
    {
        name: 'joe',
        email:'joe@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name: 'john',
        email:'john@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    }
]

export default users