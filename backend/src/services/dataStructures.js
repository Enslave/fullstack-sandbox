
const successWrap = (msg, code = null) => {
    return new Promise(r => {
      r({
        responseCode: code ? code : 200,
        data: msg
      })
    })
  }
  
  const errorWrap = (msg, code = null) => {
    return new Promise(r => {
      r({
        responseCode: code ? code : 400,
        data: msg
      })
    })
  }
  
  const customWrap = data => {
    return new Promise(r => {
      r(data)
    })
  }
  

  const respond = (res, data) => {
    console.log('responding', data)
    res.status(data.responseCode ? data.responseCode : 200).send(data.data)
  }

module.exports = {
    responses: {
        promises: {
            successWrap,
            errorWrap,
            customWrap
        }
    },

    respond

}