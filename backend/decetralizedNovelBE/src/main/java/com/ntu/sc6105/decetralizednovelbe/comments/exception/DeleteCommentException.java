package com.ntu.sc6105.decetralizednovelbe.comments.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class DeleteCommentException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.DELETE_COMMENT_ERROR;

    public DeleteCommentException() {
        super(STATUS_CODE);
    }

}
