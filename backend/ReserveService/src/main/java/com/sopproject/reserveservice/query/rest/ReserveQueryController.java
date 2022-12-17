package com.sopproject.reserveservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reserve")
public class ReserveQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<ReserveRestModel> findReserveQuery() {
        FindReserveQuery findReserveQuery = new FindReserveQuery();
        List<ReserveRestModel> reserves = queryGateway
                .query(findReserveQuery, ResponseTypes.multipleInstancesOf(ReserveRestModel.class)).join();

        return reserves;
    }
}
