package com.sopproject.borrowservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Data
@Builder
public class CreateBorrowCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String status;
    private final String borrow_date;
    private final String due_date;
    private final boolean late;
    private final String userId;
    private final List<String> booksId;

}
