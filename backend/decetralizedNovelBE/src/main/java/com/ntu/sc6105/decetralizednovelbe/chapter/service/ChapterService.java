package com.ntu.sc6105.decetralizednovelbe.chapter.service;

import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.AddChapterException;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.ChapterAlreadyExistException;
import com.ntu.sc6105.decetralizednovelbe.chapter.exception.FindChapterException;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.interfacecall.service.DataAccessInterfaceCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChapterService {

    @Autowired
    private DataAccessInterfaceCallService dataAccessInterfaceCallService;

    public void processAddChapter(String walletAddressFromToken, AddChapterRequestDTO requestDTO) throws ChapterAlreadyExistException {

        //check whether chapter exists first
        ChapterRequestDTO chapterRequestDTO = new ChapterRequestDTO();
        String[] chapterArray = new String[1];
        chapterArray[0] = requestDTO.getChapterHash();
        chapterRequestDTO.setChapterHashArray(chapterArray);
        ChapterResponseDTO chapterResponseDTO = dataAccessInterfaceCallService.postToFindChapter(chapterRequestDTO, "chapter/findByHash");

        if (!(chapterResponseDTO.getChapterContentArray().size() == 1 && "".equals(chapterResponseDTO.getChapterContentArray().get(0)))) {
            throw new ChapterAlreadyExistException();
        }

        //chapter not exists, proceed
        AddChapterRequestDTO addChapterRequestDTO = new AddChapterRequestDTO();
        addChapterRequestDTO.setChapterHash(requestDTO.getChapterHash());
        addChapterRequestDTO.setContent(requestDTO.getContent());
        addChapterRequestDTO.setWalletAddress(walletAddressFromToken);

        BaseResponseDTO responseDTO = dataAccessInterfaceCallService.postToAddChapter(requestDTO, "chapter/add");

        if (!"Success".equalsIgnoreCase(responseDTO.getStatus())) {
            throw new AddChapterException();
        }

    }

    public void processGetChapter(ChapterRequestDTO requestDTO, ChapterResponseDTO chapterResponseDTO) throws FindChapterException {
        ChapterRequestDTO chapterRequestDTO = new ChapterRequestDTO();
        chapterRequestDTO.setChapterHashArray(requestDTO.getChapterHashArray());
        ChapterResponseDTO chapterResponse = dataAccessInterfaceCallService.postToFindChapter(chapterRequestDTO, "chapter/findByHash");
        chapterResponseDTO.setChapterContentArray(chapterResponse.getChapterContentArray());
        if (!"Success".equalsIgnoreCase(chapterResponse.getStatus())) {
            throw new FindChapterException();
        }

    }
}
