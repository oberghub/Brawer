package com.sopproject.bookservice.query.rest;

import lombok.Data;

import java.util.List;

@Data
public class FindBooksByIdsQuery {
    private List<String> idList;
}
