package com.ntu.sc6105.decetralizednovelbe.chapter.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChapterResponseDTO extends BaseResponseDTO {

    private String[] chapterContentArray;

    public String[] getChapterContentArray() {
        return chapterContentArray;
    }

    public void setChapterContentArray(String[] chapterContentArray) {
        this.chapterContentArray = chapterContentArray;
    }
}
