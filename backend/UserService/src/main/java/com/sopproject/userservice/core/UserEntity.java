package com.sopproject.userservice.core;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document("users")
@Data
public class UserEntity implements Serializable{

    @Id
    private String _id;
    private String name;
    private String email;
    private String role;
    private List<String> favouriteBooks;
}
