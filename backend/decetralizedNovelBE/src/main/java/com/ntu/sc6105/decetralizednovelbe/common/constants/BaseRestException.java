package com.ntu.sc6105.decetralizednovelbe.common.constants;

public abstract class BaseRestException extends RuntimeException{

    private StatusCode statusCode;

    private String errorMessage;

    public BaseRestException(StatusCode statusCode){
        super();
        this.statusCode = statusCode;
    }

    public StatusCode getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(StatusCode statusCode) {
        this.statusCode = statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
