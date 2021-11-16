package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.StrictMode;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.widget.ImageView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Bug;
import com.example.funtest.objects.TestStep;
import com.synnapps.carouselview.CarouselView;
import com.synnapps.carouselview.ImageListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class BugDetailsAttachmentsActivity extends AppCompatActivity {

    //private ArrayList<Bug> currentBugList;
    //int bug_list_position = -1;
    //private ArrayList<String> attachments= new ArrayList<>();
    private ArrayList<Bitmap> attachmentsBitMap = new ArrayList<>();

    String bugId;

    CarouselView carouselView;

    private ProgressDialog pDialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_details_attachments);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        initializeViews();
        get_position();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);

        //checking which activity started this activity and setting proper list of bugs
        /*
        String sourceActivityName = getIntent().getStringExtra("sourceActivityName");
        if(sourceActivityName.equals("BugDetailsActivity")){
            currentBugList = MainActivity.bugList;
        }
        else if(sourceActivityName.equals("BugDetailsActivityToFix")){
            currentBugList = MainActivity.bugList;
        }
        else if(sourceActivityName.equals("BugDetailsActivityToReview")){
            currentBugList = MainActivity.bugList;
        }
        else if(sourceActivityName.equals("BugDetailsActivityMyBugs")){
            currentBugList = MainActivity.bugList;
        }

         */


        //getting attachments list of selected bug
        getAttachments();

        //getImages();
        /*
        //getting list of attachments as bitmap
        for(int i = 0; i < attachments.size();i++){
            byte[] currentDecodedString = Base64.decode(attachments.get(i), Base64.DEFAULT);
            Bitmap currentDecodedImage = BitmapFactory.decodeByteArray(currentDecodedString, 0, currentDecodedString.length);
            attachmentsBitMap.add(currentDecodedImage);
        }

         */

    }

    private void getAttachments() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Attachments/error/" + bugId;

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    for(int i=0;i<response.length();i++){
                        try {
                            JSONObject jsonAttachment = response.getJSONObject(i);
                            String attachmentUrl = jsonAttachment.getString("imageLink");

                            try {
                                URL url = new URL(attachmentUrl);
                                Bitmap image = BitmapFactory.decodeStream(url.openConnection().getInputStream());
                                attachmentsBitMap.add(image);
                            } catch(IOException e) {
                                System.out.println(e);
                            }



                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                    continueInit();

                }
            }, new Response.ErrorListener(){
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("LOG_RESPONSE", error.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                }
            }){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "Bearer "+ token);
                    return params;
                }
            };


            requestQueue.add(jsonArrayRequest);
        }
    }

    private void continueInit() {
        pDialog = new ProgressDialog(this);
        // Showing progress dialog before making http request
        pDialog.setMessage("Loading...");
        pDialog.show();
        //setting up a carousel view
        carouselView.setImageListener(new ImageListener() {
            @Override
            public void setImageForPosition(int position, ImageView imageView) {
                imageView.setImageBitmap(attachmentsBitMap.get(position));
                imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
            }
        });
        carouselView.setPageCount(attachmentsBitMap.size());
        if (pDialog != null) {
            pDialog.dismiss();
            pDialog = null;
        }
    }

    private void getImages() {
        // Find the last picture
        String[] projection = new String[]{
                MediaStore.Images.ImageColumns._ID,
                MediaStore.Images.ImageColumns.DATA,
                MediaStore.Images.ImageColumns.BUCKET_DISPLAY_NAME,
                MediaStore.Images.ImageColumns.DATE_TAKEN,
                MediaStore.Images.ImageColumns.MIME_TYPE
        };
        final Cursor cursor = this.getApplicationContext().getContentResolver().query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, projection, null,
                        null, MediaStore.Images.ImageColumns.DATE_TAKEN + " DESC");

        // Put it in the image view
        if (cursor.moveToFirst()) {
            String imageLocation = cursor.getString(1);
            File imageFile = new File(imageLocation);
            if (imageFile.exists()) {   // TODO: is there a better way to do this?
                Bitmap bm = BitmapFactory.decodeFile(imageLocation);
                attachmentsBitMap.add(bm);

            }
            int numberOfExtraPhotos=2;
            int i=0;
            while (cursor.moveToNext() && i<numberOfExtraPhotos){
                imageLocation = cursor.getString(1);
                imageFile = new File(imageLocation);
                if (imageFile.exists()) {   // TODO: is there a better way to do this?
                    Bitmap bm = BitmapFactory.decodeFile(imageLocation);
                    attachmentsBitMap.add(bm);

                }
                i++;
            }
        }

    }

    private void get_position() {

        //bug_list_position = getIntent().getIntExtra("position",-1);
        bugId = getIntent().getStringExtra("id");

    }

    private void initializeViews() {
        carouselView = (CarouselView) findViewById(R.id.carouselView);

    }
}