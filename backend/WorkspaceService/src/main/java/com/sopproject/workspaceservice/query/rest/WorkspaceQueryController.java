package com.sopproject.workspaceservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<WorkspaceRestModel> findWorkspacesQuery(){
        WorkspaceQuery findWorkspacesQuery = new WorkspaceQuery();
        List<WorkspaceRestModel> Workspaces = queryGateway
                .query(findWorkspacesQuery, ResponseTypes.multipleInstancesOf(WorkspaceRestModel.class)).join();

        return Workspaces;
    }
}
