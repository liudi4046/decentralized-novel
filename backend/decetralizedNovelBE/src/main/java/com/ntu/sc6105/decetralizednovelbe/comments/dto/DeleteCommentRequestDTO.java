package com.ntu.sc6105.decetralizednovelbe.comments.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseRequestIdDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeleteCommentRequestDTO extends BaseRequestIdDTO {

    private String chapterHash;
    private String commentId;
    private String loginToken;

    public String getChapterHash() {
        return chapterHash;
    }

    public void setChapterHash(String chapterHash) {
        this.chapterHash = chapterHash;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getLoginToken() {
        return loginToken;
    }

    public void setLoginToken(String loginToken) {
        this.loginToken = loginToken;
    }
}
