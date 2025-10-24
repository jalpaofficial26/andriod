package com.jalpa.chat;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Messaging")
public class MessagingPlugin extends Plugin {

    @PluginMethod
    public void sendSms(PluginCall call) {
        String number = call.getString("number");
        String message = call.getString("message");

        if (number == null || message == null) {
            call.reject("Please provide a number and a message.");
            return;
        }

        Uri uri = Uri.parse("smsto:" + number);
        Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
        intent.putExtra("sms_body", message);
        getContext().startActivity(intent);
        call.resolve();
    }

    @PluginMethod
    public void sendWhatsApp(PluginCall call) {
        String number = call.getString("number");
        String message = call.getString("message");

        if (number == null || message == null) {
            call.reject("Please provide a number and a message.");
            return;
        }

        PackageManager pm = getContext().getPackageManager();
        try {
            pm.getPackageInfo("com.whatsapp", PackageManager.GET_ACTIVITIES);
            Uri uri = Uri.parse("https://api.whatsapp.com/send?phone=" + number + "&text=" + message);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            getContext().startActivity(intent);
            call.resolve();
        } catch (PackageManager.NameNotFoundException e) {
            call.reject("WhatsApp not installed.", e);
        }
    }
}
