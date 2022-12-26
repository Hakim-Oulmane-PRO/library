package com.hakim.library;

import com.hakim.library.config.Setup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@ConfigurationPropertiesScan
public class LibrairyApplication {

    @Autowired
    Setup setup;

    public static void main(String[] args) {
        SpringApplication.run(LibrairyApplication.class, args);
    }

    @PostConstruct
    public void setup() {
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+1:00"));
        setup.init();
    }

}
