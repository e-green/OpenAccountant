package org.egreen.opensms.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by dewmal on 6/25/14.
 */
@Controller
public class HomeController {


    @RequestMapping(value = "hello")
    public @ResponseBody String hello(){
        return "Hello World";
    }


    @RequestMapping(value = "proxy")
    public String proxy() {
        return "proxy";
    }
}
