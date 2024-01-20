package com.ntu.sc6105.decetralizednovelbe.chapter.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class ChapterAlreadyExistException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.CHAPTER_ALREADY_EXIST;

    public ChapterAlreadyExistException() {
        super(STATUS_CODE);
    }

}
