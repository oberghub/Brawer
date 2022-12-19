package com.sopproject.workspaceservice.core.event;

import com.sopproject.workspaceservice.command.rest.TimeRentModel;
import lombok.Data;

import java.util.List;

@Data
public class SetWorkspaceStatusEvent {
    private String _id;
    private String status;
}
