package org.egreen.opensms.server.listner;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.filter.GenericFilterBean;
import sun.misc.IOUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.*;

/**
 * Created by Pramoda Fernando on 9/19/2014.
 */

public class RequestListner extends GenericFilterBean {

    private static final Logger LOGGER=Logger.getLogger(RequestListner.class);


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        LOGGER.info("adasd");
        LOGGER.info(slurp(servletRequest.getInputStream(),3434));
        LOGGER.info(servletResponse);
        LOGGER.info(filterChain);
        System.out.println(slurp(servletRequest.getInputStream(),3434));
        System.out.println(servletRequest.getContentType());

        filterChain.doFilter(servletRequest, servletResponse);

    }
    public  String slurp(final InputStream is, final int bufferSize)
    {
        final char[] buffer = new char[bufferSize];
        final StringBuilder out = new StringBuilder();
        try {
            final Reader in = new InputStreamReader(is, "UTF-8");
            try {
                for (;;) {
                    int rsz = in.read(buffer, 0, buffer.length);
                    if (rsz < 0)
                        break;
                    out.append(buffer, 0, rsz);
                }
            }
            finally {
                in.close();
            }
        }
        catch (UnsupportedEncodingException ex) {
    /* ... */
        }
        catch (IOException ex) {
      /* ... */
        }
        return out.toString();
    }

}
