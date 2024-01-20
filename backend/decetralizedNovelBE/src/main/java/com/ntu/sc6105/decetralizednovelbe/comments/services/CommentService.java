package com.ntu.sc6105.decetralizednovelbe.comments.services;


import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.FindChapterException;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.DeleteCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.GetCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.AddCommentException;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.CommentAlreadyExistException;
import com.ntu.sc6105.decetralizednovelbe.comments.exception.DeleteCommentException;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.common.exception.GetCommentException;
import com.ntu.sc6105.decetralizednovelbe.interfacecall.service.DataAccessInterfaceCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class CommentService {

    @Autowired
    private DataAccessInterfaceCallService dataAccessInterfaceCallService;


    public void addComment(String walletAddressFromToken, CommentRequestDTO commentRequestDTO) throws FindChapterException, AddCommentException {

        ChapterRequestDTO chapterRequestDTO = new ChapterRequestDTO();
        String[] chapterArray = new String[1];
        chapterArray[0] = commentRequestDTO.getChapterHash();
        chapterRequestDTO.setChapterHashArray(chapterArray);
        ChapterResponseDTO chapterResponseDTO = dataAccessInterfaceCallService.postToFindChapter(chapterRequestDTO, "chapter/findByHash");

        if (ObjectUtils.isEmpty(chapterResponseDTO.getChapterContentArray())) {
            throw new FindChapterException();
        }

        GetCommentRequestDTO requestDTO = new GetCommentRequestDTO();
        requestDTO.setChapterHash(commentRequestDTO.getChapterHash());
        CommentResponseDTO getComments = dataAccessInterfaceCallService.postToGetComments(requestDTO, "comment/findByChapterHash");
        if ("Success".equalsIgnoreCase(getComments.getStatus())) {
            for (int i = 0; i < getComments.getComments().length; i++) {
                if (getComments.getComments()[i].getWalletAddress().equalsIgnoreCase(walletAddressFromToken) && getComments.getComments()[i].getComment().equalsIgnoreCase(commentRequestDTO.getComment())) {
                    throw new CommentAlreadyExistException();
                }
            }
        }


        commentRequestDTO.setWalletAddress(walletAddressFromToken);
        BaseResponseDTO responseDTO = dataAccessInterfaceCallService.postToAddComment(commentRequestDTO, "comment/add");

        if (!"Success".equalsIgnoreCase(responseDTO.getStatus())) {
            throw new AddCommentException();
        }

    }

    public void getComments(GetCommentRequestDTO requestDTO, CommentResponseDTO commentResponseDTO) throws GetCommentException {

        CommentResponseDTO responseDTO = dataAccessInterfaceCallService.postToGetComments(requestDTO, "comment/findByChapterHash");

        if ("Success".equalsIgnoreCase(responseDTO.getStatus()) && !ObjectUtils.isEmpty(responseDTO.getComments())) {
            commentResponseDTO.setComments(responseDTO.getComments());
        } else {
            throw new GetCommentException();
        }
    }

    public void deleteComments(String walletAddressFromToken, DeleteCommentRequestDTO requestDTO) throws GetCommentException, DeleteCommentException {
        GetCommentRequestDTO getCommentRequestDTO = new GetCommentRequestDTO();
        getCommentRequestDTO.setChapterHash(requestDTO.getChapterHash());

        CommentResponseDTO responseDTO = dataAccessInterfaceCallService.postToGetComments(getCommentRequestDTO, "comment/findByChapterHash");

        if ("Success".equalsIgnoreCase(responseDTO.getStatus()) && !ObjectUtils.isEmpty(responseDTO.getComments())) {
            for (int i = 0; i < responseDTO.getComments().length; i++) {
                if (responseDTO.getComments()[i].getWalletAddress().equalsIgnoreCase(walletAddressFromToken) && responseDTO.getComments()[i].getCommentId().equalsIgnoreCase(requestDTO.getCommentId())) {
                    BaseResponseDTO deleteCommentsResponse = dataAccessInterfaceCallService.postToDeleteComments(requestDTO, "comment/delete");

                    if (!"Success".equalsIgnoreCase(deleteCommentsResponse.getStatus())) {
                        throw new DeleteCommentException();
                    }
                }
            }
        } else {
            throw new GetCommentException();
        }

    }
}
