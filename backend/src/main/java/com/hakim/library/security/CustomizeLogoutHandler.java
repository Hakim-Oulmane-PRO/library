package com.hakim.library.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hakim.library.domain.DTO.JsonResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomizeLogoutHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        JsonResponse object = JsonResponse.builder()
                .status(JsonResponse.STATUS.SUCCESS)
                .build();

        response.setStatus(200);
        response.addHeader("Content-Type", "application/json");
        response.getWriter().write(objectMapper.writeValueAsString(object));
    }
}
