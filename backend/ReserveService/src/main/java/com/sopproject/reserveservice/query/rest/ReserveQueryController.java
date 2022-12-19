package com.sopproject.reserveservice.query.rest;

import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

//    cron every hour = "0 0 * ? * *"
//    cron every minute = "0 * * ? * *"
    @Scheduled(cron = "0 * * ? * *")
    public void onHourPast() {
        System.out.println("Doing cron job");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<ReserveRestModel> reserveRestModelList = findReserveQuery();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        for (ReserveRestModel reserveRestModel : reserveRestModelList) {
            LocalDateTime reserveTo = LocalDateTime.parse(reserveRestModel.getReserveTo(), formatter);
            if (!reserveRestModel.getStatus().equals("TIMEOUT") &&
                    reserveTo.isBefore(LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute(), now.getSecond()))) {
                reserveRestModel.setStatus("TIMEOUT");
                HttpEntity<ReserveRestModel> entity = new HttpEntity<>(reserveRestModel, headers);
                String result = new RestTemplate().exchange("http://localhost:8082/reserve-service/reserve", HttpMethod.PUT, entity, String.class).getBody();
                System.out.println("Set reserve:" + reserveRestModel.get_id() + " to TIMEOUT " + result);
            }
        }

    }
}
