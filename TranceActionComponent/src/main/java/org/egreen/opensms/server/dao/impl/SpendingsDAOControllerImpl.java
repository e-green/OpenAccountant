package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.SpendingsDAOController;
import org.egreen.opensms.server.entity.Spendings;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.egreen.opensms.server.model.SpendingsByCartegoryModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Pramoda Fernando on 2/16/2015.
 */
@Repository
public class SpendingsDAOControllerImpl extends AbstractDAOController<Spendings,Long> implements SpendingsDAOController{

    public SpendingsDAOControllerImpl() {
        super(Spendings.class,Long.class);
    }

    @Override
    public List<IncomeSpendingsModel> searchYearSpendings(String year) {
        Query query = getSession().createQuery("SELECT SUM(amount)as Amount,month(date) as Month FROM Spendings i WHERE year(date)=" + year + " group by month(date) order by date");

        List<IncomeSpendingsModel> list = new ArrayList<IncomeSpendingsModel>();
        Iterator iterator = query.list().iterator();
        IncomeSpendingsModel incomeSpendingsModel = null;
        while (iterator.hasNext()) {
            Object[] tuple = (Object[]) iterator.next();
            incomeSpendingsModel = new IncomeSpendingsModel(Double.valueOf(tuple[0]+""),Integer.valueOf(tuple[1]+""));
           // System.out.println("DB MONTHS : "+ incomeSpendingsModel.getMonth());
            list.add(incomeSpendingsModel);
        }
        return list;
    }

    @Override
    public BigDecimal searchAllSpendingAmount() {
        Session session=getSession();
        String hql = "SELECT SUM(amount) FROM Spendings s";
        return (BigDecimal)session.createQuery(hql).uniqueResult();
    }

    @Override
    public List<Spendings> searchSpendingsByDateRange(String firstDate, String secondDate) {
        Criteria criteria = getSession().createCriteria(entityType);

        SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd");

        //  System.out.println(firstDate);
        // System.out.println(secondDate);

        Date fDa = null;
        Date sDa = null;

        if(firstDate.equals("")&&secondDate.equals("")){
            Criteria criteria1 = getSession().createCriteria(entityType);

            return  criteria1.list();
        }else {

            try {
                fDa = sm.parse(firstDate);
                sDa = sm.parse(secondDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }


            criteria.add(Restrictions.between("date", fDa, sDa));
        }
        return criteria.list();
    }

    @Override
    public int removeSpendingss(Long spendingsId) {
        Session session=getSession();
        String hql = "delete from Spendings where spendingsId= :spendingsId";
        int i = session.createQuery(hql).setLong("spendingsId",spendingsId).executeUpdate();
        return i;
    }

    @Override
    public List<SpendingsByCartegoryModel> searchSpendingsByCategory() {
        Query query = getSession().createQuery("SELECT category as categoryName,SUM(amount) as amount FROM Spendings  group by category");

        List<SpendingsByCartegoryModel> list = new ArrayList<SpendingsByCartegoryModel>();
        Iterator iterator = query.list().iterator();
        SpendingsByCartegoryModel spendingsByCartegoryModel = null;
        while (iterator.hasNext()) {
            Object[] tuple = (Object[]) iterator.next();
            spendingsByCartegoryModel = new SpendingsByCartegoryModel(tuple[0]+"",Double.valueOf(tuple[1]+""));

            list.add(spendingsByCartegoryModel);
        }
        return list;
    }
}
