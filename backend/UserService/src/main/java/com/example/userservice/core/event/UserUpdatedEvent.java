package com.example.userservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class UserUpdatedEvent {
    private String _id;
    private String name;
    private String email;
    private String role;
    private List<String> favouriteBooks;
}
