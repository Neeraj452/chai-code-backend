const asyncHandler = (requestHandler) => { // this function will take request handler as argument and return a function,
    return (req, res, next) => { // this function will take req, res, next as arguments and return a promise
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)) // this function will resolve the promise returned by request handler and if there is any error it will pass it to next function
    }
}


export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }