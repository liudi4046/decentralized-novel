package com.ntu.sc6105.decetralizednovelbe.common.rest;

import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public abstract class AbstractRestValidator {

    protected static void throwValidationException(String field) throws ValidationException {
        throw new ValidationException(
                StatusCode.ERROR_MANDATORY.getStatus(),
                StatusCode.ERROR_MANDATORY.getCode(),
                StatusCode.ERROR_MANDATORY.getMessage(field));
    }


}
