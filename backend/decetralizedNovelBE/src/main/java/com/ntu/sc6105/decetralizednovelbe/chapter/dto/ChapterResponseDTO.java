package com.ntu.sc6105.decetralizednovelbe.chapter.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChapterResponseDTO extends BaseResponseDTO {

    private List<String> chapterContentArray;

    public List<String> getChapterContentArray() {
        return chapterContentArray;
    }

    public void setChapterContentArray(List<String> chapterContentArray) {
        this.chapterContentArray = chapterContentArray;
    }
}
