package com.ntu.sc6105.decetralizednovelbe.user.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtTokenService {


    private final String secretKey = "GPCSXCDP6NPZjcLZa75nrzz6NQHmKCJSTPeHEdITGmc=";

    public String generateToken(String walletAddress) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("walletAddress", walletAddress);

        long expirationTimeMillis = 3600000 * 24 * 7;
        long currentTimeMillis = System.currentTimeMillis();

        System.out.println("secret key:" + secretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(walletAddress)
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + expirationTimeMillis))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }


    public static String generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            keyGen.init(256); // for example, 256 bits
            SecretKey secretKey = keyGen.generateKey();
            return Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while generating secret key", e);
        }
    }


    public String getWalletAddressFromToken(String token) {
        SecretKey key = io.jsonwebtoken.security.Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("walletAddress", String.class); // Assuming 'walletAddress' is the key for the custom claim
    }

}
