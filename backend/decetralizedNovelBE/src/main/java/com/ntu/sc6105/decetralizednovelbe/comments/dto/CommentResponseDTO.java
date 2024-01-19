package com.ntu.sc6105.decetralizednovelbe.comments.dto;

import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;

public class CommentResponseDTO extends BaseResponseDTO {

    private CommentDTO commentDTO;

    public CommentDTO getCommentDTO() {
        return commentDTO;
    }

    public void setCommentDTO(CommentDTO commentDTO) {
        this.commentDTO = commentDTO;
    }
}
