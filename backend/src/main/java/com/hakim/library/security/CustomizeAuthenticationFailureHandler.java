package com.hakim.library.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hakim.library.domain.DTO.JsonResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomizeAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonResponse object = JsonResponse.builder()
                .errorMsg("Username or password incorrect")
                .status(JsonResponse.STATUS.FAILED)
                .build();
        response.setStatus(400);
        response.addHeader("Content-Type", "application/json");
        response.getWriter().write(objectMapper.writeValueAsString(object));
    }
}
