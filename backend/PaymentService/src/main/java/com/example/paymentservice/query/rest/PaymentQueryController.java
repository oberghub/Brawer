package com.example.paymentservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentQueryController {
    @Autowired
    private QueryGateway queryGateway;

    @GetMapping("all")
    public List<PaymentRestModel> findPaymentsQuery(){
        FindPaymentsQuery query = new FindPaymentsQuery();
        List<PaymentRestModel> models = queryGateway
                .query(query, ResponseTypes.multipleInstancesOf(PaymentRestModel.class)).join();
        return models;
    }

    @GetMapping("{userId}")
    public List<PaymentRestModel> findPaymentOfUserQuery(@PathVariable String userId){
        FindUserPaymentsQuery query = new FindUserPaymentsQuery();
        query.setUserId(userId);
        List<PaymentRestModel> models = queryGateway
                .query(query, ResponseTypes.multipleInstancesOf(PaymentRestModel.class)).join();
        return models;
    }
}
