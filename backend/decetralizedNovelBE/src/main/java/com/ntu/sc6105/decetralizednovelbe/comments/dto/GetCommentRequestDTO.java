package com.ntu.sc6105.decetralizednovelbe.comments.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseRequestIdDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GetCommentRequestDTO extends BaseRequestIdDTO {

    private String chapterHash;

    public String getChapterHash() {
        return chapterHash;
    }

    public void setChapterHash(String chapterHash) {
        this.chapterHash = chapterHash;
    }
}
