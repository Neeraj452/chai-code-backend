class ApiResponse { // we are creating a class to send response in a standard format, so that our frontend can easily handle it 
    constructor(statusCode, data, message = "Success"){ // we are passing status code, data, and message to constructor of this class
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }