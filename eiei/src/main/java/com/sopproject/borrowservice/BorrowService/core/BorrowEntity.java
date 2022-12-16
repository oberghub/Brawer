package com.sopproject.borrowservice.BorrowService.core;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document("borrow")
public class BorrowEntity {
    @Id
    private String _id;
    private String status;
    private String borrow_date;
    private String due_date;
    private boolean late;
    private String userId;
    private ArrayList<String> booksId;
}
