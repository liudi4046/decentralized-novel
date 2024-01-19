package com.ntu.sc6105.decetralizednovelbe.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse extends BaseResponseDTO {

    private String loginToken;

    public UserResponse() {
    }

    public UserResponse(String status, String code, String message) {
        super(status, code, message);
    }

    public String getLoginToken() {
        return loginToken;
    }

    public void setLoginToken(String loginToken) {
        this.loginToken = loginToken;
    }
}
