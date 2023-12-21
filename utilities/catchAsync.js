module.exports = (fn)=>(req, res, next) =>{
    return fn(req, res, next).catch((error) => {
        next(error)
    })
}

// module.exports = (fn) => (req, res, next) => {
//     return fn(req, res, next).catch((error) => {
//         next(error);
//     });
// };
  