package com.sopproject.reserveservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/user/{userId}")
    public List<ReserveRestModel> findReserveByUserIdQuery(@PathVariable String userId) {
        FindReserveByUserIdQuery findReserveByUserIdQuery = new FindReserveByUserIdQuery();
        findReserveByUserIdQuery.setUserId(userId);
        List<ReserveRestModel> reserves = queryGateway
                .query(findReserveByUserIdQuery, ResponseTypes.multipleInstancesOf(ReserveRestModel.class)).join();

        return reserves;
    }

    @GetMapping("/{_id}")
    public ReserveRestModel findReserveByIdQuery(@PathVariable String _id) {
        FindReserveByIdQuery findReserveByIdQuery = new FindReserveByIdQuery();
        findReserveByIdQuery.set_id(_id);
        ReserveRestModel reserve = queryGateway
                .query(findReserveByIdQuery, ResponseTypes.instanceOf(ReserveRestModel.class)).join();

        return reserve;
    }


}
