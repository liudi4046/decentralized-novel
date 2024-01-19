package com.ntu.sc6105.decetralizednovelbe.comments.dto;

import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

public class CommentResponseDTO extends BaseResponseDTO {

    private CommentDTO[] comments;

    public CommentDTO[] getComments() {
        return comments;
    }

    public void setComments(CommentDTO[] comments) {
        this.comments = comments;
    }
}
