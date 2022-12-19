package com.sopproject.userservice.core.event;

import lombok.Data;

import java.util.List;
@Data
public class UserCreatedEvent {
    private String _id;
    private String name;
    private String email;
    private String role;
    private List<String> favouriteBooks;
}
