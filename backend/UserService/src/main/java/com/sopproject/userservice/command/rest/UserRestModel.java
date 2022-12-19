package com.sopproject.userservice.command.rest;

import lombok.Data;

import java.util.List;

@Data
public class UserRestModel {
    private String _id;
    private String name;
    private String email;
    private String role;
    private List<String> favouriteBooks;
}
