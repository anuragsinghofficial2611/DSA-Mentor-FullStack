
const errorHandler = (err,req,res,next) => {
    console.log(err);
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statuscode).json({
        success: false,
        status: statuscode,
        message: err.message
    })
}

module.exports = errorHandler;
