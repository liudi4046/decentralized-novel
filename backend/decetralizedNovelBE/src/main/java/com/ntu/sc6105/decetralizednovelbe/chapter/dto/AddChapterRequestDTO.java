package com.ntu.sc6105.decetralizednovelbe.chapter.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseRequestIdDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddChapterRequestDTO extends BaseRequestIdDTO {

    private String loginToken;
    private String chapterHash;
    private String content;
    private String walletAddress;

    public String getLoginToken() {
        return loginToken;
    }

    public void setLoginToken(String loginToken) {
        this.loginToken = loginToken;
    }

    public String getChapterHash() {
        return chapterHash;
    }

    public void setChapterHash(String chapterHash) {
        this.chapterHash = chapterHash;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }
}
