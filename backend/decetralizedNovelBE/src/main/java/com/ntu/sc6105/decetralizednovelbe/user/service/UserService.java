package com.ntu.sc6105.decetralizednovelbe.user.service;

import com.ntu.sc6105.decetralizednovelbe.user.dto.UserRequestDTO;
import com.ntu.sc6105.decetralizednovelbe.user.dto.UserResponse;
import com.ntu.sc6105.decetralizednovelbe.user.exception.UserVerificationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.ECDSASignature;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import javax.crypto.SecretKey;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Base64;

@Service
public class UserService {

    public static final String PERSONAL_MESSAGE_PREFIX = "\u0019Ethereum Signed Message:\n";

    @Autowired
    private JwtTokenService jwtTokenService;

    public void verifyAndGetToken(UserRequestDTO requestDTO, UserResponse response) throws UserVerificationException{
        boolean isVerified = testRecoverAddressFromSignature(requestDTO);
        String token = "";

        if(isVerified){
            token = jwtTokenService.generateToken(requestDTO.getWalletAddress());
        } else{
            throw new UserVerificationException();
        }

        response.setLoginToken(token);

    }


    public boolean testRecoverAddressFromSignature(UserRequestDTO requestDTO) {

        String signature = requestDTO.getSignature();
        String address = requestDTO.getWalletAddress();
        String message = requestDTO.getMessage();

        String prefix = PERSONAL_MESSAGE_PREFIX + message.length();
        byte[] msgHash = Hash.sha3((prefix + message).getBytes());

        byte[] signatureBytes = Numeric.hexStringToByteArray(signature);
        byte v = signatureBytes[64];
        if (v < 27) {
            v += 27;
        }

        Sign.SignatureData sd = new Sign.SignatureData(
                v,
                (byte[]) Arrays.copyOfRange(signatureBytes, 0, 32),
                (byte[]) Arrays.copyOfRange(signatureBytes, 32, 64));

        String addressRecovered = null;
        boolean match = false;

        // Iterate for each possible key to recover
        for (int i = 0; i < 4; i++) {
            BigInteger publicKey = Sign.recoverFromSignature(
                    (byte) i,
                    new ECDSASignature(new BigInteger(1, sd.getR()), new BigInteger(1, sd.getS())),
                    msgHash);

            if (publicKey != null) {
                addressRecovered = "0x" + Keys.getAddress(publicKey);

                if (addressRecovered.equals(address)) {
                    match = true;
                    break;
                }
            }
        }

        return match;

    }


}
