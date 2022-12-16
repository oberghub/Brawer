package com.sopproject.bookservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class BookUpdatedEvent {
    private String _id;
    private String title;
    private String desc;
    private int quantity;
    private List<String> authors;
    private String image;
    private String language;
    private List<String> genres;
}
