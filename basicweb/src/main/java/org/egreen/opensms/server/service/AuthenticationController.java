package org.egreen.opensms.server.service;

import org.egreen.opensms.server.service.utills.Encryption;
import org.springframework.stereotype.Service;

/**
 * Created by dewmal on 7/18/14.
 */
@Service
public class AuthenticationController {


    public String getEncryptWord(String txt) {
        return new Encryption().base64encode(txt);
    }
}
