document.addEventListener("DOMContentLoaded", function(event) {
  axios.get('/users')
    .then( res => {
      console.log(res)
    })
    .catch( err => {
      console.log(err)
    })
})
