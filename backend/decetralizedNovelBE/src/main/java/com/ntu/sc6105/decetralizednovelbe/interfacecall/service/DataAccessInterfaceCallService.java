package com.ntu.sc6105.decetralizednovelbe.interfacecall.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.AddChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.chapter.dto.ChapterResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.CommentResponseDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.DeleteCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.comments.dto.GetCommentRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.common.dto.BaseResponseDTO;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;


@Service
public class DataAccessInterfaceCallService {

    HttpClient httpClient = HttpClients.createDefault();

    String baseURL = "http://149.129.176.52:2333/";


    public CommentResponseDTO postToGetComments(GetCommentRequestDTO requestDTO, String getCommentUrl) {

        ObjectMapper mapper = new ObjectMapper();
        CommentResponseDTO responseDTO = new CommentResponseDTO();

        try {
            // Set the request body
            String requestBody = mapper.writeValueAsString(requestDTO);

            String responseBody = post(requestBody, getCommentUrl);

            responseDTO = mapper.readValue(responseBody, CommentResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseDTO;

    }

    public BaseResponseDTO postToDeleteComments(DeleteCommentRequestDTO requestDTO, String deleteCommentUrl) {

        ObjectMapper mapper = new ObjectMapper();
        BaseResponseDTO responseDTO = new BaseResponseDTO();

        try {
            // Set the request body
            String requestBody = mapper.writeValueAsString(requestDTO);

            String responseBody = post(requestBody, deleteCommentUrl);

            responseDTO = mapper.readValue(responseBody, BaseResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseDTO;

    }


    public ChapterResponseDTO postToFindChapter(ChapterRequestDTO requestDTO, String findChapterUrl) {

        ObjectMapper mapper = new ObjectMapper();
        ChapterResponseDTO responseDTO = new ChapterResponseDTO();

        try {
            // Set the request body
            String requestBody = mapper.writeValueAsString(requestDTO);

            String responseBody = post(requestBody, findChapterUrl);

            responseDTO = mapper.readValue(responseBody, ChapterResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseDTO;

    }


    public BaseResponseDTO postToAddComment(CommentRequestDTO requestDTO, String addCommentUrl) {

        ObjectMapper mapper = new ObjectMapper();
        BaseResponseDTO responseDTO = new BaseResponseDTO();

        try {
            // Set the request body
            String requestBody = mapper.writeValueAsString(requestDTO);

            String responseBody = post(requestBody, addCommentUrl);

            responseDTO = mapper.readValue(responseBody, BaseResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseDTO;

    }

    public BaseResponseDTO postToAddChapter(AddChapterRequestDTO requestDTO, String addChapterUrl) {

        ObjectMapper mapper = new ObjectMapper();
        BaseResponseDTO responseDTO = new BaseResponseDTO();

        try {
            // Set the request body
            String requestBody = mapper.writeValueAsString(requestDTO);

            String responseBody = post(requestBody, addChapterUrl);

            responseDTO = mapper.readValue(responseBody, BaseResponseDTO.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseDTO;

    }


    private String post(String requestBody, String url) throws Exception {
        String apiUrl = baseURL + url; // Replace with your API endpoint URL


        HttpPost httpPost = new HttpPost(apiUrl);
        httpPost.setHeader("Content-Type", "application/json; charset=UTF-8");

        StringEntity entity = new StringEntity(requestBody, "UTF-8");
        System.out.println("request body is: " + requestBody);
        httpPost.setEntity(entity);

        HttpResponse response = httpClient.execute(httpPost);

        int statusCode = response.getStatusLine().getStatusCode();
        String responseBody = EntityUtils.toString(response.getEntity());

        System.out.println("HTTP Status Code: " + statusCode);
        System.out.println("Response Body: " + responseBody);

        return responseBody;
    }


}
