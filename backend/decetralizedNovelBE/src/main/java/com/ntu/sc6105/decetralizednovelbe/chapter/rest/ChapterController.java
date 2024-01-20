package com.ntu.sc6105.decetralizednovelbe.chapter.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.AddChapterException;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.ChapterAlreadyExistException;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.FindChapterException;
import com.ntu.sc6105.decetralizednovelbe.chapter.service.ChapterService;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
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
@RequestMapping("/chapter")
public class ChapterController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private ChapterService chapterService;


    @PostMapping("/addChapter")
    public BaseResponseDTO addChapter(@RequestBody AddChapterRequestDTO requestDTO) {

        String walletAddressFromToken = "";
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(requestDTO));
            BaseValidator.isValidAddChapterRequestDTO(requestDTO);

            walletAddressFromToken = jwtTokenService.getWalletAddressFromToken(requestDTO.getLoginToken());
            if (!StringUtils.isEmpty(walletAddressFromToken)) {
                chapterService.processAddChapter(walletAddressFromToken, requestDTO);
            } else {
                throw new UserVerificationException();
            }

            baseResponseDTO = StatusCode.SUCCESS.toBaseResponseDTO();

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
        } catch (ChapterAlreadyExistException caex) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.CHAPTER_ALREADY_EXIST);
        } catch (AddChapterException ace) {
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.ADD_CHAPTER_FAIL);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(baseResponseDTO, StatusCode.SYSTEM_ERROR);
        }

        return baseResponseDTO;
    }


    @PostMapping("/getChapter")
    public ChapterResponseDTO getChapter(@RequestBody ChapterRequestDTO requestDTO) {

        ChapterResponseDTO chapterResponseDTO = new ChapterResponseDTO();

        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(requestDTO));
            BaseValidator.isValidGetChapterRequestDTO(requestDTO);

            chapterService.processGetChapter(requestDTO, chapterResponseDTO);

            BaseResponseConverter.convertResponse(chapterResponseDTO, StatusCode.SUCCESS);


        } catch (ValidationException ve) {
            chapterResponseDTO.setStatus(ve.getStatus());
            chapterResponseDTO.setMessage(ve.getErrorMessage());
            chapterResponseDTO.setCode(ve.getErrorCode());
        } catch (FindChapterException e) {
            BaseResponseConverter.convertResponse(chapterResponseDTO, StatusCode.FIND_CHAPTER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(chapterResponseDTO, StatusCode.SYSTEM_ERROR);
        }


        return chapterResponseDTO;
    }

}
