import bcrypt from 'bcryptjs'


const users = [
    {
        name: 'Admin',
        email:'orisouchami1@gmail.com',
        password: bcrypt.hashSync('Shopadminori1',10), //hash the pasword you entered when you set the admin user in mongo
        isAdmin: true
    },
    {
        name: 'joe',
        email:'joe@gmail.com',
        password: bcrypt.hashSync('123456',10),
        
    },
    {
        name: 'john',
        email:'john@gmail.com',
        password: bcrypt.hashSync('123456',10),
        
    }
]

export default users