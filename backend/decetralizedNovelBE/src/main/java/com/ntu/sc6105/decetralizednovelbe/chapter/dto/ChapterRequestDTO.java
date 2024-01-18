package com.ntu.sc6105.decetralizednovelbe.chapter.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseRequestIdDTO;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChapterRequestDTO extends BaseRequestIdDTO {

    private String[] chapterHashArray;

    public String[] getChapterHashArray() {
        return chapterHashArray;
    }

    public void setChapterHashArray(String[] chapterHashArray) {
        this.chapterHashArray = chapterHashArray;
    }
}
