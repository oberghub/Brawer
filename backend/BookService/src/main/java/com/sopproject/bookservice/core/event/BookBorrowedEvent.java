package com.sopproject.bookservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class BookBorrowedEvent {
    private String _id;
    private int quantity;
}
