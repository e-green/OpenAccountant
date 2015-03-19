package org.egreen.opensms.server.dao;

import org.egreen.opensms.server.entity.Category;

import java.util.List;

/**
 * Created by Pramoda Fernando on 8/19/2014.
 */
public interface CategoryDAOController extends DAOController<Category,Long> {
    List<Category> findCategoryByQuery(String categoryname);

    List<Category> findAllCategory();

    List<Category> findNonParent();

    int deleteCategory(Long categoryId);

}
