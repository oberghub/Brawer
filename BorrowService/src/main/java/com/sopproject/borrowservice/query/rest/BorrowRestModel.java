package com.sopproject.borrowservice.query.rest;

import lombok.Data;

import java.util.ArrayList;

@Data
public class BorrowRestModel {
    private String _id;
    private String status;
    private String borrow_date;
    private String due_date;
    private boolean late;
    private String userId;
    private ArrayList<String> booksId;
}
