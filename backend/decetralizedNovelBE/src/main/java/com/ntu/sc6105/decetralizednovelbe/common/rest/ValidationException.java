package com.ntu.sc6105.decetralizednovelbe.common.rest;

import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

import java.io.Serializable;

public class ValidationException extends Exception implements Serializable {

    private static final long serialVersionUID = 1L;

    private String status;
    private final String errorCode;
    private String errorMessage;

    public ValidationException(StatusCode statusCode) {
        this(statusCode.getStatus(), statusCode.getCode(), statusCode.getMessage());
    }

    public ValidationException(String status, String errorCode, String errorMessage) {
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public ValidationException(String status, String errorCode, String errorMessage, Exception e) {
        super(e);
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
