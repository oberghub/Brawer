package com.sopproject.borrowservice;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.net.Socket;

@Component
public class BorrowServiceHealthIndicator implements HealthIndicator {
    private static final String URL = "http://localhost:8082/borrow-service";
    @Override
    public Health health(){
        try {
            new Socket(new java.net.URL(URL).getHost(), 8082);
        }
        catch (Exception e){
            return Health.down()
                    .withDetail("error eiei", e.getMessage()).build();
        }
        return Health.up().build();
    }
}
