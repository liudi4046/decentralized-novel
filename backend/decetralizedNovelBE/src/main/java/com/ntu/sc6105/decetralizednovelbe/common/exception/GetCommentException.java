package com.ntu.sc6105.decetralizednovelbe.common.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class GetCommentException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.FIND_COMMENT_ERROR;

    public GetCommentException() {
        super(STATUS_CODE);
    }

}
