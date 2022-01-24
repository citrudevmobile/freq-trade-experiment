module.exports = {

    verifyEmail: (token) => {
      return `<div>
      <h1>Welcome to Best-Crypto-Bot-Ever</h1>
      <h3>Please follow this <a target="_blank" href="${process.env.DOMAIN_URL}/confirm-email-link/${token}">link</a> to verify your email.</h3>
      <br/>
      <p>Expires in 30 minutes</a>
      </div>`
    },

    resetPasswordEmail: (token) => {
      return `<div>
      <h1>Welcome to Best-Crypto-Bot-Ever</h1>
      <h3>Please follow this <a target="_blank" href="${process.env.DOMAIN_URL}/reset-password/${token}">link</a> to reset your password.</h3>
      <br/>
      <p>Expires in 30 minutes</a>
      </div>`
    }

  }
  