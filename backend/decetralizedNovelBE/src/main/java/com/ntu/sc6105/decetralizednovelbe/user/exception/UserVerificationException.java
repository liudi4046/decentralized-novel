package com.ntu.sc6105.decetralizednovelbe.user.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class UserVerificationException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.USER_VERIFICATION_FAIL;

    public UserVerificationException() {
        super(STATUS_CODE);
    }

}
