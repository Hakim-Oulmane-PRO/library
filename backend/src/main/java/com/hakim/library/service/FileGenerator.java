package com.hakim.library.service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface FileGenerator {
    void generateFile(HttpServletResponse response) throws IOException;
}
