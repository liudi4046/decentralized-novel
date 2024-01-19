package com.ntu.sc6105.decetralizednovelbe.comments.rest;

import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.services.CommentService;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.user.service.BaseResponseConverter;
import com.ntu.sc6105.decetralizednovelbe.user.service.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ws/comment")
public class CommentsController {

    @Autowired
    private JwtTokenService jwtTokenService;


    @Autowired
    private CommentService commentService;

    @PostMapping("/addComments")
    public BaseResponseDTO createNewComments(@RequestBody CommentRequestDTO commentRequestDTO){
        System.out.println("loginToken: " + commentRequestDTO.getLoginToken());

        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        String walletAddressFromToken = "";

        try {
            walletAddressFromToken = jwtTokenService.getWalletAddressFromToken(commentRequestDTO.getLoginToken());
            if(!StringUtils.isEmpty(walletAddressFromToken)){

            }


            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SUCCESS);

        } catch (Exception e){

            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SYSTEM_ERROR);
        }




        return baseResponseDTO;
    }


    @PostMapping("/getComments")
    public CommentResponseDTO getComments(@RequestBody CommentRequestDTO commentRequestDTO){

        CommentResponseDTO commentResponseDTO = new CommentResponseDTO();
        try {



            BaseResponseConverter.convertResponse(commentResponseDTO, StatusCode.SUCCESS);

        } catch (Exception e){

            BaseResponseConverter.convertResponse(commentResponseDTO, StatusCode.SYSTEM_ERROR);
        }




        return commentResponseDTO;
    }

}
