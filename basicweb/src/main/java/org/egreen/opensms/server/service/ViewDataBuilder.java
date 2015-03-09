package org.egreen.opensms.server.service;

import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Created by dewmal on 7/15/14.
 */
@Repository
public class ViewDataBuilder {


    /**
     * GEt View Data Model
     *
     * @return
     */
    public ViewDataModeler getViewDataModler() {
        return new ViewDataModeler();
    }


    public class ViewDataModeler extends HashMap<String, Object> implements Serializable {


        /**
         * Add values to map
         *
         * @param key
         * @param data
         * @return
         */
        public void loadData(String key, Object data) {
            this.put(key, data);
        }


        public ViewDataModeler getDataObject() {
            return this;
        }
    }
}
