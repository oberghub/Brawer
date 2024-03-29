package com.sopproject.borrowservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class BorrowCreatedEvent {
    private String _id;
    private String status;
    private String borrow_date;
    private String due_date;
    private boolean late;
    private String userId;
    private List<String> booksId;
}
