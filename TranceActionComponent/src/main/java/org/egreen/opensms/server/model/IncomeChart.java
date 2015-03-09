package org.egreen.opensms.server.model;

import java.util.List;

/**
 * Created by Pramoda Fernando on 2/17/2015.
 */
public class IncomeChart {

    List<String> monthes;
    List<String>series;
    List<Double[]>amounts;

    public List<String> getMonthes() {
        return monthes;
    }

    public void setMonthes(List<String> monthes) {
        this.monthes = monthes;
    }

    public List<String> getSeries() {
        return series;
    }

    public void setSeries(List<String> series) {
        this.series = series;
    }

    public List<Double[]> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<Double[]> amounts) {
        this.amounts = amounts;
    }
}
