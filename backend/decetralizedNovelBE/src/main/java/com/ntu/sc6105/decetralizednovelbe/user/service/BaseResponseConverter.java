package com.ntu.sc6105.decetralizednovelbe.user.service;

import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import org.springframework.util.ObjectUtils;

public class BaseResponseConverter {


    public static void convertResponse(BaseResponseDTO baseResponseDTO, StatusCode statusCode) {
        if (!ObjectUtils.isEmpty(baseResponseDTO)) {
            baseResponseDTO.setCode(statusCode.getCode());
            baseResponseDTO.setMessage(statusCode.getMessage());
            baseResponseDTO.setStatus(statusCode.getStatus());
        } else {
            baseResponseDTO.setCode(StatusCode.SYSTEM_ERROR.getCode());
            baseResponseDTO.setMessage(StatusCode.SYSTEM_ERROR.getMessage());
            baseResponseDTO.setStatus(StatusCode.SYSTEM_ERROR.getStatus());
        }
    }
}
