package org.egreen.opensms.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

/**
 * Created by dewmal on 6/25/14.
 */
public class HibernateAwareObjectMapper extends ObjectMapper {
    public HibernateAwareObjectMapper() {
        Hibernate4Module hm = new Hibernate4Module();
        hm.configure(Hibernate4Module.Feature.FORCE_LAZY_LOADING, false);
        registerModule(hm);
        configure(SerializationFeature.INDENT_OUTPUT, true);
    }
}
