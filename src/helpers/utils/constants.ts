
const Constants = {
    jwtSecret: 'JWT_SECRET',
    simple_jwt: 'jwt',
    reset_jwt: 'reset_jwt',
    databaseUrl: 'DATABASE_URL',
    postPicturePath: "data/posts/",
    userPicturePath: "data/users/",
    resetPassword: {
        resetMailSubject: "RESET-PASSWORD",
        resetMailFrom : "ig-clone <ig@clone.com>",
        resetMailText : "Confirm password reset: \n",
        reselLinkBase: 'http://localhost:3000/reset-password/'
    },
    mailCredentials:{
        host: 'MAIL_HOST',
        port: 'MAIL_PORT',
        auth: {
          user: 'MAIL_USER',
          pass: 'MAIL_PASS',
        },
    },

}


export default Constants;