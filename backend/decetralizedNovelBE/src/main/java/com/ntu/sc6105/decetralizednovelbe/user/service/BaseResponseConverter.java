package com.ntu.sc6105.decetralizednovelbe.user.service;

import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import org.springframework.util.ObjectUtils;

public class BaseResponseConverter {


    public static void convertResponse (BaseResponseDTO baseResponseDTO, StatusCode statusCode){
        if(!ObjectUtils.isEmpty(baseResponseDTO)){
            baseResponseDTO.setCode(statusCode.getCode());
            baseResponseDTO.setMessage(statusCode.getMessage());
            baseResponseDTO.setStatus(statusCode.getStatus());
        }else{
            baseResponseDTO.setCode(statusCode.SYSTEM_ERROR.getCode());
            baseResponseDTO.setMessage(statusCode.SYSTEM_ERROR.getMessage());
            baseResponseDTO.setStatus(statusCode.SYSTEM_ERROR.getStatus());
        }
    }
}
