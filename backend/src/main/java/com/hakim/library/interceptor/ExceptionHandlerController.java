package com.hakim.library.interceptor;

import com.hakim.library.domain.DTO.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
@Slf4j
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public JsonResponse handleException(Exception e) {
        JsonResponse jsonResponse = new JsonResponse();
        jsonResponse.setStatus(JsonResponse.STATUS.FAILED);
        jsonResponse.setErrorCode("BAD_REQUEST");
        jsonResponse.setErrorMsg(e.getMessage());
        log.error(e.getMessage());
        return jsonResponse;
    }


    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        var error = new JsonResponse(
                "HttpMessageNotReadable",
                "The request isn't readable");
        return handleExceptionInternal(ex, error, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
                                                        HttpStatus status, WebRequest request) {
        var error = new JsonResponse(
                ex.getErrorCode(),
                String.format("%s doesn't match to input type %s", ex.getPropertyName(), ex.getRequiredType()));
        return handleExceptionInternal(ex, error, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          HttpHeaders headers, HttpStatus status, WebRequest request) {

        var error = new JsonResponse("MissingRequestParameter", String.format("%s is missing", ex.getParameterName()));
        return handleExceptionInternal(ex, error, headers, status, request);
    }


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status,
                                                                  WebRequest request) {
        JsonResponse error = null;
        var objectError = ex.getBindingResult().getAllErrors().get(0);
        if (objectError instanceof FieldError) {
            var fieldError = (FieldError) objectError;
            error = new JsonResponse(fieldError.getCode(),
                    fieldError.getDefaultMessage());
        } else {
            error = new JsonResponse(objectError.getCode(), objectError.getDefaultMessage());
        }

        return handleExceptionInternal(ex, error, headers, status, request);
    }

}
