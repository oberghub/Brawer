package com.sopproject.borrowservice.core.event;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class BorrowUpdatedEvent {
    private String _id;
    private String status;
    private String borrow_date;
    private String due_date;
    private boolean late;
    private String userId;
    private ArrayList<String> booksId;
}
