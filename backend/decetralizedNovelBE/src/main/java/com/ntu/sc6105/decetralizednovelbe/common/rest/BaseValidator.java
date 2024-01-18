package com.ntu.sc6105.decetralizednovelbe.common.rest;

import com.ntu.sc6105.decetralizednovelbe.user.dto.UserRequestDTO;
import org.springframework.util.ObjectUtils;

public class BaseValidator extends AbstractRestValidator{

    public static void isValidUserRequestDTO(UserRequestDTO requestDTO) throws ValidationException {
        if(ObjectUtils.isEmpty(requestDTO)){
            throwValidationException("request");
        }
        if(ObjectUtils.isEmpty(requestDTO.getWalletAddress())){
            throwValidationException("walletAddress");
        }
        if(ObjectUtils.isEmpty(requestDTO.getSignature())){
            throwValidationException("signature");
        }
        if(ObjectUtils.isEmpty(requestDTO.getMessage())){
            throwValidationException("message");
        }
    }
}
