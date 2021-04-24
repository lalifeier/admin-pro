module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: {
          access_token: 'access_token',
          refresh_token: 'refresh_token'
        }
      }
    }
  },
  {
    url: '/user/getUserInfo',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          access_token: 'access_token',
          refresh_token: 'refresh_token',
          roles: ['admin']
        }
      }
    }
  }
]
