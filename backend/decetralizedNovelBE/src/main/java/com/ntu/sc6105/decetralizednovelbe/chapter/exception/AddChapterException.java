package com.ntu.sc6105.decetralizednovelbe.chapter.exception;

import com.ntu.sc6105.decetralizednovelbe.common.constants.BaseRestException;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;

public class AddChapterException extends BaseRestException {

    private static final StatusCode STATUS_CODE = StatusCode.ADD_CHAPTER_FAIL;

    public AddChapterException() {
        super(STATUS_CODE);
    }

}
