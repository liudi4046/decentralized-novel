package com.ntu.sc6105.decetralizednovelbe.comments.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.FindChapterException;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.DeleteCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.GetCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.AddCommentException;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.CommentAlreadyExistException;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.DeleteCommentException;
import com.ntu.sc6105.decetralizednovelbe.comments.services.CommentService;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.common.exception.GetCommentException;
import com.ntu.sc6105.decetralizednovelbe.common.rest.BaseValidator;
import com.ntu.sc6105.decetralizednovelbe.common.rest.ValidationException;
import com.ntu.sc6105.decetralizednovelbe.user.exception.UserVerificationException;
import com.ntu.sc6105.decetralizednovelbe.user.service.BaseResponseConverter;
import com.ntu.sc6105.decetralizednovelbe.user.service.JwtTokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentsController {

    @Autowired
    private JwtTokenService jwtTokenService;


    @Autowired
    private CommentService commentService;


    @PostMapping("/addComment")
    public BaseResponseDTO createNewComments(@RequestBody CommentRequestDTO commentRequestDTO) {
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        String walletAddressFromToken = "";

        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(commentRequestDTO));
            BaseValidator.isValidAddCommentRequestDTO(commentRequestDTO);

            walletAddressFromToken = jwtTokenService.getWalletAddressFromToken(commentRequestDTO.getLoginToken());
            if (!StringUtils.isEmpty(walletAddressFromToken)) {
                commentService.addComment(walletAddressFromToken, commentRequestDTO);
            } else {
                throw new UserVerificationException();
            }

            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SUCCESS);

        } catch (ValidationException ve) {
            baseResponseDTO.setStatus(ve.getStatus());
            baseResponseDTO.setMessage(ve.getErrorMessage());
            baseResponseDTO.setCode(ve.getErrorCode());
        } catch (UserVerificationException uve) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.USER_VERIFICATION_FAIL);
        } catch (SignatureException se) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.USER_VERIFICATION_FAIL);
        } catch (ExpiredJwtException jwtException) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.LOGIN_TOKEN_EXPIRED_ERROR);
        } catch (FindChapterException fce) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.FIND_CHAPTER_ERROR);
        } catch (CommentAlreadyExistException caex) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.COMMENT_ALREADY_EXIST_ERROR);
        } catch (AddCommentException ace) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.ADD_COMMENT_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SYSTEM_ERROR);
        }

        return baseResponseDTO;
    }


    @PostMapping("/getComment")
    public CommentResponseDTO getComments(@RequestBody GetCommentRequestDTO requestDTO) {

        CommentResponseDTO commentResponseDTO = new CommentResponseDTO();
        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(requestDTO));

            BaseValidator.isValidGetCommentRequestDTO(requestDTO);

            commentService.getComments(requestDTO, commentResponseDTO);

            BaseResponseConverter.convertResponse(commentResponseDTO, StatusCode.SUCCESS);

        } catch (ValidationException ve) {
            commentResponseDTO.setStatus(ve.getStatus());
            commentResponseDTO.setMessage(ve.getErrorMessage());
            commentResponseDTO.setCode(ve.getErrorCode());
        } catch (GetCommentException gce) {
            BaseResponseConverter.convertResponse(commentResponseDTO, StatusCode.FIND_COMMENT_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(commentResponseDTO, StatusCode.SYSTEM_ERROR);
        }

        return commentResponseDTO;
    }


    @PostMapping("/deleteComment")
    public BaseResponseDTO deleteComment(@RequestBody DeleteCommentRequestDTO requestDTO) {

        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        String walletAddressFromToken = "";
        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(requestDTO));
            BaseValidator.isValidDeleteCommentRequestDTO(requestDTO);

            walletAddressFromToken = jwtTokenService.getWalletAddressFromToken(requestDTO.getLoginToken());
            if (!StringUtils.isEmpty(walletAddressFromToken)) {
                commentService.deleteComments(walletAddressFromToken, requestDTO);
            } else {
                throw new UserVerificationException();
            }
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SUCCESS);

        } catch (ValidationException ve) {
            baseResponseDTO.setStatus(ve.getStatus());
            baseResponseDTO.setMessage(ve.getErrorMessage());
            baseResponseDTO.setCode(ve.getErrorCode());
        } catch (UserVerificationException uve) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.USER_VERIFICATION_FAIL);
        } catch (SignatureException se) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.USER_VERIFICATION_FAIL);
        } catch (ExpiredJwtException jwtException) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.LOGIN_TOKEN_EXPIRED_ERROR);
        } catch (GetCommentException gce) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.FIND_COMMENT_ERROR);
        } catch (DeleteCommentException dce) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.DELETE_COMMENT_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SYSTEM_ERROR);
        }

        return baseResponseDTO;
    }


}
