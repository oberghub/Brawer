package com.sopproject.bookservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data

public class DeleteBookCommand {
    @TargetAggregateIdentifier
    private final String _id;
}
