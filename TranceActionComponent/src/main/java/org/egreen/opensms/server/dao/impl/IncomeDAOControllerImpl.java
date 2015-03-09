package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.IncomeDAOController;
import org.egreen.opensms.server.entity.Income;
import org.egreen.opensms.server.model.CashChequeAmountModel;
import org.egreen.opensms.server.model.IncomeSpendingsModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
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
 * Created by Pramoda Fernando on 12/2/2014.
 */

@Repository
public class IncomeDAOControllerImpl extends AbstractDAOController<Income,Long> implements IncomeDAOController {
    public IncomeDAOControllerImpl() {
        super(Income.class,Long.class);
    }

    @Override
    public List<IncomeSpendingsModel> searchYearIncome(String year) {
        List<IncomeSpendingsModel> incomeSpendingsModels = new ArrayList<IncomeSpendingsModel>();

        Query query = getSession().createQuery("SELECT SUM(amount)as Amount,month(date) as Month FROM Income i WHERE year(date)="+year+" group by month(date) order by date");

        List<IncomeSpendingsModel> list = new ArrayList<IncomeSpendingsModel>();
        Iterator iterator = query.list().iterator();
        IncomeSpendingsModel incomeSpendingsModel = null;
        while (iterator.hasNext()) {
            Object[] tuple = (Object[]) iterator.next();
            incomeSpendingsModel = new IncomeSpendingsModel(Double.valueOf(tuple[0]+""),Integer.valueOf(tuple[1]+""));
          //  System.out.println("DB MONTHS : "+ incomeSpendingsModel.getMonth());
            list.add(incomeSpendingsModel);
        }
        return list;
    }

    @Override
    public List<Income> searchIncomeByDateRange(String firstDate, String secondDate) {
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
    public int removeIncomes(Long incomeId) {
        Session session=getSession();
        String hql = "delete from Income where incomeId= :incomeId";
        int i = session.createQuery(hql).setLong("incomeId",incomeId).executeUpdate();
        return i;
    }

    @Override
    public BigDecimal searchAllIncome() {
        Session session=getSession();
        String hql = "SELECT SUM(amount) FROM Income i";
        return (BigDecimal)session.createQuery(hql).uniqueResult();
    }

    @Override
    public List<Income> getAllIncomes() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.addOrder(Order.desc("date"));
        return criteria.list();
    }

    @Override
    public CashChequeAmountModel searchCashChequeIncomes() {
        Query query = getSession().createQuery("SELECT SUM(amount) FROM Income group by paymentType");
        Session session=getSession();
        String hql = "SELECT sum(amount) FROM Income WHERE paymentType = 'cash'";
        BigDecimal cashAmount = (BigDecimal)session.createQuery(hql).uniqueResult();

        String hql1 = "SELECT sum(amount) FROM Income WHERE paymentType = 'cheque'";
        BigDecimal chequeAmount = (BigDecimal)session.createQuery(hql1).uniqueResult();

        CashChequeAmountModel cashChequeAmountModel = new CashChequeAmountModel(cashAmount.doubleValue(),chequeAmount.doubleValue());
        return cashChequeAmountModel;
    }
}
