package com.sopproject.bookservice.core.event;

import lombok.Data;

import java.util.List;

@Data
public class BookDeletedEvent {
    private String _id;
}
