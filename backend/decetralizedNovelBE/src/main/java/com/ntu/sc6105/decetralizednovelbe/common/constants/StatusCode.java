package com.ntu.sc6105.decetralizednovelbe.common.constants;

import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

import java.text.MessageFormat;

public enum StatusCode {

    SUCCESS("Success", "0000", "Operation Successful"),
    SYSTEM_ERROR("Error", "ERROR-001", "System Error"),
    USER_VERIFICATION_FAIL("Error", "ERROR-002", "User Login Verification Failed"),
    CHAPTER_ALREADY_EXIST("Error", "ERROR-003", "Chapter already exists"),
    ADD_CHAPTER_FAIL("Error", "ERROR-004", "Add chapter failed"),
    FIND_CHAPTER_ERROR("Error", "ERROR-005", "No Chapter Found"),
    FIND_COMMENT_ERROR("Error", "ERROR-006", "No Comment Found"),
    ADD_COMMENT_ERROR("Error", "ERROR-007", "Add comment failed"),
    DELETE_COMMENT_ERROR("Error", "ERROR-008", "Delete comment failed"),
    COMMENT_ALREADY_EXIST_ERROR("Error", "ERROR-009", "Comment Already Exist"),
    LOGIN_TOKEN_EXPIRED_ERROR("Error", "ERROR-010", "Login Token Expired"),
    ERROR_MANDATORY("Error", "ERROR-011", "{0} is mandatory");

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
