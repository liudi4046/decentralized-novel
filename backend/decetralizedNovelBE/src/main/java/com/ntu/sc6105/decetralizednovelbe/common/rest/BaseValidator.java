package com.ntu.sc6105.decetralizednovelbe.common.rest;

import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.DeleteCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.GetCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.user.dto.UserRequestDTO;
import org.springframework.util.ObjectUtils;

public class BaseValidator extends AbstractRestValidator {

    public static void isValidUserRequestDTO(UserRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }
        if (ObjectUtils.isEmpty(requestDTO.getWalletAddress())) {
            throwValidationException("walletAddress");
        }
        if (ObjectUtils.isEmpty(requestDTO.getSignature())) {
            throwValidationException("signature");
        }
        if (ObjectUtils.isEmpty(requestDTO.getMessage())) {
            throwValidationException("message");
        }
    }

    public static void isValidAddChapterRequestDTO(AddChapterRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }
        if (ObjectUtils.isEmpty(requestDTO.getLoginToken())) {
            throwValidationException("loginToken");
        }
        if (ObjectUtils.isEmpty(requestDTO.getChapterHash())) {
            throwValidationException("chapterHash");
        }
        if (ObjectUtils.isEmpty(requestDTO.getContent())) {
            throwValidationException("content");
        }
    }


    public static void isValidGetChapterRequestDTO(ChapterRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }
        if (ObjectUtils.isEmpty(requestDTO.getChapterHashArray())) {
            throwValidationException("chapterHashArray");
        }

    }

    public static void isValidGetCommentRequestDTO(GetCommentRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }
        if (ObjectUtils.isEmpty(requestDTO.getChapterHash())) {
            throwValidationException("chapterHash");
        }


    }

    public static void isValidAddCommentRequestDTO(CommentRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }
        if (ObjectUtils.isEmpty(requestDTO.getLoginToken())) {
            throwValidationException("loginToken");
        }
        if (ObjectUtils.isEmpty(requestDTO.getChapterHash())) {
            throwValidationException("chapterHash");
        }
        if (ObjectUtils.isEmpty(requestDTO.getComment())) {
            throwValidationException("comment");
        }

    }


    public static void isValidDeleteCommentRequestDTO(DeleteCommentRequestDTO requestDTO) throws ValidationException {
        if (ObjectUtils.isEmpty(requestDTO)) {
            throwValidationException("request");
        }

        if (ObjectUtils.isEmpty(requestDTO.getLoginToken())) {
            throwValidationException("loginToken");
        }
        if (ObjectUtils.isEmpty(requestDTO.getChapterHash())) {
            throwValidationException("chapterHash");
        }

        if (ObjectUtils.isEmpty(requestDTO.getCommentId())) {
            throwValidationException("commentId");
        }

    }
}
