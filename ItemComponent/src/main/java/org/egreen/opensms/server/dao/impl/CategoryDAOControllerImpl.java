package org.egreen.opensms.server.dao.impl;

import org.egreen.opensms.server.dao.CategoryDAOController;
import org.egreen.opensms.server.entity.Category;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
@Repository
public class CategoryDAOControllerImpl extends AbstractDAOController<Category,Long> implements CategoryDAOController {

    public CategoryDAOControllerImpl() {
        super(Category.class, Long.class);
    }


    @Override
    public List<Category> findCategoryByQuery(String categoryname) {


        //getSession().createQuery("SELECT u from Category u WHERE u.categoryByParentCategory")

       // Criteria criteria = getSession().createCriteria(entityType).createCriteria();
      //  criteria.add(Restrictions.like("category", categoryname, MatchMode.ANYWHERE));



        return null;// criteria.list();
    }

    @Override
    public List<Category> findAllCategory() {
        Criteria criteria = getSession().createCriteria(entityType);
        //criteria.setFirstResult(5);
        //criteria.setMaxResults(10);
        System.out.println("LIST:"+criteria.list());
        return criteria.list();
    }

    @Override
    public List<Category> findNonParent() {
        Criteria criteria = getSession().createCriteria(entityType);
        criteria.add(Restrictions.isNull("categoryByParentCategory"));
        return criteria.list();
    }

    @Override
    public int deleteCategory(Long categoryId) {
        //Integer categoryId = read.getCategoryId();
        Session session=getSession();
        String hql = "delete from Category where categoryId= :categoryId";
        int i = session.createQuery(hql).setLong("categoryId", categoryId).executeUpdate();
        return i;
    }




}
