package com.sopproject.bookservice.command.rest;

import lombok.Data;

import java.util.List;

@Data
public class CreateBookRestModel {
    private String _id;
    private String title;
    private String desc;
    private int quantity;
    private List<String> authors;
    private String image;
    private String language;
    private List<String> genres;
}
