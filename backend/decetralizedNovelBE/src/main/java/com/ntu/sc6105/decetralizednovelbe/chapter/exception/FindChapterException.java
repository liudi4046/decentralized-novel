package com.ntu.sc6105.decetralizednovelbe.chapter.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class FindChapterException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.FIND_CHAPTER_ERROR;

    public FindChapterException() {
        super(STATUS_CODE);
    }

}
