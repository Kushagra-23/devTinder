const adminAuth = (req, res, next) => {
  console.log("Checking auth")
  const token = 'abc'
  const isAuthenticated = token === 'abc'
  if(!isAuthenticated){
    res.status(401).send("Token invalid")
  }else {
    next();
  }
}

module.exports = {
  adminAuth
}