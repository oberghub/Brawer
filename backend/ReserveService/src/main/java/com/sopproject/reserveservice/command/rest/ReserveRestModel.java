package com.sopproject.reserveservice.command.rest;

import lombok.Data;

import java.util.List;

@Data
public class ReserveRestModel {
    private String _id;
    private String userId;
    private String roomId;
    private List<String> equipmentsId;
    private String timestamp;
    private String reserveForm;
    private String reserveTo;
    private String status;
}
