package com.ntu.sc6105.decetralizednovelbe.comments.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class AddCommentException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.ADD_COMMENT_ERROR;

    public AddCommentException() {
        super(STATUS_CODE);
    }

}
