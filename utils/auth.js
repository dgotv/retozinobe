// const  function verify(params) {
//   const user = await User.findById(req.userId)
// const roles = await Role.find({_id: {$in: user.roles}})
// for (let i = 0; i < roles.length; i++){
// if(roles[i].name ==="admin"){
//   res.render('admin/listUser')

//   if (!roles[i].name ==="admin")
//   next()
// }

const User = require('../components/user/model')
const jwt = require("jsonwebtoken");


// async  function  verifyToken (req, res, next){
//   const bearerHeader = await req.headers["authorization"]
//   console.log(bearerHeader)
//  //const token = await  req.headers
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = token.split(" ");
//     const bearerToken = bearer[1]
//     req.token = bearerToken
//     next()
//   } else {
// res.send("no token")
//   } 
// }

const verifyToken = async (req, res, next) => {
  const token = req.header.authorization
  if (!token ) return res.status(403).json({message: "No token Verify"})
          console.log(token)
  const decoded = jwt.verify(token, 'secret')
  req.userId = decoded.Id;
  console.log(decoded)

  const user = await User.findById(req.userId, {password: 0})
  if (!user) return res.status(404).json({message: 'no user 2 verify'})
  console.log(user)

  next()

}



module.exports = verifyToken