package com.ntu.sc6105.decetralizednovelbe.user.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntu.sc6105.decetralizednovelbe.common.constants.StatusCode;
import com.ntu.sc6105.decetralizednovelbe.common.rest.BaseValidator;
import com.ntu.sc6105.decetralizednovelbe.common.rest.ValidationException;
import com.ntu.sc6105.decetralizednovelbe.user.dto.UserRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.user.dto.UserResponse;
import com.ntu.sc6105.decetralizednovelbe.user.exception.UserVerificationException;
import com.ntu.sc6105.decetralizednovelbe.user.service.BaseResponseConverter;
import com.ntu.sc6105.decetralizednovelbe.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserResponse registerUser(@RequestBody UserRequestDTO requestDTO) {
        UserResponse userResponse = new UserResponse();
        ObjectMapper mapper = new ObjectMapper();

        try {
            System.out.println(mapper.writeValueAsString(requestDTO));
            BaseValidator.isValidUserRequestDTO(requestDTO);

            userService.verifyAndGetToken(requestDTO, userResponse);

            BaseResponseConverter.convertResponse(userResponse, StatusCode.SUCCESS);

        } catch (ValidationException ve) {
            userResponse.setStatus(ve.getStatus());
            userResponse.setMessage(ve.getErrorMessage());
            userResponse.setCode(ve.getErrorCode());
        } catch (UserVerificationException uve) {
            uve.printStackTrace();
            BaseResponseConverter.convertResponse(userResponse, StatusCode.USER_VERIFICATION_FAIL);
        } catch (Exception e) {
            e.printStackTrace();
            BaseResponseConverter.convertResponse(userResponse, StatusCode.SYSTEM_ERROR);
        }

        return userResponse;
    }
}