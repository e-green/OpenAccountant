package org.egreen.opensms.server.option;

import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

/**
 * Created by dewmal on 9/19/14.
 */
public class JsonMapper extends MappingJackson2HttpMessageConverter {

    private static final Logger LOGGER = Logger.getLogger(JsonMapper.class);


    public JsonMapper() {
        super();
    }

    @Override
    protected JsonEncoding getJsonEncoding(MediaType contentType) {
LOGGER.info(contentType);
        return super.getJsonEncoding(contentType);
    }

    @Override
    public ObjectMapper getObjectMapper() {
        return super.getObjectMapper();
    }

    @Override
    public void setObjectMapper(ObjectMapper objectMapper) {
        LOGGER.info(objectMapper);
        super.setObjectMapper(objectMapper);
    }

    @Override
    public void setJsonPrefix(String jsonPrefix) {
        LOGGER.info(jsonPrefix);
        super.setJsonPrefix(jsonPrefix);
    }

    @Override
    public void setPrefixJson(boolean prefixJson) {
        super.setPrefixJson(prefixJson);
    }

    @Override
    public void setPrettyPrint(boolean prettyPrint) {

        super.setPrettyPrint(prettyPrint);
    }

    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        return super.canRead(clazz, mediaType);
    }

    @Override
    public boolean canRead(Type type, Class<?> contextClass, MediaType mediaType) {
        return super.canRead(type, contextClass, mediaType);
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        return super.canWrite(clazz, mediaType);
    }

    @Override
    protected boolean supports(Class<?> clazz) {
        return super.supports(clazz);
    }

    @Override
    protected Object readInternal(Class<?> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {

        LOGGER.info(inputMessage);
        return super.readInternal(clazz, inputMessage);
    }

    @Override
    public Object read(Type type, Class<?> contextClass, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {

        LOGGER.info(inputMessage);

        return super.read(type, contextClass, inputMessage);
    }

    @Override
    protected void writeInternal(Object object, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        super.writeInternal(object, outputMessage);
    }

    @Override
    protected JavaType getJavaType(Type type, Class<?> contextClass) {
        return super.getJavaType(type, contextClass);
    }

    @Override
    protected boolean canRead(MediaType mediaType) {
        return super.canRead(mediaType);
    }

    @Override
    public List<MediaType> getSupportedMediaTypes() {
        return super.getSupportedMediaTypes();
    }

    @Override
    public void setSupportedMediaTypes(List<MediaType> supportedMediaTypes) {
        super.setSupportedMediaTypes(supportedMediaTypes);
    }

    @Override
    protected boolean canWrite(MediaType mediaType) {
        return super.canWrite(mediaType);
    }

    @Override
    protected MediaType getDefaultContentType(Object o) throws IOException {
        LOGGER.info(o);
        return super.getDefaultContentType(o);
    }

    @Override
    protected Long getContentLength(Object o, MediaType contentType) throws IOException {
        return super.getContentLength(o, contentType);
    }
}
