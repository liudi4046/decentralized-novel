package com.ntu.sc6105.decetralizednovelbe.comments.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class CommentAlreadyExistException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.COMMENT_ALREADY_EXIST_ERROR;

    public CommentAlreadyExistException() {
        super(STATUS_CODE);
    }

}
