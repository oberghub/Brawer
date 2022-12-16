package com.sopproject.borrowservice.BorrowService.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.ArrayList;

@Data
@Builder
public class CreateBorrowCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String status;
    private final String borrow_date;
    private final String due_date;
    private final boolean late;
    private final String user; //user Data เก็บเป็น obj ของ user
    private final ArrayList<String> books; //เป็น array เก็บ obj ของ books

}
