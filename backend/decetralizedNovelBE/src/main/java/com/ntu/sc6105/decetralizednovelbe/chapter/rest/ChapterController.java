package com.ntu.sc6105.decetralizednovelbe.chapter.rest;

import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.service.ChapterService;
import com.ntu.sc6105.decetralizednovelbe.user.service.BaseResponseConverter;
import com.ntu.sc6105.decetralizednovelbe.user.service.JwtTokenService;
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
    public BaseResponseDTO addChapter(@RequestBody AddChapterRequestDTO requestDTO){

        String walletAddressFromToken = "";
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();

        walletAddressFromToken = jwtTokenService.getWalletAddressFromToken(requestDTO.getLoginToken());
        if(!StringUtils.isEmpty(walletAddressFromToken)){

        }

        baseResponseDTO = StatusCode.SUCCESS.toBaseResponseDTO();


        return baseResponseDTO;
    }


    @PostMapping("/getChapter")
    public ChapterResponseDTO getChapter(@RequestBody ChapterRequestDTO requestDTO){

        ChapterResponseDTO chapterResponseDTO = new ChapterResponseDTO();

        BaseResponseConverter.convertResponse(chapterResponseDTO, StatusCode.SUCCESS);


        return chapterResponseDTO;
    }

}
