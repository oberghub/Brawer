package com.sopproject.equipmentservice.query.rest;

import lombok.Data;

import java.util.List;

@Data
public class FindEquimentsByIdsQuery {
    private List<String> idList;
}
