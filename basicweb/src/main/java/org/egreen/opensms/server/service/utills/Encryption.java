package org.egreen.opensms.server.service.utills;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class Encryption {

    public static final String DEFAULT_ENCODING="UTF-8";
    static BASE64Encoder enc=new BASE64Encoder();
    static BASE64Decoder dec=new BASE64Decoder();

    public String base64encode(String text){
        try {
            String rez = enc.encode( text.getBytes( DEFAULT_ENCODING ) );
            return rez;
        }
        catch ( UnsupportedEncodingException e ) {
            return null;
        }
    }//base64encode

    public  String base64decode(String text){

        try {
            return new String(dec.decodeBuffer( text ),DEFAULT_ENCODING);
        }
        catch ( IOException e ) {
            return null;
        }

    }//base64decode



    public  String xorMessage(String message, String key){
        try {
            if (message==null || key==null ) return null;

            char[] keys=key.toCharArray();
            char[] mesg=message.toCharArray();

            int ml=mesg.length;
            int kl=keys.length;
            char[] newmsg=new char[ml];

            for (int i=0; i<ml; i++){
                newmsg[i]=(char)(mesg[i]^keys[i%kl]);
            }//for i
            mesg=null; keys=null;
            return new String(newmsg);
        }
        catch ( Exception e ) {
            return null;
        }
    }//xorMessage
}