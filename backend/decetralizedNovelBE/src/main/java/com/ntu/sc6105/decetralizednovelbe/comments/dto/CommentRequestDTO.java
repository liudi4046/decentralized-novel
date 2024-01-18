package com.ntu.sc6105.decetralizednovelbe.comments.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentRequestDTO extends AddChapterRequestDTO {

    private String comment;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
