package com.ntu.sc6105.decetralizednovelbe.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseResponseDTO {
    private String status;
    private String code;
    private String message;

    public BaseResponseDTO() {
    }

    public BaseResponseDTO(String status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    // Getters and setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
