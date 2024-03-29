package com.example.paymentservice.query;

import com.example.paymentservice.core.PaymentEntity;
import com.example.paymentservice.core.data.PaymentRepository;
import com.example.paymentservice.query.rest.*;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentQueryHandler {
    private final PaymentRepository paymentRepository;

    public PaymentQueryHandler(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @QueryHandler
    List<PaymentRestModel> findPayments(FindPaymentsQuery query){
        List<PaymentRestModel> models = new ArrayList<>();
        List<PaymentEntity> entities = paymentRepository.findAll();
        for(PaymentEntity entity: entities){
            PaymentRestModel model = new PaymentRestModel();
            BeanUtils.copyProperties(entity, model);
            models.add(model);
        }
        return models;
    }

    @QueryHandler
    List<PaymentRestModel> findUserPayments(FindUserPaymentsQuery query){
        List<PaymentRestModel> models = new ArrayList<>();
        List<PaymentEntity> entities = paymentRepository.findByUserId(query.getUserId());
        for(PaymentEntity entity: entities){
            PaymentRestModel model = new PaymentRestModel();
            BeanUtils.copyProperties(entity,model);
            models.add(model);
        }
        return models;
    }

    @QueryHandler
    PaymentRestModel findPaymentByReserveId(FindPaymentByReserveIdQuery query){
        PaymentRestModel model = new PaymentRestModel();
        PaymentEntity entity = paymentRepository.findByReserveId(query.getReserveId());
        if(entity != null){
            BeanUtils.copyProperties(entity,model);
            return model;
        }
        return null;
    }

    @QueryHandler
    PaymentRestModel findPaymentByBorrowId(FindPaymentByBorrowIdQuery query){
        PaymentRestModel model = new PaymentRestModel();
        PaymentEntity entity = paymentRepository.findByBorrowId(query.getBorrowId());
        if(entity != null){
            BeanUtils.copyProperties(entity,model);
            return model;
        }
        return null;
    }
}
