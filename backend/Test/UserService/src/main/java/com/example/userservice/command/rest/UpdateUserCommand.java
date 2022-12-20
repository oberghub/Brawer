package com.example.userservice.command.rest;

import lombok.Builder;
import lombok.Data;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Builder
@Data
public class UpdateUserCommand {
    @TargetAggregateIdentifier
    private final String _id;
    private final String name;
    private final String email;
    private final String role;
    private final List<String> favouriteBooks;
}
