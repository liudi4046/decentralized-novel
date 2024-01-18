package com.ntu.sc6105.decetralizednovelbe.common.constants;

import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

import java.text.MessageFormat;

public enum StatusCode  {

    SUCCESS("Success", "0000", "Operation Successful"),
    SYSTEM_ERROR("Error", "ERROR-001", "System Error"),
    USER_VERIFICATION_FAIL("Error", "ERROR-002", "User Login Verification Failed"),

    USER_ALREADY_REGISTERED("Error", "ERROR-001", "User account already registered"),
    ERROR_MANDATORY("Error", "ERROR-002", "{0} is mandatory"),
    BAD_REQUEST("Error", "400", "Bad request"),
    UNAUTHORIZED("Error", "401", "Unauthorized access");

    final String status;
    final String code;
    final String message;

    StatusCode(String status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage(Object... params) {
        return MessageFormat.format(message, params);
    }

    public BaseResponseDTO toBaseResponseDTO() {
        return new BaseResponseDTO(this.status, this.code, this.message);
    }
}
