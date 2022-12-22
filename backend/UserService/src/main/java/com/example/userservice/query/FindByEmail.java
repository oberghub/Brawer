package com.example.userservice.query;

import lombok.Data;

@Data
public class FindByEmail {

    private String email;

    public FindByEmail(String email) {
        this.email = email;
    }
}